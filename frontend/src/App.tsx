import { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import type { Transaction, Dispute } from './types';
import { getTransactions, errorMessage } from './api';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import TransactionDetails from './components/TransactionDetails';

const PAGE_SIZE = 5;
export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<Transaction | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getTransactions({
      page,
      limit: PAGE_SIZE,
      search: debouncedSearch || undefined,
      status: status || undefined,
    })
      .then((res) => {
        if (cancelled) return;
        setTransactions(res.data);
        setTotal(res.total);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(errorMessage(err));
          setLoading(false);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch, status]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on search change
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1); // Reset to first page on status change
  };

  // const term = search.toLowerCase().trim();
  // const filtered = mockTransactions.filter((tx) => {
  //   const matchesSearch =
  //     term === '' ||
  //     tx.reference.toLowerCase().includes(term) ||
  //     tx.customer_name.toLowerCase().includes(term);
  //   const matchesStatus = status === '' || tx.status === status;
  //   return matchesSearch && matchesStatus;
  // });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const handleDisputeRaised = (dispute: Dispute) => {
    const addDispute = (t: Transaction): Transaction => ({
      ...t,
      disputes: [...(t.disputes ?? []), dispute],
    });

    setSelected((prev) => (prev ? addDispute(prev) : prev));
    setTransactions((prev) =>
      prev.map((t) => (t.id === dispute.transaction_id ? addDispute(t) : t)),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-600">
        Transaction Dashboard
      </h1>
      <Filters
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading transactions...</p>
      ) : (
        <TransactionTable
          transactions={transactions}
          onRowClick={setSelected}
        />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={total}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />

      {selected && (
        <TransactionDetails
          transaction={selected}
          dispute={selected.disputes ?? []}
          onClose={() => setSelected(null)}
          onDisputeRaised={handleDisputeRaised}
        />
      )}
    </div>
  );
}

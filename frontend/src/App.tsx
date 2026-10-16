import { useState } from 'react';
import TransactionTable from './components/TransactionTable';
import type { Transaction } from './types';
import Filters from './components/Filters';
import { mockTransactions, mockDisputes } from './mockData';
import Pagination from './components/Pagination';
import TransactionDetails from './components/TransactionDetails';

const PAGE_SIZE = 5;
export default function App() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const [disputes, setDisputes] = useState(mockDisputes);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on search change
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1); // Reset to first page on status change
  };

  const term = search.toLowerCase().trim();
  const filtered = mockTransactions.filter((tx) => {
    const matchesSearch =
      term === '' ||
      tx.reference.toLowerCase().includes(term) ||
      tx.customer_name.toLowerCase().includes(term);
    const matchesStatus = status === '' || tx.status === status;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;

  const pageItems = filtered.slice(start, start + PAGE_SIZE);

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
      <TransactionTable transactions={pageItems} onRowClick={setSelected} />
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
      {selected && (
        <TransactionDetails
          transaction={selected}
          dispute={disputes.filter((d) => d.transaction_id === selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

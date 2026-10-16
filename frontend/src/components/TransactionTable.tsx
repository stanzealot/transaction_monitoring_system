import type { Transaction, TxStatus } from '../types';
import { formatAmount, formatDate } from '../utils';

const statusColors: Record<TxStatus, string> = {
  success: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
};

interface Props {
  transactions: Transaction[];
  onRowClick: (tx: Transaction) => void;
}

export default function TransactionTable({ transactions, onRowClick }: Props) {
  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions available.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Reference
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              onClick={() => onRowClick(tx)}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {tx.reference}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {tx.customer_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatAmount(tx.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-medium ${statusColors[tx.status]}`}
                >
                  {tx.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(tx.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

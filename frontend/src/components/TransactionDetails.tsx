import { useState } from 'react';
import type { Transaction, Dispute } from '../types';
import { formatAmount, formatDate } from '../utils';
import RaiseDisputeForm from './RaiseDisputeForm';

interface Props {
  transaction: Transaction;
  dispute: Dispute[];
  onClose: () => void;
  onDisputeRaised: (dispute: Dispute) => void;
}

export default function TransactionDetails({
  transaction,
  dispute,
  onClose,
  onDisputeRaised,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const hasOpenDispute = dispute.some((d) => d.status === 'open');

  return (
    <div
      className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600">
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-gray-400 hover:text-gray-600 "
          >
            &times;
          </button>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <dt className="text-gray-500">Reference:</dt>
          <dd className="font-mono">{transaction.reference}</dd>
          <dt className="text-gray-500">Customer:</dt>
          <dd>{transaction.customer_name}</dd>
          <dt className="text-gray-500">Amount:</dt>
          <dd>{formatAmount(transaction.amount)}</dd>
          <dt className="text-gray-500">Status:</dt>
          <dd>{transaction.status}</dd>
          <dt className="text-gray-500">Date:</dt>
          <dd>{formatDate(transaction.timestamp)}</dd>
        </dl>

        <h3 className="mt-6 text-lg font-semibold text-blue-600">Dispute</h3>
        {dispute.length === 0 ? (
          <p className="text-sm text-gray-500">No disputes found.</p>
        ) : (
          <ul className="space-y-2">
            {dispute.map((d) => (
              <li key={d.id}>
                <div className="flex items-center justify-between">
                  <span>{d.reason}</span>
                  <span
                    className={` rounded-full px-2 py-1 text-xs font-medium ${d.status === 'open' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
                  >
                    {d.status}
                  </span>
                </div>
                {d.reason}
              </li>
            ))}
          </ul>
        )}
        {showForm ? (
          <RaiseDisputeForm
            transactionId={transaction.id}
            onSuccess={(newDispute) => {
              onDisputeRaised(newDispute);
              setShowForm(false);
            }}
            onClose={() => setShowForm(false)}
          />
        ) : hasOpenDispute ? (
          <p className="mt-4 text-sm text-gray-500">
            This transaction already has an open dispute.
          </p>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Raise Dispute
          </button>
        )}
      </div>
    </div>
  );
}

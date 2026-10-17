import { useState, type FormEvent } from 'react';
import type { Dispute } from '../types';
import { raiseDispute, errorMessage } from '../api';

interface Props {
  transactionId: number;
  onSuccess: (dispute: Dispute) => void;
  onClose: () => void;
}

export default function RaiseDisputeForm({
  transactionId,
  onSuccess,
  onClose,
}: Props) {
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (reason.trim() === '') {
      setError('Reason is required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const dispute = await raiseDispute(transactionId, reason.trim());
      onSuccess(dispute);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Reason for Dispute
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
          rows={4}
          maxLength={500}
          placeholder="Enter the reason for raising a dispute..."
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

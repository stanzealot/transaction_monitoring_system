import type { Transaction, Dispute, TxStatus } from './types';

const names = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'David Wilson',
  'Eva Davis',
  'Frank Miller',
  'Grace Lee',
  'Henry Taylor',
  'Isabella Anderson',
  'Jack Thomas',
  'Katherine Martinez',
  'Liam Harris',
];

const statuses: TxStatus[] = ['success', 'pending', 'failed'];

export const mockTransactions: Transaction[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: String(i + 1),
    reference: `TXN-${String(i + 1).padStart(4, '0')}`,
    customer_name: names[i % names.length],
    amount: 5000 + i * 1250,
    status: statuses[i % statuses.length],
    timestamp: new Date(Date.now() - i * 3600 * 1000).toISOString(),
  }),
);

export const mockDisputes: Dispute[] = [
  {
    id: 'd1',
    transaction_id: '2',
    reason: 'Customer was charged twice for the same transaction.',
    status: 'open',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    resolved_at: null,
  },
  {
    id: 'd2',
    transaction_id: '5',
    reason: 'Customer claims they did not authorize this transaction.',
    status: 'resolved',
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    resolved_at: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
  },
];

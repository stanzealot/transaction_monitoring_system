export type TxStatus = 'success' | 'pending' | 'failed';
export type DisputeStatus = 'open' | 'resolved';

export interface Transaction {
  id: string;
  reference: string;
  customer_name: string;
  amount: number; // ISO date string
  status: TxStatus;
  timestamp: string;
}

export interface Dispute {
  id: string;
  transaction_id: string;
  reason: string;
  status: DisputeStatus;
  created_at: string; // ISO date string
  resolved_at: string | null; // ISO date string
}

export interface Paginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

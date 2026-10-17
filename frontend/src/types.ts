export type TxStatus = 'success' | 'pending' | 'failed';
export type DisputeStatus = 'open' | 'resolved';

export interface Transaction {
  id: number;
  reference: string;
  customer_name: string;
  amount: number; // ISO date string
  status: TxStatus;
  timestamp: string;
  disputes?: Dispute[]; // Optional array of disputes associated with the transaction
}

export interface Dispute {
  id: number;
  transaction_id: number;
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

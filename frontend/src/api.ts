import axios from 'axios';

import type { Transaction, Dispute, Paginated } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getTransactions(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  const res = await api.get<Paginated<Transaction>>('/transactions', {
    params,
  });
  return res.data;
}

export async function getDisputes(params: { status?: string } = {}) {
  const res = await api.get<Dispute[]>('/disputes', { params });
  return res.data;
}

export async function raiseDispute(transaction_id: number, reason: string) {
  const res = await api.post<Dispute>('/disputes', { transaction_id, reason });
  return res.data;
}

export async function resolveDispute(id: number) {
  const res = await api.post<Dispute>(`/disputes/${id}/resolve`);
  return res.data;
}

export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return String(error);
}

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

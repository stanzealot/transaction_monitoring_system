interface Props {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: Props) {
  if (totalItems === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-gray-600 sm:flex-row">
      <p>
        Showing {from} to {to} of {totalItems}
      </p>
      <div className="flex item-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

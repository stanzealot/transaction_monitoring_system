interface Props {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function Filters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Search by reference or customer name"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        <option value="">All Statuses</option>
        <option value="success">Success</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
    </div>
  );
}

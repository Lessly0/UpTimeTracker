import { Client } from '../types/client.types';

interface ClientFilterProps {
  status: Client['status'] | 'all';
  onChange: (status: Client['status'] | 'all') => void;
}

/**
 * Filter control for client status.
 */
export const ClientFilter = ({ status, onChange }: ClientFilterProps) => {
  const options: { label: string; value: Client['status'] | 'all' }[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Status:</label>
      <select
        value={status}
        onChange={(e) => onChange((e.target.value as Client['status'] | 'all'))}
        className="block w-full pl-3 pr-10 py-2 text-sm bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-sm">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
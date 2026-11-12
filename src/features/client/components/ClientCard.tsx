import { Client } from '../types/client.types';
import { statusLabel, statusColor } from '../utils/client.utils';
import { Link } from 'react-router-dom';

interface ClientCardProps {
  client: Client;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * Displays a single client as a card.
 */
export const ClientCard = ({ client, onEdit, onDelete }: ClientCardProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{client.email}</p>
            <p className="mt-1 text-sm text-gray-500">{client.phone}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(client.status)}`}>
            {statusLabel(client.status)}
          </span>
        </div>
        <p className="mt-4 text-sm text-gray-600">{client.address}</p>
        <p className="mt-1 text-xs text-gray-400">
          Created {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : ''}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
        <div className="flex justify-between">
          <button
            onClick={() => onEdit?.(client.id)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Edit
          </button>
          <Link
            to={`/clients/${client.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View
          </Link>
          <button
            onClick={() => onDelete?.(client.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
import { useNavigate, useParams } from 'react-router-dom';
import { useClient } from '../hooks/useClient';
import { statusLabel, statusColor, formatDate } from '../utils/client.utils';

/**
 * Client details page.
 * Displays full details of a single client.
 */
export const ClientDetailsPage = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const { client, loading, error, refetch } = useClient(clientId ?? '');

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading client details...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Client not found</h3>
          <p className="mt-1 text-red-600">{error?.message}</p>
          <button
            onClick={() => navigate('/clients')}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to client list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <p className="mt-1 text-gray-500">Client details</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/clients/edit/${client.id}`)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => navigate('/clients')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Back
          </button>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{client.name}</dd>
              </div>
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{client.email}</dd>
              </div>
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{client.phone}</dd>
              </div>
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{client.address}</dd>
              </div>
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(client.status)}`}>
                    {statusLabel(client.status)}
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(client.createdAt)}
                </dd>
              </div>
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(client.updatedAt)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={refetch}
            className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
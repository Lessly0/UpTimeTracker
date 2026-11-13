import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../hooks/useClients';
import { ClientTable } from '../components/ClientTable';
import { ClientSearch } from '../components/ClientSearch';
import { ClientFilter } from '../components/ClientFilter';
import { Client } from '../types/client.types';

export const ClientListPage = () => {
  const navigate = useNavigate();
  const {
    clients,
    total,
    filters,
    loading,
    refreshing,
    error,
    updateFilters,
    refetch,
  } = useClients({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState(filters.search ?? '');

  // Debounce search so it doesn't fetch on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search: searchQuery });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, updateFilters]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      refetch();
    }
  };

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading clients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading clients</h3>
          <p className="mt-1 text-red-600">{error.message}</p>
          <button
            onClick={refetch}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(total / (filters.limit ?? 10));

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="mt-1 text-gray-500">
            Manage your clients. 
          </p>
        </div>
        <button
          onClick={() => navigate('/clients/add')}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        >
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Clients
          </p>
          <p className="text-2xl font-semibold text-gray-900">{total}</p>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Active
          </p>
          <p className="text-2xl font-semibold text-gray-900">
            {clients.filter((c) => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Pending
          </p>
          <p className="text-2xl font-semibold text-gray-900">
            {clients.filter((c) => c.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Inactive
          </p>
          <p className="text-2xl font-semibold text-gray-900">
            {clients.filter((c) => c.status === 'inactive').length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="w-full sm:w-96">
            <ClientSearch
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
            />
          </div>
          <div>
            <ClientFilter
              status={(filters.status as Client['status'] | 'all') ?? 'all'}
              onChange={(val) => updateFilters({ status: val as Client['status'] | undefined })}
            />
          </div>
        </div>

        {refreshing && (
          <div className="flex justify-center py-4">
            <p className="text-sm text-gray-500">Searching...</p>
          </div>
        )}

        <ClientTable
          clients={clients}
          onEdit={(id) => navigate(`/clients/edit/${id}`)}
          onDelete={handleDelete}
        />

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Page {filters.page ?? 1} of {totalPages}
            </p>
            <div className="flex -space-x-px">
              <button
                onClick={() =>
                  updateFilters({ page: Math.max(1, (filters.page ?? 1) - 1) })
                }
                disabled={(filters.page ?? 1) <= 1}
                className={`px-3 py-2 ml-1 text-sm font-medium ${
                  (filters.page ?? 1) <= 1
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-indigo-600 border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  updateFilters({ page: Math.min(totalPages, (filters.page ?? 1) + 1) })
                }
                disabled={(filters.page ?? 1) >= totalPages}
                className={`px-3 py-2 mr-1 text-sm font-medium ${
                  (filters.page ?? 1) >= totalPages
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-indigo-600 border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
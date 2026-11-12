import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientService } from '../services/clientService';
import { ClientForm } from '../components/ClientForm';

/**
 * Add client page.
 * Renders the client form in create mode.
 */
export const ClientAddPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    status: 'active' | 'inactive' | 'pending';
  }) => {
    setLoading(true);
    setServerError(null);
    try {
      await clientService.createClient(data);
      navigate('/clients');
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Failed to create client',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Client</h1>
        <p className="mt-1 text-gray-500">Create a new client record.</p>
      </div>

      {serverError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="mt-1 text-red-600">{serverError}</p>
        </div>
      )}

      <div className="max-w-2xl">
        <ClientForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/clients')}
          loading={loading}
        />
      </div>
    </div>
  );
};
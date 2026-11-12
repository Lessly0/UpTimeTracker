import { useState, useEffect, useCallback } from 'react';
import { clientService } from '../services/clientService';
import { Client } from '../types/client.types';

/**
 * Hook for managing a single client.
 */
export const useClient = (id: string) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchClient = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getClientById(id);
      setClient(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load client'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  const refetch = useCallback(() => {
    fetchClient();
  }, [fetchClient]);

  return {
    client,
    loading,
    error,
    refetch,
  };
};
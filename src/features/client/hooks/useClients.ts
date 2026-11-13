import { useState, useEffect, useCallback } from 'react';
import { clientService } from '../services/clientService';
import { Client, ClientFilters, ClientListResponse } from '../types/client.types';

/**
 * Hook for managing a list of clients with search, filter, and pagination.
 */
export const useClients = (initialFilters?: ClientFilters) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<ClientFilters>(initialFilters ?? {});
  const [loading, setLoading] = useState(true); // initial load only
  const [refreshing, setRefreshing] = useState(false); // refetches from filters
  const [error, setError] = useState<Error | null>(null);

  // Initial load - runs once on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    clientService
      .getClients(initialFilters ?? {})
      .then((response: ClientListResponse) => {
        setClients(response.data);
        setTotal(response.total);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Failed to load clients'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Refresh on filter/page changes
  const fetchClients = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const response: ClientListResponse = await clientService.getClients(filters);
      setClients(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load clients'));
    } finally {
      setRefreshing(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const updateFilters = useCallback((nextFilters: Partial<ClientFilters>) => {
    setFilters((prev) => ({ ...prev, ...nextFilters, page: 1 }));
  }, []);

  const refetch = useCallback(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    total,
    filters,
    loading,
    refreshing,
    error,
    updateFilters,
    refetch,
  };
};
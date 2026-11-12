import { Client, ClientFilters, ClientListResponse, ClientFormData } from '../types/client.types';

const STORAGE_KEY = 'uptime_clients';

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1-555-0101',
    address: '123 Main St, New York, NY 10001',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '2',
    name: 'Globex Industries',
    email: 'support@globex.com',
    phone: '+1-555-0102',
    address: '456 Industrial Blvd, Chicago, IL 60601',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    name: 'Stark Holdings',
    email: 'tony@stark.com',
    phone: '+1-555-0103',
    address: '789 Tower Ave, Malibu, CA 90265',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    name: 'Wayne Enterprises',
    email: 'hello@wayne.com',
    phone: '+1-555-0104',
    address: '321 Gotham Way, Gotham, NJ 07030',
    status: 'inactive',
    createdAt: new Date(Date.now() - 86400000 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
];

const loadClients = (): Client[] => {
  if (typeof window === 'undefined') return initialClients;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialClients;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialClients));
  return initialClients;
};

const saveClients = (clients: Client[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

/**
 * Client API service (mocked with localStorage).
 * Replace with real HTTP calls when a backend is available.
 */
export const clientService = {
  getClients: async (filters?: ClientFilters): Promise<ClientListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let clients = loadClients();

    if (filters?.search) {
      const term = filters.search.toLowerCase();
      clients = clients.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.phone.includes(term) ||
          c.address.toLowerCase().includes(term),
      );
    }

    if (filters?.status) {
      clients = clients.filter((c) => c.status === filters.status);
    }

    const total = clients.length;
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 10;
    const start = (page - 1) * limit;
    const paginated = clients.slice(start, start + limit);

    return {
      data: paginated,
      total,
      page,
      limit,
    };
  },

  getClientById: async (id: string): Promise<Client> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const clients = loadClients();
    const client = clients.find((c) => c.id === id);
    if (!client) {
      throw new Error(`Client with id ${id} not found`);
    }
    return client;
  },

  createClient: async (data: ClientFormData): Promise<Client> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const clients = loadClients();
    const now = new Date().toISOString();
    const newClient: Client = {
      id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    saveClients([...clients, newClient]);
    return newClient;
  },

  updateClient: async (id: string, data: ClientFormData): Promise<Client> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const clients = loadClients();
    const index = clients.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Client with id ${id} not found`);
    }
    const updatedClient: Client = {
      ...clients[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    clients[index] = updatedClient;
    saveClients(clients);
    return updatedClient;
  },

  deleteClient: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const clients = loadClients();
    const filtered = clients.filter((c) => c.id !== id);
    if (filtered.length === clients.length) {
      throw new Error(`Client with id ${id} not found`);
    }
    saveClients(filtered);
  },
};
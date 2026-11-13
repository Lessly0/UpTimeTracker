export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface ClientFilters {
  search?: string;
  status?: Client['status'];
  page?: number;
  limit?: number;
}

export interface ClientListResponse {
  data: Client[];
  total: number;
  page: number;
  limit: number;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: Client['status'];
}
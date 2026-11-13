export type { Client, ClientFilters, ClientListResponse, ClientFormData } from './types/client.types';
export { clientService } from './services/clientService';
export { useClients } from './hooks/useClients';
export { useClient } from './hooks/useClient';
export {
  ClientTable,
  ClientForm,
  ClientCard,
  ClientSearch,
  ClientFilter,
} from './components';
export {
  ClientListPage,
  ClientAddPage,
  ClientEditPage,
  ClientDetailsPage,
} from './pages';
export { clientRoutes, ClientRouter } from './clientRouter';
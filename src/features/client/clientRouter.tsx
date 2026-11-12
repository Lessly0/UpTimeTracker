import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Outlet,
  Link,
} from 'react-router-dom';
import {
  ClientListPage,
  ClientAddPage,
  ClientEditPage,
  ClientDetailsPage,
} from './pages';

/**
 * Layout component rendered for all client routes.
 * Provides navigation links that are safely inside the RouterProvider context.
 */
const ClientLayout = () => (
  <div>
    <h1>UpTime Tracker</h1>
    <nav className="mb-6">
      <Link to="/clients">Client List</Link> |{' '}
      <Link to="/clients/add">Add Client</Link>
    </nav>
    <Outlet />
  </div>
);

/**
 * Client feature routes.
 * All client management routes are defined here and kept feature-scoped.
 * Uses a layout route so navigation links are inside the router context.
 */
export const clientRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <div className="text-gray-500">Select a client section above.</div>,
      },
      {
        path: 'clients',
        element: <ClientListPage />,
      },
      {
        path: 'clients/add',
        element: <ClientAddPage />,
      },
      {
        path: 'clients/edit/:clientId',
        element: <ClientEditPage />,
      },
      {
        path: 'clients/:clientId',
        element: <ClientDetailsPage />,
      },
    ],
  },
];

/**
 * Renders the client router provider.
 * Intended to be mounted from the app root (e.g. App.tsx).
 */
export const ClientRouter = () => {
  const router = createBrowserRouter(clientRoutes);
  return <RouterProvider router={router} />;
};
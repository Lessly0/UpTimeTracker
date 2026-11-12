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
 * Provides a navbar with branding and navigation links inside the RouterProvider context.
 */
const ClientLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              UpTime Tracker
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/clients"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Client List
            </Link>
            <Link
              to="/clients/add"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
            >
              Add Client
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Outlet />
    </main>
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
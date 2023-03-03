import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './Routes/routes'
import * as reactRouterDom from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './Utils/QueryClient';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <reactRouterDom.RouterProvider router={routes} />
  </React.StrictMode>,
      </QueryClientProvider>
)

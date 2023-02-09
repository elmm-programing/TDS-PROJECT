import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import routes from './Routes/routes'
import * as reactRouterDom from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <reactRouterDom.RouterProvider router={routes} />
  </React.StrictMode>,
)
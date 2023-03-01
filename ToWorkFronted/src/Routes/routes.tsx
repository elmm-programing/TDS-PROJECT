import { createBrowserRouter } from "react-router-dom";
import { Autenticacion } from "../Pages/Authentication";
import { Principal } from "../Pages/Principal";
import { Inicio } from "../Pages/Inicio";
import { NotFound } from "../Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/login",
    element: <Autenticacion />,
  },
  {
    path: "/inicio",
    element: <Principal />,
  },
   {
    path: "*",
    element: <NotFound />,
  },


]);
export default router

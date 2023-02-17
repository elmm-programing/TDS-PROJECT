import { createBrowserRouter } from "react-router-dom";
import { Autenticacion } from "../Pages/Authentication";
import { Inicio } from "../Pages/Inicio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/login",
    element: <Autenticacion />,
  },

]);
export default router

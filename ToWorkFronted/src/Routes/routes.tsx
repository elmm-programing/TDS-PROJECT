import { createBrowserRouter } from "react-router-dom";
import { Autenticacion } from "../Pages/Authentication";
import { Principal } from "../Pages/Principal";
import { Inicio } from "../Pages/Inicio";
import PrivateRoute from "./PrivateRoute";
import { PerfilPage } from "../Pages/PerfilPage";

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
    element: <PrivateRoute ><Principal /></PrivateRoute>,
  },

  {
    path: "/perfil",
    element: <PrivateRoute ><PerfilPage /></PrivateRoute>,
  },

]);
export default router

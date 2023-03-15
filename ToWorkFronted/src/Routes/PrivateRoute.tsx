import Cookies from 'universal-cookie';
import {Navigate} from 'react-router-dom';
const cookies = new Cookies();

function PrivateRoute({children}) {
  const isAuth = cookies.get('jwtToken') 
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;

  }

export default PrivateRoute;

import { BaseSyntheticEvent, useState } from 'react'
import { loginUser } from "../Services/Users"
import { User } from '../Types/common'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/esm/Fade';
import Form from 'react-bootstrap/esm/Form';
import '../Styles/Login.css';
import Cookies from 'universal-cookie';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' })
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [variant, setVariant] = useState("")
  const navigate = useNavigate();
const cookies = new Cookies();

  const onChangeInput = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const login = async (e: BaseSyntheticEvent) => {
    setLoading(true)
    e.preventDefault()
    let newUser: User = {
      name: "",
      lastName: "",
      email: user.email,
      username: user.email,
      password: user.password,
      roles: [
      "USER"
      ]
    }
    let response: { token: string } = await loginUser(newUser);
    switch (response.token) {
      case "Password is not correct":
        setLoading(false);
        setVariant("danger")
        setAlertText("The Password is incorrect")
        setAlert(true)
        break;
      case "User Not Found":
        setLoading(false);
        setVariant("danger")
        setAlertText("The user was not found")
        setAlert(true)
        break;

      default:
        setLoading(false);
        setVariant("success")
        setAlertText("The user and password are correct!")
        setAlert(true)
        cookies.set('jwtToken', response.token, { path: '/' });
        navigate("/inicio",{
        state:{user:newUser.username}
            });

        break;
    }
  }

  return (
    <>
      <Form className="form-style bg-dark m-auto text-center" id='login' onSubmit={login}>
        <h4 className="pb-3 text-white">Login</h4>
        {Object.entries(user).map(([key]) => (
          <Form.Group className="form-group pb-3" key={key}>
            <Form.Control className='bg-dark text-white' type={key == "password" ? key : "text"} name={key} onChange={onChangeInput} required placeholder={key == 'email' ? "Email or Username" : key.charAt(0).toUpperCase() + key.slice(1)} />
          </Form.Group>
        ))}

        <Button variant="primary"
          disabled={isLoading}
          className="btn btn-success w-100 font-weight-bold text-uppercase mt-2" type="submit">{isLoading ? 'Loading…' : 'Sign in'}</Button>
      </Form>
      <div style={{ minHeight: '150px' }}>
        <Fade in={alert} >
          <Alert show={alert} className='position-absolute bottom-0 end-0 w-auto' variant={variant} onClose={() => setAlert(false)} dismissible >
            {alertText}
          </Alert>

        </Fade >
      </div>
    </>
  )
}

export default Login

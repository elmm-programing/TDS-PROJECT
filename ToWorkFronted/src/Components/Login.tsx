import { BaseSyntheticEvent, useState } from 'react'
import { loginUser } from "../Services/Users"
import { IAuthResponse } from '../Types/common'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/esm/Fade';
import Form from 'react-bootstrap/esm/Form';
import '../Styles/Login.css';
import { setCookie } from '../Utils/GetCookies';
import { CUser } from '../Types/User';
import { useUserStore } from '../store/UsersStore';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' })
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [variant, setVariant] = useState("")
  const navigate = useNavigate();
  const state = useUserStore()

  const onChangeInput = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const login = async (e: BaseSyntheticEvent) => {
    setLoading(true)
    e.preventDefault()
    let newUser = new CUser()
    newUser.email = user.email
    newUser.username = user.email
    newUser.password = user.password
    let response: IAuthResponse = await loginUser(newUser);
    if (response.token) {
      setLoading(false);
      setVariant("success")
      setAlertText("The user and password are correct!")
      setAlert(true)
      setCookie('jwtToken', response.token)
      state.setUser(response.user)
      navigate("/inicio");

    } else if (response.error == "Password is not correct") {
      setLoading(false);
      setVariant("danger")
      setAlertText("The Password is incorrect")
      setAlert(true)
    } else if (response.error == "User Not Found") {
      setLoading(false);
      setVariant("danger")
      setAlertText("The user was not found")
      setAlert(true)
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

import { BaseSyntheticEvent, useState } from 'react'
import { loginUser } from "../Services/Users"
import { User } from '../Types/common'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/esm/Fade';


function Login() {
  const [user, setUser] = useState({ email: '', password: '' })
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [variant, setVariant] = useState("")
  const navigate = useNavigate();

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
    }
    let response: boolean | string = await loginUser(newUser);
    if (response == true) {
      setLoading(false);
      setVariant("success")
      setAlertText("The user and password are correct!")
      setAlert(true)
      navigate("/");
    } else if (response == "User Not Found") {
      setLoading(false);
      setVariant("danger")
      setAlertText("The user was not found")
      setAlert(true)
    } else {
      setLoading(false);
      setVariant("danger")
      setAlertText("The Password is incorrect")
      setAlert(true)
      console.log(false)
    }
  }

  return (
    <>
      <form className='form-signin w-100 m-auto text-center' onSubmit={login}>
        <h1 className="h3 mb-3 fw-normal">Sign in</h1>
        {Object.entries(user).map(([key]) => (
          <div className="form-floating mb-3" key={key}>
            <input type="text" name={key} required className="form-control" onChange={onChangeInput} id="floatingInput" placeholder="Email or Username" />
            <label >{key == 'email' ? "Email or Username" : key.charAt(0).toUpperCase() + key.slice(1)}</label>
          </div>

        ))}

        <Button variant="primary"
          disabled={isLoading}
          className="w-100 btn-lg" type="submit">{isLoading ? 'Loading…' : 'Sign in'}</Button>
      </form>
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

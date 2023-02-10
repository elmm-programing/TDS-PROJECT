import { BaseSyntheticEvent, useState } from 'react'
import { addUser } from "../Services/Users"
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  })
  const onChangeInput = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const navigate = useNavigate();
  const register = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    let response: boolean | string = await addUser(user);
    if (response == true) {
      navigate("/");
    } else if (response == "El Usuario ya existe") {
      alert("El Usuario ya existe")
    } else {
      console.log(false)
    }
  }

  return (
    <form className='form-signin w-100 m-auto text-center' onSubmit={register}>
      <h1 className="h3 mb-3 fw-normal">Sign out</h1>
      {Object.entries(user).map(([key]) => (
        <div className="form-floating mb-3" key={key}>
          <input type={key == "email" || key == "password" ? key : "text"} name={key} required className="form-control" onChange={onChangeInput}  placeholder="Email or Username" />
          <label >{key.charAt(0).toUpperCase() + key.slice(1)}</label>
        </div>

      ))}

      <button className="w-100 btn btn-lg btn-primary" type="submit" >Sign out</button>
    </form>
  )
}

export default Register

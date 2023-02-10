import { BaseSyntheticEvent, SyntheticEvent, useState } from 'react'
import { addUser } from "../Services/Users"
import { User } from '../Types/common'
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
const navigate = useNavigate();
  const register = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    let user: User = {
      name:name, 
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    }
    let response: boolean | string =await addUser(user);
    if (response == true) {
      navigate("/");
    }else if(response == "El Usuario ya existe"){
      alert("El Usuario ya existe")
    }else{
      console.log(false)
    }
  }

  return (
    <form className='form-signin w-100 m-auto text-center' onSubmit={register}>
      <h1 className="h3 mb-3 fw-normal">Sign out</h1>
<div className="form-floating mb-3">
        <input type="text" className="form-control" onChange={e => setName(e.target.value)}  placeholder="name@example.com" />
        <label >Name</label>
      </div><div className="form-floating mb-3">
        <input type="text" className="form-control" onChange={e => setLastName(e.target.value)}  placeholder="name@example.com" />
        <label >LastName</label>
      </div><div className="form-floating mb-3">
        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}  placeholder="name@example.com" />
        <label >Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" onChange={e => setUsername(e.target.value)}  placeholder="name@example.com" />
        <label >Username</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}  placeholder="Password" />
        <label >Password</label>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit" >Sign out</button>
    </form>
  )
}

export default Register

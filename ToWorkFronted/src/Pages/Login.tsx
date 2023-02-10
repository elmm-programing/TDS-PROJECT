import { BaseSyntheticEvent, SyntheticEvent, useState } from 'react'
import { loginUser } from "../Services/Users"
import { User } from '../Types/common'
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
const navigate = useNavigate();
  const login = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    let user: User = {
      name:"", 
      lastName: "",
      email: email,
      username: email,
      password: password,

    }
    let response: boolean | string =await loginUser(user);
    if (response == true) {
      navigate("/");
    }else if(response == "User Not Found"){
      alert("User Not Found")
    }else{
      console.log(false)
    }
  }

  return (
    <form className='form-signin w-100 m-auto text-center' onSubmit={login}>
      <h1 className="h3 mb-3 fw-normal">Sign in</h1>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} id="floatingInput" placeholder="Email or Username" />
        <label >Email or Username</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} id="floatingPassword" placeholder="Password" />
        <label >Password</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit" >Sign in</button>
    </form>
  )
}

export default Login

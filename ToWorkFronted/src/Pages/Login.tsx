import { BaseSyntheticEvent, SyntheticEvent, useState } from 'react'
import { RestApiClient } from '../Utils/RestApiClient'
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = async (e:BaseSyntheticEvent)=>{
    e.preventDefault()
console.log(await RestApiClient("users/"))
  }
    
  return (
<form className='form-signin w-100 m-auto text-center'  onSubmit={login}>
        <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} id="floatingInput" placeholder="name@example.com"/>
      <label >Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} id="floatingPassword" placeholder="Password"/>
      <label >Password</label>
    </div>

    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit" >Sign in</button>
    <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
  </form>
  )
}

export default Login

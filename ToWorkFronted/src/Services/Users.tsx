import { User } from '../Types/common'
import { RestApiClient } from '../Utils/RestApiClient'

export const getUsers = ()=>{
return RestApiClient("users/")
}
export const getPrueba = ()=>{
return fetch("users/prueba",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // This here
                }
)
}

export const loginUser = (user:User)=>{
return RestApiClient("users/login",{
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(user),
})

}
export const addUser =  (user:User)=>{
return RestApiClient("users/",{
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(user),
})

}

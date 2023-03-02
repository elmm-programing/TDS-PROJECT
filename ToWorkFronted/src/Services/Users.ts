import { User } from '../Types/common'
import { RestApiClient } from '../Utils/RestApiClient'

export const getUsers = async()=>{
return RestApiClient("users/")
}
export const loginUser = async (user:User)=>{
return RestApiClient("users/login",{
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(user),
})

}
export const addUser = async (user:User)=>{
return RestApiClient("users/",{
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(user),
})

}

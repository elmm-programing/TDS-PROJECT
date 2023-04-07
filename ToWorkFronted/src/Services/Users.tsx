import { IUser } from '../Types/common'
import { RestApiClient } from '../Utils/RestApiClient'

export const getUsers = () => {
  return RestApiClient("users/")
}
export const getUser = (username: string): Promise<IUser[]> => {
  return RestApiClient(`users/${username}`)

}

export const loginUser = (user: IUser) => {
  return RestApiClient("users/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

}
export const addUser = (user: IUser) => {
  return RestApiClient("users/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })

}

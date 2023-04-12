import { IPost } from '../Types/common'
import { RestApiClient } from '../Utils/RestApiClient'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const getPosts = async () => {
  return await RestApiClient("posts/", {
    method: 'GET',
    headers: { "Authorization": `Bearer ${cookies.get('jwtToken')}` }
  })
}

export const subirPost = async (posts: IPost) => {
  return RestApiClient("posts/", {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${cookies.get('jwtToken')}` },
    body: JSON.stringify(posts),
  })

}
export const getPostsByUsername = async (username:string) => {
  return await RestApiClient("posts/user/"+username, {
    method: 'GET',
    headers: { "Authorization": `Bearer ${cookies.get('jwtToken')}` }
  })
}


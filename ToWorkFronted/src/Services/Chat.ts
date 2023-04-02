import { RestApiClient } from '../Utils/RestApiClient'
import Cookies from 'universal-cookie';
import { Chat, IChat } from '../Types/common';

const cookies = new Cookies();
export const getUserChats = async (userName: string):Promise<IChat[]> => {
  return await RestApiClient("chat/user",{
    method:'POST',
    // headers:{"Authorization":`Bearer ${cookies.get('jwtToken')}`},
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userName),
  })
}
export const postMessage = async (chat: IChat):Promise<String> => {
  return await RestApiClient("chat",{
    method:'POST',
    // headers:{"Authorization":`Bearer ${cookies.get('jwtToken')}`},
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chat),
  })
}

// export const subirPost = async (posts: Posts) => {
//   return RestApiClient("posts/", {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(posts),
//   })
//
// }

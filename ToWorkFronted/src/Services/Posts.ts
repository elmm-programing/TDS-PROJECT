import { Posts } from '../Types/common'
import { RestApiClient } from '../Utils/RestApiClient'

export const getPosts = async () => {
  return await RestApiClient("posts/")
}

export const subirPost = async (posts: Posts) => {
  return RestApiClient("posts/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(posts),
  })

}

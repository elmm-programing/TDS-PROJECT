import { IComentarios } from '../Types/common'
import { RestApiClient } from '../Utils/RestApiClient'

export const getComentarios = async () => {
  return await RestApiClient("coments/commentModal/")
}

export const subirIdPost = async (idPost: string) => {
  return RestApiClient("coments/commentModal/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idPost),
  })

}

export const subirComentarios = async (comentario: IComentarios) => {
  return RestApiClient("coments/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comentario),
  })

}

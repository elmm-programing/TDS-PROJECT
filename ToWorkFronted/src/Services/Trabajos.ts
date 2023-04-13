import { RestApiClient } from '../Utils/RestApiClient'

export const getWorkByUserName = (username: string) => {
  return RestApiClient("trabajos/" + username)
}

export const AceptarTrabajo = (trabajo: { idUser: string, titulo: string, idCliente: string, idPost: string }) => {
  return RestApiClient("trabajos/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trabajo),
  })

}
export const deleteTrabajo = (id: string) => {
  return RestApiClient("trabajos/" + id, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  })

}


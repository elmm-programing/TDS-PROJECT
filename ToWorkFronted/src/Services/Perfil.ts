import { Perfil } from '../Types/common'
import { RestApiClient } from '../Utils/RestApiClient'

export const getPerfil = async (idUser: string) => {
  return RestApiClient("perfil/recibir/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idUser),
  })

}

export const getImagen = async (idUser: string) => {
  return RestApiClient("perfil/recibir/imagen", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idUser),
  })

}

export const subirPerfil = async (perfil: Perfil) => {
  return RestApiClient("perfil/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(perfil),
  })

}

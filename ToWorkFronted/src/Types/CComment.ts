import { IComentarios } from "./common"
import uuid from 'react-uuid';

const today = new Date(Date.now());

export class CComments implements IComentarios {
	idCom = uuid()
	idPost = ''
	titulo = ''
	comentario = ''
	file: any
	fileName = ''
	dueñoId = ''
	dueño = ''
	fecha = today.toDateString()
	perfil = ''

}

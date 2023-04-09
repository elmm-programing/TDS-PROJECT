import { IPost } from "./common"
import uuid from 'react-uuid';

const today = new Date(Date.now());

export class CPost implements IPost {
	idPosts = uuid()
	titulo = ''
	comentario = ''
	file: any
	fileName = ''
	dueñoId = ''
	dueño = ''
	fecha = today.toDateString()
	perfil = ''

}

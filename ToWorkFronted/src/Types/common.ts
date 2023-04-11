export interface IUser {
	name: string,
	lastName: string,
	email: string,
	username: string,
	password: string,
	roles: string[],
	telefono:string,
	direccion : string,
	area: string[],
	conocimientos:string[] 
	experiencias:string[]
	certificados:string[]
	descripcion:string
	imagen:any
}

export interface IPost {
	idPosts: string,
	titulo: string,
	comentario: string,
	file: any,
	fileName: any,
	dueñoId: string,
	dueño: string,
	fecha: string,
	perfil: any,
}

export interface IComentarios {
	idCom: string
	idPost: string
	comentario: string
	dueñoId: string
	dueño: string
	fecha: string

}
export interface IChat {
	id: string,
	members: string[],
	messages: { from: string, body: string }[]
}

export interface IAuthResponse {
	token: string,
	user: IUser,
	error: string,
}

export interface Perfil {
	idUser: string,
	area: any,
	direccion: string,
	telefono: string,
	email: string,
	conocimientos: any,
	experiencias: any,
	certificados: any,
	descripcion: string,
	imagen: any,
}


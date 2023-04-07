export interface IUser {
	name: string,
	lastName: string,
	email: string,
	username: string,
	password: string,
	roles: string[],
}

export interface IPosts {
	idPosts: string,
	titulo: string,
	imagen: string,
	dueñoId: string,
	dueño: string,
	fecha: string,
	comentario: number,
}

export interface IComentarios {
	idCom: string,
	idPost: string,
	comentario: string,
	dueñoId: string,
	dueño: string,
	fecha: string,
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

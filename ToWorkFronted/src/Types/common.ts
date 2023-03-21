export interface User {
	name: string,
	lastName: string,
	email: string,
	username: string,
	password: string,
	roles : string[],
}

export interface Posts {
    idPosts: string,
    titulo: string,
    imagen: string,
    dueñoId: string,
    dueño: string,
    fecha: string,
    comentario: number,
}

export interface Comentarios {
    idCom: string,
    idPost: string,
    comentario: string,
    dueñoId: string,
    dueño: string,
    fecha: string,
}

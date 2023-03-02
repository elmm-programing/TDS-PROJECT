export interface User {
	name: string,
	lastName: string,
	email: string,
	username: string,
	password: string,
}

export interface Posts {
    id: string,
    titulo: string,
    imagen: string,
    dueñoId: string,
    dueño: string,
    fecha: string,
    comentario: string,
}

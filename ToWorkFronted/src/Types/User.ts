import { IUser } from "./common"

export class CUser implements IUser {
	name: string = ""
	lastName: string = ""
	email: string = ""
	username: string = ""
	password: string = ""
	roles: string[] = [
		"USER"
	]
	telefono = ""
	direccion = ""
	area = [
	]
	conocimientos = [
	]
	experiencias = [
	]
	certificados = [
	]
	descripcion = ""
	imagen: any

}

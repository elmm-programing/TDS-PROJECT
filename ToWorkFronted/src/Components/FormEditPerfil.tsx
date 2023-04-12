import { BaseSyntheticEvent, useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useUserStore } from "../store/UsersStore"
import { TagsInput } from "react-tag-input-component";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../Services/Users";
import { queryClient } from "../Utils/QueryClient";

export default function FormEditPerfil() {
  const userStore = useUserStore()
  const [user, setUser] = useState(userStore.user)
  const [selectedArea, setSelectedArea] = useState<string[]>(userStore.user.area);
  const [selectedConocimientos, setSelectedConocimientos] = useState<string[]>(userStore.user.conocimientos);
  const [selectedExperiencia, setSelectedExperiencia] = useState<string[]>(userStore.user.experiencias);
  const [selectedCertificados, setSelectedCertificados] = useState<string[]>(userStore.user.certificados);
  const [image, setimage] = useState<any>(user.imagen);
  console.log(userStore.user.area)

  const handleFile = async (e: BaseSyntheticEvent) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      user.imagen = reader.result
      setimage(user.imagen)
    }
  }
  const keys = Object.keys(userStore.user).filter(key => key != "roles" && key != "area" && key != "conocimientos" && key != "experiencias" && key != "certificados" && key != "imagen" && key != "password" && key != "id")

  const onChangeInput = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const editPerfil = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    user.area = selectedArea
    user.conocimientos = selectedConocimientos
    user.experiencias = selectedExperiencia
    user.certificados = selectedCertificados
    userStore.setUser(user)
    mutationCom.mutate(user)
  }
  const mutationCom = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['com'] })
    },
  })

  return (
    <Card className='p-2 shadow-sm text-center'>
      <Form id='perfil' onSubmit={editPerfil}>
        <Card.Header className='bg-white'>

          <input id="multimedia" accept='image/png, image/jpeg, image/jpg, image/gif' style={{ display: "none" }} onChange={(event) => { handleFile(event) }} type='file' />
          <label htmlFor="multimedia" >

            <img className='img-fluid rounded-circle' style={{ maxHeight: '15vh', maxWidth: '15vh' }} src={image} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width="100" height="100" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </label>
          <p className='fw-bold'>Wilker</p>
        </Card.Header>
        <Card.Header className='bg-white pt-4'>
          <div className="fs-6 fw-bold text-uppercase pb-2" style={{ fontFamily: 'Lucida Console' }}>
            Informacion general:
          </div>
          <div className='text-center pb-3'>
            <div className='fw-bold' style={{ color: '#000', fontFamily: 'Lucida Console' }}>Area:</div>
            {keys.map((key) => (
              <Form.Group className="form-group pb-3" key={key}>
                <Form.Control className=' text-dark' type={key == "email" || key == "password" ? key : "text"} name={key} onChange={onChangeInput} required value={user[key]} placeholder={key == 'email' ? "Email or Username" : key.charAt(0).toUpperCase() + key.slice(1)} />
              </Form.Group>
            ))}
            <div className="my-3">
              <TagsInput
                value={selectedArea}
                onChange={setSelectedArea}
                name="Area"
                placeHolder="Enter Area"
              />
            </div>
            <div className="my-3">
              <TagsInput
                value={selectedConocimientos}
                onChange={setSelectedConocimientos}
                name="Conocimientos"
                placeHolder="Enter Conocimientos"
              />
            </div>
            <div className="my-3">
              <TagsInput
                value={selectedExperiencia}
                onChange={setSelectedExperiencia}
                name="Experiencia"
                placeHolder="Enter Experiencia"
              />
            </div>
            <div className="my-3">
              <TagsInput
                value={selectedCertificados}
                onChange={setSelectedCertificados}
                name="Certificados"
                placeHolder="Enter Certificados"
              />

            </div>

            <Button type="submit" className="btn btn-dark w-100 font-weight-bold text-uppercase mt-2">Editar</Button>
          </div>
        </Card.Header>
      </Form>



    </Card>

  )
}

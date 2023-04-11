import { BaseSyntheticEvent, useState } from 'react'
import { addUser } from "../Services/Users"
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/esm/Form';
import '../Styles/Register.css';
import Fade from 'react-bootstrap/esm/Fade';
import Alert from 'react-bootstrap/esm/Alert';
import { Button } from 'react-bootstrap';
import { useUserStore } from '../store/UsersStore';
import { CUser } from '../Types/User';
import { IAuthResponse } from '../Types/common';
import { setCookie } from '../Utils/GetCookies';
import { useMutation } from '@tanstack/react-query';
import { subirPerfil } from '../Services/Perfil';
import { queryClient } from '../Utils/QueryClient';
import { CPerfil } from '../Types/CPerfil';

function Register() {

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [variant, setVariant] = useState("")
  const state = useUserStore()
const [perfil, setPerfil] = useState(new CPerfil)
  const [user, setUser] = useState(new CUser())
    const onChangeInput = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const navigate = useNavigate();
  const register = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    let response: IAuthResponse = await addUser(user);
    if (response.token) {
      setCookie('jwtToken', response.token)
      state.setUser(response.user)
      perfil.idUser=response.user.username
      mutationPerfil.mutate(perfil);
      navigate("/inicio");

    } else if (response.error == "El Usuario ya existe") {
      setVariant("danger")
      setAlertText("El Usuario ya existe")
      setAlert(true)
    }

  }
  const keys = Object.keys(user).filter(key => key != "roles" && key != "telefono" && key != "direccion"&& key != "area"&& key != "conocimientos"&& key != "experiencias"&& key != "certificados"&& key != "descripcion"&& key != "imagen")
  const mutationPerfil = useMutation({
    mutationFn: subirPerfil,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['perfil'] })
    },
  })

  return (
    <>
      <Form className="form-style" id='registrar' onSubmit={register}>
        <h4 className="pb-3 text-center text-white ">Registrar</h4>
        {keys.map((key) => (
          <Form.Group className="form-group pb-3" key={key}>
            <Form.Control className=' text-white' type={key == "email" || key == "password" ? key : "text"} name={key} onChange={onChangeInput} required placeholder={key == 'email' ? "Email or Username" : key.charAt(0).toUpperCase() + key.slice(1)} />
          </Form.Group>
        ))}
        <div className="pb-4">
          <Button type="submit" className="btn btn-dark w-100 font-weight-bold text-uppercase mt-2">¡Registrate!</Button>
        </div>
      </Form>
      <div style={{ minHeight: '150px' }}>
        <Fade in={alert} >
          <Alert show={alert} className='position-absolute bottom-0 end-0 w-auto' variant={variant} onClose={() => setAlert(false)} dismissible >
            {alertText}
          </Alert>

        </Fade >
      </div>
    </>
  )
}

export default Register

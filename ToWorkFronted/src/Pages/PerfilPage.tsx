import { Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { getPosts } from "../Services/Posts"
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import '../Styles/Perfil.css';
import uuid from 'react-uuid';
import g from '../assets/me-gusta.png';
import n from '../assets/no me gusta.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../Utils/QueryClient';
import { subirComentarios } from '../Services/Comentario';
import { getPerfil, subirPerfil } from '../Services/Perfil';
import { Perfil, IPost } from '../Types/common';
import { NavBar } from '../Components/NavBar';
import Comentario from '../Components/Comentario';
import { useUserStore } from '../store/UsersStore';

export function PerfilPage() {
  const today = new Date(Date.now());
  const [name, setName] = useState(n);
  const [imagen, setImagen] = useState('');
  const [inputDireccion, setinputDireccion] = useState('');
  const [inputTelefono, setInputTelefono] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputDescripcion, setInputDescripcion] = useState('');
  const [perfil, setPerfil] = useState({
    idUser: '',
    imagen: '',
    area: [''],
    direccion: '',
    telefono: '',
    email: '',
    conocimientos: [''],
    experiencias: [''],
    certificados: [''],
    descripcion: '',
  })

  const userStore = useUserStore()

  const [agregado, setAgregado] = useState(0);
  const [cargado, setCargado] = useState(0);

  const [addComment, setaddComment] = useState({
    idCom: '',
    idPost: '',
    comentario: '',
    dueñoId: '',
    dueño: '',
    fecha: '',
  })

  const onChangeInputComment = (e: BaseSyntheticEvent, id: string) => {
    const { name, value } = e.target;
    setaddComment({
      idCom: uuid(),
      idPost: id.toString(),
      comentario: value,
      dueñoId: '',
      dueño: '',
      fecha: today.toDateString()
    });
  }

  const handleFile = (e: BaseSyntheticEvent) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => { setImagen(reader.result) }
  }

  const onChangeInputDireccion = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setinputDireccion(value);
  }

  const onChangeInputTelefono = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setInputTelefono(value);
  }

  const onChangeInputEmail = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setInputEmail(value);
  }

  const onChangeInputDescripcion = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setInputDescripcion(value);
  }

  const [inputAddArea, setInputAddArea] = useState<string[]>([''])
  const [inputAddConocimientos, setInputAddConocimientos] = useState<string[]>([''])
  const [inputAddExperiencias, setInputAddExperiencias] = useState<string[]>([''])
  const [inputAddCertificados, setInputAddCertificados] = useState<string[]>([''])

  const addRowArea = () => {
    setInputAddArea([...inputAddArea, ''])
  }

  const addRowConocimientos = () => {
    setInputAddConocimientos([...inputAddConocimientos, ''])
  }

  const addRowExperiencias = () => {
    setInputAddExperiencias([...inputAddExperiencias, ''])
  }

  const addRowCertificados = () => {
    setInputAddCertificados([...inputAddCertificados, ''])
  }

  const onRemoveArea = (i) => {
    const inputValue = [...inputAddArea]
    inputValue.splice(i, 1)
    setInputAddArea(inputValue)
  }

  const onRemoveConocimientos = (i) => {
    const inputValue = [...inputAddConocimientos]
    inputValue.splice(i, 1)
    setInputAddConocimientos(inputValue)
  }

  const onRemoveExperiencias = (i) => {
    const inputValue = [...inputAddExperiencias]
    inputValue.splice(i, 1)
    setInputAddExperiencias(inputValue)
  }

  const onRemoveCertificados = (i) => {
    const inputValue = [...inputAddCertificados]
    inputValue.splice(i, 1)
    setInputAddCertificados(inputValue)
  }

  const changeName = () => {
    let value = name;
    if (value === n) {
      setName(g);
    } else {
      setName(n);
    }
  };

  const query = useQuery({ queryKey: ['post'], queryFn: getPosts })
  const valores = useQuery({ queryKey: ['perfil'], queryFn: () => getPerfil("7fef47d2-1ef7-4448-2b4b-4c1fe8d88ba6") });

  function get() {
    if (cargado == 0) {
      valores.data?.map((p: Perfil) => {
        setImagen(p.imagen);
        setInputAddArea(p.area);
        setInputAddCertificados(p.certificados);
        setInputAddConocimientos(p.conocimientos);
        setInputAddExperiencias(p.experiencias);
        setinputDireccion(p.direccion)
        setInputDescripcion(p.descripcion)
        setInputTelefono(p.telefono)
        setInputEmail(p.email)
        setCargado(1)
      })
    }
  }


  const mutationCom = useMutation({
    mutationFn: subirComentarios,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['com'] })
    },
  })

  // Mutations
  const mutationPerfil = useMutation({
    mutationFn: subirPerfil,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['perfil'] })
    },
  })

  useEffect(() => {
    get();
  }, [valores]);

  useEffect(() => {
    addCualidades();
  }, [perfil]);

  const agregar = async () => {
    console.log(perfil.area);
    await setPerfil({
      idUser: '7fef47d2-1ef7-4448-2b4b-4c1fe8d88ba6',
      imagen: imagen,
      area: inputAddArea,
      direccion: inputDireccion,
      telefono: inputTelefono,
      email: inputEmail,
      conocimientos: inputAddConocimientos,
      experiencias: inputAddExperiencias,
      certificados: inputAddCertificados,
      descripcion: inputDescripcion
    })
    setAgregado(1);
  }

  async function addCualidades() {
    if (agregado == 1) {
      await mutationPerfil.mutate(perfil);
    }
  }

  const onHandleArea = (e, i) => {
    let inputValue = [...inputAddArea]
    inputValue[i] = e.target.value
    setInputAddArea(inputValue);
  }

  const onHandleConocimientos = (e, i) => {
    let inputValue = [...inputAddConocimientos]
    inputValue[i] = e.target.value
    setInputAddConocimientos(inputValue);
  }

  const onHandleExperiencias = (e, i) => {
    let inputValue = [...inputAddExperiencias]
    inputValue[i] = e.target.value
    setInputAddExperiencias(inputValue);
  }

  const onHandleCertificados = (e, i) => {
    let inputValue = [...inputAddCertificados]
    inputValue[i] = e.target.value
    setInputAddCertificados(inputValue);
  }


  return (<>
    <NavBar />
    <div className='p-3 pt-5'>
      <Row>
        <Col md={4} sm={2} className='justify-content-center'>
          <Card className='p-2 shadow-sm text-center'>

            {valores.data?.map((p: Perfil) => (
              <Form id='perfil'>
                <Card.Header className='bg-white'>
                  <input id="multimedia" accept='image/png, image/jpeg, image/jpg, image/gif' style={{ display: "none" }} onChange={(event) => { handleFile(event) }} type='file' />
                  <label htmlFor="multimedia" type="button">
                    {
                      imagen != '' ? <img className='img-fluid rounded-circle' style={{ maxHeight: '15vh' }} src={imagen} />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width="100" height="100" stroke="currentColor" >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                  </label>
                  <p className='fw-bold'>Wilker</p>
                </Card.Header>
                <Card.Header className='bg-white pt-4'>
                  <div className="fs-6 fw-bold text-uppercase pb-2" style={{ fontFamily: 'Lucida Console' }}>
                    Informacion general:
                  </div>
                  <div className='text-center pb-3'>
                    <div className='fw-bold' style={{ color: '#000', fontFamily: 'Lucida Console' }}>Area:</div>


                    {inputAddArea.map((item, i) => (
                      <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                        <Form.Control className='h-25 w-50' onChange={(e) => onHandleArea(e, i)} placeholder='Añadir' value={inputAddArea[i]}>
                        </Form.Control>
                        {
                          i == 0 ? "" : <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={() => onRemoveArea(i)} width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                          </svg>
                        }
                      </div>
                    ))}

                    <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={addRowArea} width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                  </div>

                  <div className='text-center pb-3'>
                    <div className='fw-bold' style={{ fontFamily: 'Lucida Console' }}>Direccion:</div>
                    <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                      <Form.Control className='h-25 w-50' onChange={(e) => onChangeInputDireccion(e)} placeholder='Añadir' value={inputDireccion}>
                      </Form.Control>
                    </div>
                  </div>

                  <div className='pb-3'>
                    <div className='fw-bold' style={{ fontFamily: 'Lucida Console' }}>Telefono:</div>
                    <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                      <Form.Control className='h-25 w-50' type='number' onChange={(e) => onChangeInputTelefono(e)} placeholder='Añadir' value={inputTelefono}>
                      </Form.Control>
                    </div>
                  </div>

                  <div className='pb-3'>
                    <div className='fw-bold' style={{ fontFamily: 'Lucida Console' }}>Email:</div>
                    <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                      <Form.Control className='h-25 w-50' type='email' onChange={(e) => onChangeInputEmail(e)} placeholder='Añadir' value={inputEmail}>
                      </Form.Control>
                    </div>
                  </div>

                </Card.Header>

                <Card.Header className='bg-white pt-4'>
                  <div className="fs-6 fw-bold text-uppercase pb-2" style={{ fontFamily: 'Lucida Console' }}>
                    Conocimientos:
                  </div>

                  {inputAddConocimientos.map((item, i) => (
                    <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                      <Form.Control className='h-25 w-50' onChange={(e) => onHandleConocimientos(e, i)} placeholder='Añadir' value={inputAddConocimientos[i]}>
                      </Form.Control>
                      {
                        i == 0 ? "" : <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={() => onRemoveConocimientos(i)} width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                      }
                    </div>
                  ))}

                  <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={addRowConocimientos} width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                  </svg>
                </Card.Header>

                <Card.Header className='bg-white pt-4'>
                  <div className="fs-6 fw-bold text-uppercase pb-2" style={{ fontFamily: 'Lucida Console' }}>
                    Experiencias:
                  </div>


                  {inputAddExperiencias.map((item, i) => (
                    <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                      <Form.Control className='h-25 w-50' onChange={(e) => onHandleExperiencias(e, i)} placeholder='Añadir'>
                      </Form.Control>
                      {
                        i == 0 ? "" : <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={() => onRemoveExperiencias(i)} width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                      }
                    </div>
                  ))}

                  <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={addRowExperiencias} width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                  </svg>
                </Card.Header>

                <Card.Header className='bg-white pt-4'>
                  <div className="fs-6 fw-bold text-uppercase pb-2" style={{ fontFamily: 'Lucida Console' }}>
                    Certificaciones:
                  </div>


                  {inputAddCertificados.map((item, i) => (
                    <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                      <Form.Control className='h-25 w-50' onChange={(e) => onHandleCertificados(e, i)} placeholder='Añadir' value={inputAddCertificados[i]}>
                      </Form.Control>
                      {
                        i == 0 ? "" : <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={() => onRemoveCertificados(i)} width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                      }
                    </div>
                  ))}

                  <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={addRowCertificados} width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                  </svg>
                </Card.Header>

                <Card.Header className='bg-white pt-4'>
                  <div className="fs-6 fw-bold text-uppercase pb-2" style={{ fontFamily: 'Lucida Console' }}>
                    Descripcion:
                  </div>
                  <div className='d-flex justify-content-center pb-3' style={{ fontFamily: 'Lucida Console' }}>
                    <Form.Control className='h-25 w-50' onChange={(e) => onChangeInputDescripcion(e)} placeholder='Añadir' value={inputDescripcion}>
                    </Form.Control>
                  </div>
                  <button onClick={agregar} className='border-0 bg-transparent' >
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} width="16" height="16" fill="currentColor" className="bi bi-check2 m-1" viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                  </button>
                </Card.Header>
              </Form>

            ))}


          </Card>
        </Col>

        <Col className='d-flex align-items-start'>
          <div className='p-5 w-100'>
            <div className='pb-4'>
              <p className='font-weight-bold text-uppercase h4'>Publicaciones</p>
            </div>
            {query.data?.map((post: IPost) => (
              <div >
                <Card className='shadow-sm' key={post.idPosts}>
                  <Card.Header>
                    <Row>
                      <Col>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width="40" height="40" stroke="currentColor" className='rounded' >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        <span> {post.dueño}</span>
                      </Col>
                      <Col className='mt-2 text-reset fst-italic text-end'>
                        <span style={{ color: "#055C9D" }}>{post.fecha}</span>
                      </Col>

                    </Row>

                  </Card.Header>
                  <Card.Body>
                    <p className='h4 text-truncate'>{post.titulo}</p>
                    {post.comentario}
                    {post.file == '' ? '' :
                      <div className='d-flex align-items-center justify-content-center'>
                        <img onError={(event) => { event.currentTarget.style.display = 'none'; }} className='img-fluid rounded' style={{ maxHeight: '100vh' }} src={post.file} />
                        {post.file.includes("image") == false ?
                          <a style={{ textDecoration: 'none' }} download={post.fileName} href={post.file}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg> <a className='h5 text-truncate' style={{ textDecoration: 'none', fontFamily: 'monospace' }}>{post.fileName}</a>
                          </a> : ''}
                      </div>
                    }
                    <div className='pt-4 d-flex justify-content-sm-end'><Button type="submit" className="btn btn-success font-weight-bold text-uppercase">Aceptar Propuesta</Button></div>
                  </Card.Body>
                  <Card.Footer>
                    <Row className='d-flex align-items-center justify-content-center'>
                      <Col md={2} sm={2} >
                        <br></br>
                        <img onClick={changeName} className='img rounded' style={{ height: 40, cursor: 'pointer' }} src={name} />
                      </Col>
                      <Col>
                        <Form id='coment'>
                          <Form.Group>
                            <div className="input-group mt-4">
                              <Form.Control name='comentario' onChange={(event) => onChangeInputComment(event, post.idPosts)} className='w-50' placeholder='Comentario...'></Form.Control>
                              <span className="input-group-append pt-2">
                                <button onClick={() => {
                                  mutationCom.mutate(addComment)
                                }} className="btn border border-left-0" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                  </svg></button>
                              </span>
                            </div>
                          </Form.Group>
                        </Form>
                      </Col>
                      <Comentario
                        idPosts={post.idPosts}
                        dueño={post.dueño}
                        titulo={post.titulo}
                        fecha={post.fecha}
                      />

                    </Row>
                  </Card.Footer>
                </Card>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            ))}
          </div>
        </Col>
        <Col md={3} sm={2} className=''>
          <Card className='p-2 shadow-sm w-100'>
            <Card.Header className='bg-white'>
              <p className='font-weight-bold h5'>Ultimos Trabajos</p>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item as="li" className="border-0 justify-content-between align-items-start" style={{ cursor: 'pointer' }}>
                  <div className="ms-2 text-start">
                    <p className="fw-bold">Luz automatica</p>
                    <p className="blockquote-footer">Hola</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="border-0 justify-content-between align-items-start" style={{ cursor: 'pointer' }}>
                  <div className="ms-2 text-start">
                    <p className="fw-bold">Luz automatica</p>
                    <p className="blockquote-footer">Hola</p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div >

  </>
  )


}

function componentDidMount() {
  throw new Error('Function not implemented.');
}

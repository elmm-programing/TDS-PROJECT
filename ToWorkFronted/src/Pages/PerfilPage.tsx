import { Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { getPosts, getPostsByUsername } from "../Services/Posts"
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import '../Styles/Perfil.css';
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
import { CPerfil } from '../Types/CPerfil';
import { CComments } from '../Types/CComment';
import FormEditPerfil from '../Components/FormEditPerfil';

export function PerfilPage() {
  const [name, setName] = useState(n);

  const [addComment, setaddComment] = useState(new CComments())

  const onChangeInputComment = (e: BaseSyntheticEvent, id: string) => {
    const { name, value } = e.target;
    addComment.idPost = id.toString()
    addComment.comentario = value
  }

  const changeName = () => {
    let value = name;
    if (value === n) {
      setName(g);
    } else {
      setName(n);
    }
  };
  const userStore = useUserStore()

  const query = useQuery({ queryKey: ['post'], queryFn: ()=> getPostsByUsername(userStore.selectedPerfil.username === ""? userStore.user.username:userStore.selectedPerfil.username) })


  const mutationCom = useMutation({
    mutationFn: subirComentarios,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['com'] })
    },
  })

  return (<>
    <NavBar />
    <div className='p-3 pt-5'>
      <Row>
        <Col md={4} sm={2} className='justify-content-center'>
{userStore.selectedPerfil.username === "" ?<FormEditPerfil  editable={true} /> 
 :<FormEditPerfil cUser={userStore.selectedPerfil}  editable={false} />

}
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
                        data={post}
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

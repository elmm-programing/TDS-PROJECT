import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { usePostStore } from '../store/PostsStore';
import '../Styles/Feed.css';
import { IPost } from '../Types/common';
import g from '../assets/me-gusta.png';
import n from '../assets/no me gusta.png';
import { BaseSyntheticEvent, useState } from 'react';
import { CComments } from '../Types/CComment';
import { useUserStore } from '../store/UsersStore';
import { useMutation } from '@tanstack/react-query';
import { subirComentarios } from '../Services/Comentario';
import { queryClient } from '../Utils/QueryClient';
import Comentario from './Comentario';

export default function ListPosts() {
  const postStore = usePostStore()
  const userStore = useUserStore()
  const [commentIcon, setCommentIcon] = useState(n);

  const [addComment, setaddComment] = useState(new CComments())

  const changeCommentIcon = () => { commentIcon === n ? setCommentIcon(g) : setCommentIcon(n) }

  const onChangeInputComment = (e: BaseSyntheticEvent, id: string) => {
    const { value } = e.target;
    setaddComment(new CComments())

    setaddComment({ ...addComment, idPost: id.toString(), comentario: value, dueñoId: userStore.user.username, dueño: userStore.user.username })
  }
  const mutationCom = useMutation({
    mutationFn: subirComentarios,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['Comments'] })
    },
  })
  return (<>

    {postStore.allPosts.map((todo: IPost) => {
      return (
        <Card className='shadow-sm'>
          <Card.Header>
            <Row>
              <Col>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width="40" height="40" stroke="currentColor" className='rounded' >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                <span> {todo.dueño}</span>
              </Col>
              <Col className='mt-2 text-reset fst-italic text-end'>
                <span style={{ color: "#055C9D" }}>{todo.fecha}</span>
              </Col>

            </Row>

          </Card.Header>
          <Card.Body>
            <p className='h4 text-truncate'>{todo.titulo}</p>
            {todo.comentario}
            {todo.file == '' ? '' :
              <div className='d-flex align-items-center justify-content-center'>
                <a style={{ textDecoration: 'none' }} download={todo.fileName} href={todo.file}>
                  <img onError={(event) => { event.currentTarget.style.display = 'none'; }} className='img-fluid rounded' style={{ maxHeight: '100vh' }} src={todo.file} />

                </a>
              </div>
            }
            <div className='pt-4 d-flex justify-content-sm-end'><Button type="submit" className="btn btn-success font-weight-bold text-uppercase">Aceptar Propuesta</Button></div>
          </Card.Body>
          <Card.Footer>
            <Row className='d-flex align-items-center justify-content-center'>
              <Col md={1} sm={2} >
                <br></br>
                <img onClick={changeCommentIcon} className='img rounded' style={{ height: 40, cursor: 'pointer' }} src={commentIcon} />
              </Col>
              <Col>
                <Form id='coment'>
                  <Form.Group>
                    <div className="input-group mt-4">
                      <Form.Control name='comentario' onChange={(event) => onChangeInputComment(event, todo.idPosts)} className='w-50' placeholder='Comentario...'></Form.Control>
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
                data={todo}
              />

            </Row>
          </Card.Footer>
        </Card>


      )
    }

    )}

  </>)
}


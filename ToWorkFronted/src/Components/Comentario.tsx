import { Row, Col, Card, Form, Button, Modal, ListGroup } from 'react-bootstrap';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import g from '../assets/me-gusta.png';
import n from '../assets/no me gusta.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../Utils/QueryClient';
import { subirComentarios, subirIdPost } from '../Services/Comentario';
import { CComments } from '../Types/CComment';
import { useUserStore } from '../store/UsersStore';
import { IPost } from '../Types/common';

function Comentario(props: { data: IPost }) {
  const [show, setShow] = useState(false);
  const userStore = useUserStore()

  const [state, setState] = useState(false);
  const changeState = () => {
    if (state === true) {
      setState(false);
      setShow(false);
    }
    else {
      setState(true);
      setShow(true);
    }
  }

  const [commentIcon, setCommentIcon] = useState(n);

  const changeCommentIcon = () => { commentIcon === n ? setCommentIcon(g) : setCommentIcon(n) }


  const [addComment, setaddComment] = useState(new CComments())

  let comentario = [new CComments()];

  const [comentarios, setComentarios] = useState(comentario);

  const onChangeInputComment = (e: BaseSyntheticEvent, id: string) => {
    const { value } = e.target;

    setaddComment({ ...addComment, idPost: id.toString(), comentario: value, dueñoId: userStore.user.username, dueño: userStore.user.username })
  }

  // Mutations
  const mutationCom = useMutation({
    mutationFn: subirComentarios,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['Comments'] })
    },
  })

  const { data } = useQuery(["Comments"], () => subirIdPost(props.data.idPosts));

  useEffect(() => {
    if (data !== undefined) {
      setComentarios(data)
    }
  }, [data]);

  return (state) ? (
    <>
      <a className='d-flex justify-content-sm-end' onClick={changeState} style={{ textDecoration: 'none', cursor: 'pointer' }}>Ver comentarios...</a>
      <Modal show={show} onHide={changeState}>
        <div className='' >
          <Card className='shadow-sm' key={props.data.idPosts}>
            <Card.Header>
              <Row>
                <Col>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width="40" height="40" stroke="currentColor" className='rounded' >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <span> {props.data.dueño}</span>
                </Col>
                <Col className='mt-2 text-reset fst-italic text-end'>
                  <span style={{ color: "#055C9D" }}>{props.data.fecha}</span>
                </Col>

              </Row>

            </Card.Header>
            <Card.Body>{props.data.titulo}
              <div className='d-flex align-items-center justify-content-center'><img onError={event => event.currentTarget.style.display = 'none'} className='img-fluid' src={props.data.file} /> </div>
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
                        <Form.Control name='comentario' onChange={(event) => onChangeInputComment(event, props.data.idPosts)} className='w-50' placeholder='Comentario...'></Form.Control>
                        <span className="input-group-append pt-2">
                          <button onClick={() => {
                            mutationCom.mutate(addComment)
                          }} className="btn border border-left-0" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg></button>
                        </span>
                      </div>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </div>
        <div className='pt-3'>
          {comentarios.map((c) => (
            <ListGroup as="ol">
              <ListGroup.Item as="li" className="border-top-0 d-flex justify-content-between align-items-start" style={{ cursor: 'pointer' }}>
                <div className="ms-2 me-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width="40" height="40" stroke="currentColor" className='rounded' >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a style={{ textDecoration: 'none', color: '#000' }} className="fw-bold p-2">{c.dueño}</a>
                  <p className="blockquote-footer p-3">{c.comentario}</p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
      </Modal>
    </>
  ) : <>
    <a className='d-flex justify-content-sm-end' onClick={changeState} style={{ textDecoration: 'none', cursor: 'pointer' }}>Ver comentarios...</a>
  </>
}

export default Comentario

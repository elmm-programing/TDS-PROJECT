import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { usePostStore } from '../store/PostsStore';
import '../Styles/Feed.css';
import { IPost } from '../Types/common';

export default function ListPosts() {
  const postStore = usePostStore()


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
              <Col md={1} sm={2}>
              </Col>
              <Col>
                <Form id='coment'>
                  <Form.Control className='w-100' placeholder='Comentario...'></Form.Control>
                </Form>
              </Col>
            </Row>
          </Card.Footer>
        </Card>


      )
    }

    )}

  </>)
}


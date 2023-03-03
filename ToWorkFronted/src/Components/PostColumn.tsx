import { Row, Col, Card, Form, Button, Fade } from 'react-bootstrap';
import logo from '../assets/logo 1.png';
import g from '../assets/me-gusta.png';
import n from '../assets/no me gusta.png';
import '../Styles/Feed.css';
import { BaseSyntheticEvent, useState } from 'react';
import { getPosts, subirPost } from "../Services/Posts"
import Alert from 'react-bootstrap/esm/Alert';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../Utils/QueryClient';
import { Posts } from '../Types/common';

export default function PostColumn() {
    const today = new Date(Date.now());

    const [imagen, setImagen] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [name, setName] = useState(n);
    const [addpost, setaddPost] = useState({
        idPosts: '',
        titulo: '',
        imagen: '',
        dueñoId: '',
        dueño: '',
        fecha: today.toDateString(),
        comentario: 0,
    })

    const onChangeInput = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target
        setaddPost({ ...addpost, [name]: value })
    }

    const changeName = () => {
        let value = name;

        if (value === n) {
            setName(g);
        } else {
            setName(n);
        }
    };

    const publicar = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        let response: boolean | string = await subirPost(addpost);
        if (response == false) {
            setAlertText(response.toString());
            setAlert(true);
        }
        return response
    }

    const query = useQuery({ queryKey: ['todos'], queryFn: getPosts })
    // Mutations
    const mutation = useMutation({
        mutationFn: subirPost,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    return (<>
        <h2 className='font-weight-bold text-uppercase h2 mx-4'>Publicaciones</h2>
        <div className='p-4 w-75 mb-5'>

            <Card className='shadow-sm mh-25'>
                <Card.Body>
                    <Form>
                        <Form.Group className='pb-2'>
                            <Form.Control onChange={onChangeInput} placeholder='Crear publicacion' name='titulo' as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control className='w-50' onChange={(event) => { setImagen(event.target.files[0]); }} type='file' placeholder='Subir imagen' name='imagen' />
                            <div className='d-flex justify-content-sm-end'><Button type="submit" className="btn btn-success font-weight-bold text-uppercase" onClick={() => {
                                mutation.mutate(addpost)
                            }}>Publicar</Button></div>
                        </Form.Group>
                    </Form>
                    <Fade in={alert} >
                        <Alert show={alert} className='position-absolute bottom-0 end-0 w-auto' variant='danger' onClose={() => setAlert(false)} dismissible >
                            {alertText}
                        </Alert>
                    </Fade>
                </Card.Body>
            </Card>

            <br></br>

            {query.data?.map((todo: Posts) => (

                <Card className='shadow-sm' key={todo.id}>
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
                    <Card.Body>{todo.titulo}
                        <div className='d-flex align-items-center justify-content-center'><img onError={event => event.currentTarget.style.display = 'none'} className='img-fluid' src={logo} /> </div>
                        <div className='pt-4 d-flex justify-content-sm-end'><Button type="submit" className="btn btn-success font-weight-bold text-uppercase">Aceptar Propuesta</Button></div>
                    </Card.Body>
                    <Card.Footer>
                        <Row className='d-flex align-items-center justify-content-center'>
                            <Col md={1} sm={2}>
                                <img onClick={changeName} className='img rounded' style={{ height: 40, cursor: 'pointer' }} src={name} />
                            </Col>
                            <Col>
                                <Form id='coment'>
                                    <Form.Control className='w-100' placeholder='Comentario...'></Form.Control>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>

            ))}



        </div>
    </>)
}


import { Container, Row, Nav, Navbar, Col, Card, Form, Button, Fade } from 'react-bootstrap';
import user from '../assets/user.png';
import logo from '../assets/logo 1.png';
import g from '../assets/me-gusta.png';
import n from '../assets/no me gusta.png';
import '../Styles/Feed.css';
import uuid from 'react-uuid';
import { BaseSyntheticEvent, useState } from 'react';
import { subirPost } from "../Services/Posts"
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/esm/Alert';

export default function Feed() {

    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [name, setName] = useState(n);
    const [post, setPost] = useState({
        id: '',
        titulo: '',
        imagen: '',
        dueñoId: '',
        dueño: '',
        fecha: '',
        comentario: '',
    })

    const onChangeInput = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target
        setPost({ ...post, [name]: value })
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
        let response: boolean | string = await subirPost(post);
        if (response !== true) {
            setAlertText(response.toString());
            setAlert(true);
        }
    }

    return (<>
        <div><h2 className='font-weight-bold text-uppercase h2'>Publicaciones</h2></div>
        <div className='p-4 w-75 mb-5'>

            <Card className='shadow-sm mh-25'>
                <Card.Body>
                    <Form>
                        <Form.Group className='pb-2'>
                            <Form.Control onChange={onChangeInput} placeholder='Crear publicacion' name='titulo' as="textarea" rows={3} />
                            <Fade in={alert} >
                                <Alert show={alert} className='position-absolute bottom-0 end-0 w-auto' variant='danger' onClose={() => setAlert(false)} dismissible >
                                    {alertText}
                                </Alert>
                            </Fade>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control className='w-50' type='file' placeholder='Subir imagen' name='imagen' />
                            <div className='d-flex justify-content-sm-end'><Button type="submit" className="btn btn-success font-weight-bold text-uppercase">Publicar</Button></div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <br></br>
            <Card className='shadow-sm'>
                <Card.Header>
                    <Row>
                        <Col><img className='rounded' style={{ height: 40, cursor: 'pointer' }} src={user} />
                            <span> Wilker</span>
                        </Col>
                        <Col className='mt-2 text-reset fst-italic text-end'>
                            <span style={{ color: "#055C9D" }}>21/2/2023</span>
                        </Col>
                    </Row>

                </Card.Header>
                <Card.Body>Titulo de Publicacion
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
        </div>
    </>)
}
import { Container, Row, Nav, Navbar, Col, Card, Form, Button } from 'react-bootstrap';
import user from '../assets/user.png';
import logo from '../assets/logo 1.png';
import g from '../assets/me-gusta.png';
import n from '../assets/no me gusta.png';
import '../Styles/Feed.css';
import { useState } from 'react';

export default function Feed() {

    const [name, setName] = useState(n);

    const changeName = () => {
        let value = name;

        if (value === n) {
            setName(g);
        } else {
            setName(n);
        }
    };

    return (<>
        <div><h2 className='font-weight-bold text-uppercase h2'>Publicaciones</h2></div>
        
            <div className='p-4 w-75 mh-50 mb-5'>
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
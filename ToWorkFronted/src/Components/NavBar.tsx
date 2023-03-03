import { useState } from "react";
import { Col, Form, Nav, Navbar, Row } from "react-bootstrap";
import chatW from '../assets/chatW.png';
import profileB from '../assets/profileB.png';
import profileW from '../assets/profileW.png';
import chatB from '../assets/chatB.png';
import frog from '../assets/frog.png';

export function NavBar() {
    const [name, setName] = useState(chatW);
    const [name2, setName2] = useState(profileW);

    const changeName = () => {
        let value = name;

        if (value === chatW) {
            setName(chatB);
        } else {
            setName(chatW);
        }

    };

    const changeName2 = () => {
        let value2 = name2;

        if (value2 === profileW) {
            setName2(profileB);
        } else {
            setName2(profileW);
        }

    };
    return (
        <div className='p-5 fluid' >
            <Navbar className='shadow ' fixed="top" bg="dark" variant="dark">
                <Row id='icons' fluid className='text-white w-100'>
                    <Col className='col-sm'>
                        <Nav.Link className='p-2' href="/"><img src={frog} style={{ height: 50, cursor: 'pointer' }} /></Nav.Link>
                    </Col>

                    <Col className='col-sm pt-3'>
                        <Form id='menuForm'>
                            <Form.Control className='bg-dark text-white' placeholder='Buscar' style={{ width: '30vh' }}></Form.Control>
                        </Form>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center text-center'>
                        <Col id='col' onMouseLeave={changeName} onMouseEnter={changeName} >
                            <Nav.Link href="/chat" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="26" height="40" className=" ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>
                                <p>Mensajes</p></Nav.Link>
                        </Col>
                        <Col id='col' onMouseLeave={changeName2} onMouseEnter={changeName2} className="col-sm">
                            <Nav.Link href="/perfil" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}><img className='p-1' src={name2} style={{ height: 40 }} /><p>Perfil</p></Nav.Link>
                        </Col>
                        <Col className="col-sm">
                            <Nav.Link href="" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width="40" height="40" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </Nav.Link>
                        </Col>
                    </Col>
                </Row>
            </Navbar>
        </div>

    )
}

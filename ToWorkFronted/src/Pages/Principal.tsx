import frog from '../assets/frog.png';
import user from '../assets/user.png';
import profileW from '../assets/profileW.png';
import chatW from '../assets/chatW.png';
import profileB from '../assets/profileB.png';
import chatB from '../assets/chatB.png';
import Feed from "../Components/Feed";
import '../Styles/Principal.css';
import { Container, Row, Nav, Navbar, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import Chat from '../Components/Chat';

export function Principal() {
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

  return (<>
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
              <Nav.Link href="/chat" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}><img className='p-1' src={name} style={{ height: 40 }} />
                <p>Mensajes</p></Nav.Link>
            </Col>
            <Col id='col' onMouseLeave={changeName2} onMouseEnter={changeName2} className="col-sm">
              <Nav.Link href="/perfil" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}><img className='p-1' src={name2} style={{ height: 40 }} /><p>Perfil</p></Nav.Link>
            </Col>
            <Col className="col-sm">
              <Nav.Link href="" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}><img src={user} style={{ height: 40, cursor: 'pointer' }} /></Nav.Link>
            </Col>
          </Col>
        </Row>
      </Navbar>
    </div>
    <br></br>

    <Container className='pt-5'>
      <div>
        <Chat/>
      </div>
      <Feed />
    </Container>
  </>)
}
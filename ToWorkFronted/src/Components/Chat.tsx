import { useState } from 'react';
import {  Col, Card,  ListGroup } from 'react-bootstrap';
import user from '../assets/user.png';
import '../Styles/Feed.css';

export default function Chat() {
    const [chat, setChat] = useState(true);
    
    const changeState = () => {
    setChat(!chat)
    }
    
    return (chat) ? (

        <Col className='position-fixed bottom-0 rounded end-0 w-25 h-75' style={{ backgroundColor: "#fff" }}>
            <Card id='chat' className='rounded border-1 h-100 w-100' style={{ backgroundColor: "#fff" }}>
                <Card.Header onClick={changeState} style={{ cursor: 'pointer' }}>
                    <img src={user} style={{ height: 40 }} />
                    <a>Wilker</a>
                </Card.Header>
            </Card>
        </Col>
    ) :
        <Col className='position-fixed bottom-0 rounded end-0 w-25' style={{ backgroundColor: "#fff" }}>
            <Card id='chat' className='rounded border-1 h-100 w-100' style={{ backgroundColor: "#fff" }}>
                <Card.Header onClick={changeState} style={{ cursor: 'pointer' }}>
                    <img src={user} style={{ height: 40 }} />
                    <a>Wilker</a>
                </Card.Header>
            </Card>
        </Col>
}

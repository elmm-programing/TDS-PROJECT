import { useEffect, useState } from 'react';
import {  Col, Card,  ListGroup } from 'react-bootstrap';
import user from '../assets/user.png';
import '../Styles/Feed.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../Utils/QueryClient';
import { getUserChats } from '../Services/Chat';
import { useLocation } from 'react-router-dom';
import {Chat as Chats } from '../Types/common'
import ListOfChats from './ListOfChats';

export default function Chat() {
const location = useLocation();
const routerData = location.state;
    const [showChat, setShowChat] = useState(true);
    const [showListAndChat, setshowListAndChat] = useState(false);
    const { isLoading, error, data, isFetching } = useQuery({ queryKey: ['todos'], queryFn: ()=>getUserChats(routerData.user) })

    const changeState = () => {
    setShowChat(!showChat)
    }
    const switchListAndChat = ()=>{
    setshowListAndChat(!showListAndChat)
    }
    
    return (showChat) ? (

        <Col className='position-fixed bottom-0 rounded end-0 w-25 h-75' style={{ backgroundColor: "#fff" }}>
            <Card id='chat' className='rounded border-1 h-100 w-100' style={{ backgroundColor: "#fff" }}>
                <Card.Header onClick={changeState} style={{ cursor: 'pointer' }}>
                    <img src={user} style={{ height: 40 }} />
                    <a>{routerData.user}</a>
                </Card.Header>
                {if(data != undefined & showListAndChat ==true){
 <ListOfChats data={data} userName={routerData.user}/>
}else{
<h1>HiChat</h1>
} }
                

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



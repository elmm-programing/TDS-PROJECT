import '../Styles/Principal.css';
import Chat from '../Components/Chat';
import { NavBar } from '../Components/NavBar';
import PostColumn from "../Components/PostColumn";
import { useEffect } from 'react';
import { getPrueba } from '../Services/Users';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export function Principal() {
const location = useLocation();
const data = location.state;
console.log(data.user);
const getPruebaPrint = async()=> {
console.log( await getPrueba())
  
}
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/api/live/ws');

    websocket.onopen = () => {
      console.log('connected');
    }
    websocket.onerror = ()=>{
      console.log('Error in conection to socket');
    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
    }
      }, [])

  return (<>
    <NavBar username={data.user} />
    <div className='pt-5'>
    <Button onClick={getPruebaPrint}>Hello</Button>
      <Chat />
      <PostColumn />
    </div>
  </>)
}

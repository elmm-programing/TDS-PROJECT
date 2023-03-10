import '../Styles/Principal.css';
import Chat from '../Components/Chat';
import { NavBar } from '../Components/NavBar';
import PostColumn from "../Components/PostColumn";
import { useEffect } from 'react';

export function Principal() {
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
    <NavBar />
    <div className='pt-5'>
      <Chat />
      <PostColumn />
    </div>
  </>)
}

import '../Styles/Principal.css';
import ChatModal from '../Components/ChatModal';
import { NavBar } from '../Components/NavBar';
import PostColumn from "../Components/PostColumn";
import { getPrueba } from '../Services/Users';
import { Button } from 'react-bootstrap';
import { getUserName } from '../Utils/GetCookies';

export function Principal() {
  const userName = getUserName()
  const getPruebaPrint = async () => {
    console.log(await getPrueba())

  }
  // useEffect(() => {
  //   const websocket = new WebSocket('ws://localhost:8080/api/live/ws');
  //
  //   websocket.onopen = () => {
  //     console.log('connected');
  //   }
  //   websocket.onerror = ()=>{
  //     console.log('Error in conection to socket');
  //   }
  //
  //   websocket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log(data)
  //   }
  //     }, [])

  return (<>
    <NavBar username={userName} />
    <div className='pt-5'>
      <ChatModal />
      <PostColumn />
    </div>
  </>)
}

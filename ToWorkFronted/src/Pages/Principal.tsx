import '../Styles/Principal.css';
import Chat from '../Components/Chat';
import { NavBar } from '../Components/NavBar';
import PostColumn from "../Components/PostColumn";

export function Principal() {


  return (<>
    <NavBar />
    <div className='pt-5'>
      <Chat />
      <PostColumn />
    </div>
  </>)
}

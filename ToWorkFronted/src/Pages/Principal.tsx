import '../Styles/Principal.css';
import ChatModal from '../Components/ChatModal';
import { NavBar } from '../Components/NavBar';
import PostColumn from "../Components/PostColumn";

export function Principal() {

  return (<>
    <NavBar />
    <div className='pt-5'>
      <ChatModal />
      <PostColumn />
    </div>
  </>)
}

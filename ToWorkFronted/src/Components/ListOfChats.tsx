import { Card, Col } from "react-bootstrap";
import user from '../assets/user.png';

import {Chat as Chats } from '../Types/common'
export default function ListOfChats(props:{data:Chats[],userName:string}) {

    return (
                    <ul className="list-unstyled mb-0">
            { props.data?.map((todo: Chats) => {
            let filter =todo.members?.filter((user) => user != props.userName) 
            if (filter[0]) {
                return (
              <li className="p-2 border-bottom"  >
                <a  className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">{filter[0]}</p>
                      <p className="small text-muted">
                      {todo.messages[todo.messages.length-1].body}</p> </div> </div> <div className="pt-1"> <p className="small text-muted mb-1">Just now</p>
                    <span className="badge bg-danger float-end">1</span>
                  </div>
                </a>
              </li>                                    
                );
            }
                
            }) }
              </ul>
        )
}



import { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import user from '../assets/user.png';
import '../Styles/Feed.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserChats } from '../Services/Chat';
import { getUserName } from '../Utils/GetCookies';
import { IChat } from '../Types/common';
import Chat from './Chat';
import ListOfContacts from './ListOfContacts';
import { queryClient } from '../Utils/QueryClient';
import { postMessage } from "../Services/Chat"

export default function ChatModal() {
	const userName = getUserName()
	const [showChat, setShowChat] = useState(true);
	const [showListOrSendMessage, setShowListOrSendMessage] = useState(false);
	const [selectedChat, setSelectedChat] = useState<IChat>({
		id: "",
		members: [],
		messages: []
	});
	let { status, data, error, isFetching } = useQuery({ queryKey: ['userChats'], queryFn: () => getUserChats(userName) })
const mutation = useMutation({
        mutationFn: postMessage,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['userChats'] })
        },
    })

	const changeState = () => {
		setShowChat(!showChat)
	}
	useEffect(() => {
	console.log(selectedChat)
  }, [selectedChat]);

	if (data) {
		data = data?.map(value => {
			let x = value.members.filter((name: string) => name != userName)
			value.members = x.flat()
			return value
		}).filter(val => val.members[0] != undefined)
	}
	return (showChat) ? (

		<Col className='position-fixed bottom-0 rounded end-0 w-25 h-75' style={{ backgroundColor: "#fff" }}>
			<Card id='chat' className='rounded border-1 h-100 w-100' style={{ backgroundColor: "#fff" }}>
				<Card.Header onClick={changeState} style={{ cursor: 'pointer' }}>
					<img src={user} style={{ height: 40 }} />
					<a>{userName}</a>
				</Card.Header>
				{showListOrSendMessage === true ? (
					<Chat
						changeToList={setShowListOrSendMessage}
						data={selectedChat}
mutation={mutation}
					/>
				) : (
					<ListOfContacts changeToChat={setShowListOrSendMessage} data={data} setSelected={setSelectedChat} />
				)}
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



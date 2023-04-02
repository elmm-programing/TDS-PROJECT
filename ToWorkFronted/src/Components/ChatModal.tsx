import { useEffect, useRef, useState } from 'react';
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
import useWebSocket from 'react-use-websocket';

export default function ChatModal() {
	const userName = getUserName()
	const [showChat, setShowChat] = useState(true);
	const [showListOrSendMessage, setShowListOrSendMessage] = useState(false);
	const [selectedChat, setSelectedChat] = useState<IChat>({
		id: "",
		members: [],
		messages: []
	});
	const inputElement = useRef(null);
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
		console.log(data)
		let newSelected = data?.filter(val => val.id = selectedChat.id) ? data?.filter(val => val.id = selectedChat.id) : [selectedChat];
		if (newSelected[0]) {
			setSelectedChat(newSelected[0])
		}
	}, [data]);

	const {
		sendMessage,
	} = useWebSocket('ws://localhost:8080/api/live/ws', {
		onOpen: () => console.log('opened'),
		onMessage: (event) => {
			if (event.data == getUserName()) {

				queryClient.invalidateQueries({ queryKey: ['userChats'] })

			}
			console.log(event.data)
			console.log(event.data == getUserName())
		},
		shouldReconnect: (closeEvent) => true,
	});


	// if (data) {
	// 	data = data?.map(value => {
	// 		let x = value.members.filter((name: string) => name != userName)
	// 		value.members = x.flat()
	// 		return value
	// 	}).filter(val => val.members[0] != undefined)
	// }
	return (showChat) ? (

		<Col className='position-fixed bottom-0 rounded end-0 w-25 h-75' style={{ backgroundColor: "#fff" }}>
			<Card id='chat' className='rounded border-1 h-100 w-100' style={{ backgroundColor: "#fff" }}>
				<Card.Header style={{ cursor: 'pointer' }}>
					{showListOrSendMessage == true ? (<>
						<svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowListOrSendMessage(!showListOrSendMessage) }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width={30 + "px"} height={30 + "px"}>
							<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
						</svg>


					</>) : (<></>)}


					<img onClick={changeState} src={user} style={{ height: 40 }} />
					<a onClick={changeState}>{userName}</a>
				</Card.Header>
				{showListOrSendMessage === true ? (
					<Chat
						changeToList={setShowListOrSendMessage}
						data={selectedChat}
						mutation={mutation}
						sendMessage={sendMessage}
						ref={inputElement}
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



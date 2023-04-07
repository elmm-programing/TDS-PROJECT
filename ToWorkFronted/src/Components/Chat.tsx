import {  UseMutationResult } from "@tanstack/react-query";
import {  useEffect, useRef, useState } from "react"
import { IChat } from "../Types/common"
import { SendMessage } from "react-use-websocket/dist/lib/types";
import { useUserStore } from "../store/UsersStore";
import { useChatStore } from "../store/ChatsStore";

export default function Chat(props: { changeToList: React.Dispatch<React.SetStateAction<boolean>>, sendMessage: SendMessage,mutation: UseMutationResult<String, unknown, IChat, unknown> }) {

  const state = useUserStore()
	const chatState = useChatStore()
	const OnChangeInput = useRef(null);

	const SendMessage = () => {
		chatState.selectedChat.messages.push({
			from: state.user.username,
			body: OnChangeInput.current?.value
		})
		let members = chatState.selectedChat.members
		members = members.filter(val => val != state.user.username)
		props.sendMessage(members[0])
		console.log(chatState.selectedChat)
	}




	return (
		<div className="d-flex align-items-end flex-column bd-highlight mb-3 h-100" >
			<div className="position-relative" style={{ height: 80 + '%', width: 100 + '%' }}>
				<div className="chat-messages  " style={{ height: 100 + '%', width: 100 + '%' }}>

					{chatState.selectedChat.messages.map(val => {

						val.from
						if (val.from == state.user.username) {
							return (
								<div className="chat-message-right pb-4" >
									<div>
										<img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
										<div className="text-muted small text-nowrap mt-2">2:33 am</div>
									</div>
									<div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
										<div className="font-weight-bold mb-1">{val.from}</div>
										{val.body}

									</div>
								</div>

							)

						} else {
							return (
								<div className="chat-message-left pb-4">
									<div>
										<img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
										<div className="text-muted small text-nowrap mt-2">2:34 am</div>
									</div>
									<div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
										<div className="font-weight-bold mb-1">{val.from}</div>
										{val.body}
									</div>
								</div>

							)

						}

					})}


				</div>
			</div>
			<div className="flex-grow-0 py-3 px-4 border-top">
				<div className="input-group">
					<input type="text" ref={OnChangeInput} className="form-control" placeholder="Type your message" />
					<button className="btn btn-primary" onClick={() => {
						SendMessage()
						props.mutation.mutate(chatState.selectedChat)
					}} >Send</button>
				</div>
			</div>
		</div>

	)
}

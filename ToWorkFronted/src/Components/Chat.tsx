import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { BaseSyntheticEvent, useRef, useState } from "react"
import { IChat } from "../Types/common"
import { getUserName } from "../Utils/GetCookies"
import { queryClient } from "../Utils/QueryClient";
import { postMessage } from "../Services/Chat"

export default function Chat(props: { changeToList: React.Dispatch<React.SetStateAction<boolean>>, data: IChat, mutation: UseMutationResult<String, unknown, IChat, unknown> }) {
	const [newMessage, setNewMessage] = useState<IChat>(props.data)

	const OnChangeInput = useRef(null);

	const SendMessage = () => {
		newMessage?.messages.push({
			from: getUserName(),
			body: OnChangeInput.current?.value
		})
		console.log(newMessage)
	}




	return (
		<div className="d-flex align-items-end flex-column bd-highlight mb-3 h-100" >
			<div className="position-relative" style={{ height: 80 + '%' , width: 100 + '%'}}>
				<div className="chat-messages  " style={{ height: 100 + '%', width: 100 + '%'}}>

					{props.data.messages.map(val => {

						val.from
						if (val.from == getUserName()) {
							return (
								<div className="chat-message-right pb-4" key={val.body}>
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
								<div className="chat-message-left pb-4" key={val.body}>
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
						props.mutation.mutate(newMessage)
					}} >Send</button>
				</div>
			</div>
		</div>

	)
}

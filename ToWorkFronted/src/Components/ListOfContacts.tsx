import { IChat } from "../Types/common";
import { getUserName } from "../Utils/GetCookies";

export default function ListOfContacts(props: { data: IChat[] | undefined, changeToChat: React.Dispatch<React.SetStateAction<boolean>>, setSelected: React.Dispatch<React.SetStateAction<IChat>> }) {

	const getChatName = (members: string[]) => {

		return members.filter((name: string) => name != getUserName()).filter(val => val != undefined)
	}
	return (
		<ul className="list-unstyled mb-0">
			{props.data?.map((todo: IChat) => {
				return (
					<li className="p-2 border-bottom" key={todo.id}    >
						<a className="d-flex justify-content-between"
							onClick={() => { props.changeToChat(true); props.setSelected(todo) }}>
							<div className="d-flex flex-row">
								<img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar"
									className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
								<div className="pt-1">
									<p className="fw-bold mb-0">{todo.members.length <= 1 ? todo.members[0] : getChatName(todo.members)
									}</p>
									<p className="small text-muted">
										{todo.messages[todo.messages.length - 1].body}</p> </div> </div> <div className="pt-1"> <p className="small text-muted mb-1">Just now</p>
								<span className="badge bg-danger float-end">1</span>
							</div>
						</a>
					</li>
				);
			}

			)}

		</ul >

	)
}

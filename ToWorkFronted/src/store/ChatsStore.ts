import { create } from 'zustand'
import { getUserChats } from '../Services/Chat'
import { CChat } from '../Types/Chat'
import { IChat } from '../Types/common'
import { useUserStore } from './UsersStore'
interface ChatState {
  selectedChat: IChat
  userChats: IChat[]
  setSelectedChat: (chat: CChat) => void
setUserChats: (chat: CChat[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  selectedChat: new CChat,
  userChats: [],
  setSelectedChat: (chat: CChat) => set(() => {
    return { selectedChat: chat }
  }),
setUserChats: (chat: CChat[]) => set((state) => {
  if (state.selectedChat.id === '') {
    
    return { userChats: chat }
  }else{
let index =chat.findIndex((element)=>{
				return element.id === state.selectedChat.id
						})
				state.selectedChat = chat[index]

    return { userChats: chat }
  }
  }),
  

}))

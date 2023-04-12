import { create } from 'zustand'
import { IUser } from '../Types/common'
import { CUser } from '../Types/User'
import { RestApiClient } from '../Utils/RestApiClient'

interface UserState {
  user: IUser
  selectedPerfil: IUser
  setUserName: (userName: string) => void
  setUser: (newUser: IUser) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: new CUser,
  selectedPerfil:new CUser,
  setUserName: (userName: string) => set((state) => {
    let sUser = state.user
    sUser.username = userName
    return { user: sUser }
  }),
  setUser: (newUser: IUser) => set(() => {
    return { user: newUser }
  }),
  // fetchUser: async (pond) => {
  //     const response = await RestApiClient("")
  //     set({ user: await response.json() })
  //   },


}))

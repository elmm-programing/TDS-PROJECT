import { create } from 'zustand'
import { CPost } from '../Types/CPost'
import { IPost } from '../Types/common'
interface PostState {
	newPost: IPost
	allPosts: IPost[]
	setNewPost: (chat: CPost) => void
	setAllPosts: (chat: CPost[]) => void
}

export const usePostStore = create<PostState>((set) => ({
	newPost: new CPost,
	allPosts: [],
	setNewPost: (post: CPost) => set(() => {
		return { newPost: post }
	}),
	setAllPosts: (chat: CPost[]) => set(() => {
		return { allPosts: chat }
	}),


}))

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getPosts, subirPost } from '../Services/Posts';
import { usePostStore } from '../store/PostsStore';
import '../Styles/Feed.css';
import { queryClient } from '../Utils/QueryClient';
import FormAddPost from './FormAddPost';
import ListPosts from './ListPosts';

export default function PostColumn() {
    const postStore = usePostStore()

    const { data } = useQuery(["listPosts"], () => getPosts());
    const mutation = useMutation({
        mutationFn: subirPost,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['listPosts'] })
        },
    })
    useEffect(() => {
        if (data !== undefined) {
            postStore.setAllPosts(data)
        }
    }, [data]);

    return (<>
        <h2 className='font-weight-bold text-uppercase h2 mx-4'>Publicaciones</h2>
        <div className='p-4 w-75 mb-5'>
            <FormAddPost mutation={mutation} />
            <ListPosts />
        </div>
    </>)
}


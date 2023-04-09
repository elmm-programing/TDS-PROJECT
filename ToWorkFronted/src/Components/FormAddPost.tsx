import { UseMutationResult } from '@tanstack/react-query';
import { BaseSyntheticEvent, useState } from 'react';
import { Alert, Button, Card, Fade, Form } from 'react-bootstrap';
import { usePostStore } from '../store/PostsStore';
import { useUserStore } from '../store/UsersStore';
import { IPost } from '../Types/common';

export default function FormAddPost(props: { mutation: UseMutationResult<any, unknown, IPost, unknown> }) {
  const postStore = usePostStore()
  const userStore = useUserStore()
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const onChangeInputPost = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    postStore.setNewPost({ ...postStore.newPost, [name]: value })
  }

  const handleFile = async (e: BaseSyntheticEvent) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => { postStore.setNewPost({ ...postStore.newPost, file: reader.result, fileName: file.name }) }
  }

  const onSubmit = () => {
    postStore.setNewPost({ ...postStore.newPost, perfil: 'imagen', dueño: userStore.user.username, dueñoId: userStore.user.username });
    props.mutation.mutate(postStore.newPost);
    postStore.allPosts.push(postStore.newPost)
  }

  return (<>
    <Card className='shadow-sm mh-25'>
      <Card.Body>
        <Form >
          <Form.Group className='pb-2'>
            <div className='pb-2'><Form.Control onChange={onChangeInputPost} placeholder='Titulo' name='titulo' /></div>
            <Form.Control onChange={onChangeInputPost} placeholder='Comentario' name='comentario' as="textarea" rows={3} />
          </Form.Group>
          <Form.Group>
            <Form.Control className='w-50' onChange={(event) => { handleFile(event) }} type='file' placeholder='Subir imagen' name='imagen' />
            <div className='d-flex justify-content-sm-end'>
              <Button type='button' className="btn btn-success font-weight-bold text-uppercase" onClick={() => {
                onSubmit()
              }}  >Publicar</Button></div>
          </Form.Group>
        </Form>
        <Fade in={alert} >
          <Alert show={alert} className='position-absolute bottom-0 end-0 w-auto' variant='danger' onClose={() => setAlert(false)} dismissible >
            {alertText}
          </Alert>
        </Fade>
      </Card.Body>
    </Card>
  </>)
}


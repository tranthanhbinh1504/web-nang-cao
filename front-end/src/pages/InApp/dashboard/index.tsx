import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import './style.scss'
import { useForm } from 'react-hook-form'
import {Button, Popover, TextareaAutosize } from '@mui/material'
import { Modal } from 'react-bootstrap'
import AddPost from 'src/components/uploadpost'
import Post from 'src/components/post'
import ResponsiveDrawer from 'src/components/sidebar'
import CommentSection from 'src/components/commentSection'
import Notification from 'src/components/notification'
import { getPostList } from 'src/api/dashboard'
import { getCommentOfPost } from 'src/api/comment'

const drawerWidth = 240

const fakeCmt = [
  {
    avaUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    name: 'Thanh Binh',
    content: 'Nequcqqcqcr sit'
  },
  {
    avaUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    name: 'Thu Nguyen',
    content: 'Neque pvavavavm ipsum quia dolor sit'
  },
]

const PostData = [
  {
    name: 'Tran Thanh Binh',
    date: 'Dec 23, 2020',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim tristique metus, a varius metus.',
    avaImgUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    contentImgUrl: 'https://i.ibb.co/3sWBHGQ/konosuba-unleash-crying-aqua.jpg',
    numLike: 0,
    numCmt: 6
  }
]

enum ModalActionPost {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}
enum ModalActionComment {
  DELETECOMMENT = 'DELETECOMMENT',
}
interface AddUserModal {
  fullname: string
  email: string
  department: string,
  postcomment: string,
  editcomment:string
}

const DashBoard = () => {
  const [data, setData] = useState(PostData)
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')
  const [postValue,setPostValue] = useState<string[]>([])
  const [commentValue,setCommentValue] = useState<string[]>([])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddUserModal>()

  useEffect(() => {
    getCommentData('61da594762f926b4cad147a4')
    console.log('commentValue')
    console.log(commentValue)
  }, [])

  const getPostData = () => {
    getPostList().then((data) => {
      setPostValue(data)
    })
  }

  const getCommentData = (postId: any) => {
    getCommentOfPost(postId).then((data) => {
      setCommentValue(data)
    })
  }


  const onSubmit = (data: AddUserModal) =>{
    console.log(data)
  }

  const closeModal = () => {
    setModal(false)
  }

  const modalHeader = () => {
    return (
      <Modal.Title className='form_header'>
        {action === ModalActionPost.ADD && <div>Tạo bài viết</div>}
        {action === ModalActionPost.EDIT && <div>Chỉnh sửa bài viết</div>}
        {action === ModalActionPost.DELETE && <div>Xoá bài viết</div>}
        {action === ModalActionComment.DELETECOMMENT && <div>Xoá bình luận </div>}
      </Modal.Title>
    )
  }

  const modalBody = () => {
    return (
      <Modal.Body>
        {
          (action === ModalActionPost.ADD || action === ModalActionPost.EDIT) &&
          <>
            <div className="socail-post-row">
              <div className="user-profile">
                <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
                <div>
                  <p>Tấn Tài</p>
                  <span>25/12/2021</span>
                </div>
              </div>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Tài ơi bạn đang nghĩ gì thế"
                minRows={7}
                className='textarea-post'
              />
              <div className='form_btn'>
                <Button
                  type="submit"
                  size='medium'
                  variant="contained"
                  onClick={closeModal}
                  sx={{ marginTop: 2, paddingX: 10, paddingY: 1 }}
                >
                  Save
                </Button>
              </div>
            </Box>
          </>
        }
        { action === ModalActionPost.DELETE &&
          <>
            <div>Bạn có chắc chắn muốn xóa dữ liệu</div>
            <div className='form_btn'>
              <Button
                className='form_btnAction'
                type='submit'
                color='success'
                size='medium'
                variant='contained'
                onClick={closeModal}
                sx={{ marginTop: 2, paddingX: 5, paddingY: 1, marginRight: 2 }}
              >
                Cancle
              </Button>
              <Button
                className='form_btnAction'
                type='submit'
                color='error'
                size='medium'
                variant='contained'
                onClick={closeModal}
                sx={{ marginTop: 2, paddingX: 5, paddingY: 1,  marginLeft: 2 }}
              >
                Delete
              </Button>
            </div>
          </>
        }
        { action === ModalActionComment.DELETECOMMENT &&
          <>
            <div>Bạn có chắc chắn muốn xóa dữ liệu</div>
            <div className='form_btn'>
              <Button
                className='form_btnAction'
                type='submit'
                color='success'
                size='medium'
                variant='contained'
                onClick={closeModal}
                sx={{ marginTop: 2, paddingX: 5, paddingY: 1, marginRight: 2 }}
              >
                Cancle
              </Button>
              <Button
                className='form_btnAction'
                type='submit'
                color='error'
                size='medium'
                variant='contained'
                onClick={closeModal}
                sx={{ marginTop: 2, paddingX: 5, paddingY: 1,  marginLeft: 2 }}
              >
                Delete
              </Button>
            </div>
          </>
        }
      </Modal.Body>
    )
  }

  const actionPost = (value: any) => {
    let newPost = [...data]
    newPost.push(value)
    setData(newPost)
  }

  return (
    <div className="dashboard">
      <ResponsiveDrawer childComponent={
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            <Box  sx={{
              maxWidth: 700,
            }}>
              <AddPost
                onActionPost={actionPost}
              />
              { data && data.map((item, index) =>
                (
                  <div style={{padding: '16px 0'}} key={index}>
                    <Post
                      name={item.name}
                      date={item.date}
                      content={item.content}
                      avaImgUrl={item.avaImgUrl}
                      contentImgUrl={item.contentImgUrl}
                      numLike={item.numLike}
                      numCmt={item.numCmt}
                      childComment={
                        <CommentSection
                          avaUser='https://cdn-icons-png.flaticon.com/512/147/147144.png'
                          listComments={commentValue}
                        />}
                    />
                  </div>
                )
              )}
            </Box>
            <Box sx={{paddingLeft: 4}}>
              <Notification />
            </Box>
          </Box>
        </>
      }/>
      <Modal
        show={modal}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        { modalHeader() }
        { modalBody() }
      </Modal>
    </div>
  )
}
export default DashBoard

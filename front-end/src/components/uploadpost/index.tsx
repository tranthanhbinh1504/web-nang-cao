import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import Avatar from '@mui/material/Avatar'
import {IconButton, Popover, SxProps, TextareaAutosize, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import { Modal } from 'react-bootstrap'
import Box from '@mui/material/Box'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useForm } from 'react-hook-form'
import './style.scss'

enum ModalActionPost {
  ADD = 'ADD',
}

type Props = {
  onActionPost: (value: any) => void
}

const AddPost:React.FC<Props> = ({
  onActionPost
}) => {
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')
  const [image, setImage] = useState('')
  const { register, handleSubmit,setValue, formState: { errors } } = useForm()

  const onSubmit = (data:any) =>{
    onActionPost({
      name: 'Tran Thanh Binh',
      date: 'Dec 23, 2020',
      content: data.post,
      avaImgUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
      contentImgUrl: 'https://i.ibb.co/3sWBHGQ/konosuba-unleash-crying-aqua.jpg',
      numLike: 0,
      numCmt: 0
    })
    closeModal()
  }

  const loadImage = (evt: any) => {
    if (evt.target.files.length > 0) {
      setImage(URL.createObjectURL(evt.target.files[0]))
    }
  }

  const openModal = (action: string) => {
    setModal(true)
    setAction(action)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <div className="post-container cus-border">
      <div className="user-profile">
        <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
        <div className="postmodal"  onClick={() => openModal(ModalActionPost.ADD)}>
          <p>What is on your mind , show it?</p>
        </div>
      </div>
      <div className="input-container">
        <div className="add-post-links">
          <a href="" onClick={() => openModal(ModalActionPost.ADD)}>
            <AddPhotoAlternateIcon className='post-links-icon'/>Add photo/video
          </a>
          <a href="">
            <OndemandVideoIcon className='post-links-icon'/>Live Video
          </a>
        </div>
      </div>
      <Modal
        show={modal}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Title className='form_header'>
          {action === ModalActionPost.ADD && <div>Tạo bài viết</div>}
        </Modal.Title>
        <Modal.Body style={{overflow: 'auto'}}>
          {
            (action === ModalActionPost.ADD &&
          <>
            <div className="socail-post-row">
              <div className="user-profile">
                <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
                <div>
                  <p>Tấn Tài</p>
                </div>
              </div>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className='modalBody'
            >
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="What's on your mind"
                minRows={2}
                className='textarea-post'
                {...register('post')}
              />
              {image &&
                <img src={image} alt="img" className="imageUpload" />
              }
              <div className='file-upload'>
                <p>Thêm vào bài viết</p>
                <input accept="image/*" id="icon-button-file" type="file" onChange={(evt) => loadImage(evt)}/>
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <Button
                variant="contained"
                type='submit'
                fullWidth
                className='submitBtn'
              >
                Đăng
              </Button>
            </Box>
          </>
            )
          }
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AddPost

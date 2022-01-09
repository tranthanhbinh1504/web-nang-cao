import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import {Button, Popover,TextareaAutosize,IconButton } from '@mui/material'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faCommentAlt } from '@fortawesome/free-regular-svg-icons'
import Box from '@mui/material/Box'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
enum ModalActionPost {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

interface Props {
  name?: string
  date?: string,
  content?: string,
  avaImgUrl?: string,
  contentImgUrl?: string,
  numLike?: number,
  numCmt?: number,
  childComment?: any,
  onActionLike?: () => void
  onActionCmt?: () => void
}

const Post: React.FC<Props> = (
  {
    name,
    date,
    content,
    avaImgUrl = 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    contentImgUrl,
    numLike = 0,
    numCmt,
    childComment,
    onActionLike,
    onActionCmt
  }) => {
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')
  const [contentdata, setContentdata] = useState(content)
  const { register, handleSubmit,setValue, formState: { errors } } = useForm()
  const onSubmit = (data:any) =>{
    setContentdata(data.post)
    content=data.post
    setModal(false)
  }
  const [image, setImage] = useState<string | undefined>('')
  const [popup, setPopup] = React.useState(null)
  const openPopup = (event:any) => {
    setPopup(event.currentTarget)
  }
  const [like,setLike] = useState(false)
  const openPost = Boolean(popup)
  const idPost = openPost ? 'simple-popover' : undefined

  const loadImage = (evt: any) => {
    if (evt.target.files.length > 0) {
      setImage(URL.createObjectURL(evt.target.files[0]))
    }
  }
  const openModal = (action: string, data?: any) => {
    setModal(true)
    setAction(action)
    setPopup(null)
    if(action === ModalActionPost.EDIT){
      setValue('post',content)
      setImage(contentImgUrl)
    }
  }

  const closeModal = () => {
    setModal(false)
  }

  const modalHeader = () => {
    return (
      <Modal.Title className='form_header'>
        {action === ModalActionPost.EDIT && <div>Chỉnh sửa bài viết</div>}
        {action === ModalActionPost.DELETE && <div>Xoá bài viết</div>}
      </Modal.Title>
    )
  }

  const modalBody = () => {
    return (
      <Modal.Body>
        {
          (action === ModalActionPost.EDIT) &&
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
      </Modal.Body>
    )
  }

  return(
    <div className='root'>

      <div className='avatar'>
        <Avatar src={avaImgUrl}></Avatar>
        <div className='avatar_wrapper'>
          <div className='avatar_title'>{name}</div>
          <div className='avatar_date'>{date}</div>
        </div>
        <div className='avatar_edit'>
          <FontAwesomeIcon icon={faEllipsisV} onClick={openPopup} style={{cursor: 'pointer'}}/>
          <Popover
            id={idPost}
            open={openPost}
            anchorEl={popup}
            onClose={()=>setPopup(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className='avatar_action' onClick={() => openModal(ModalActionPost.EDIT)}>
              <span>Edit</span>
            </div>
            <div className='avatar_action' onClick={() => openModal(ModalActionPost.DELETE)}>
              <span >Delete</span>
            </div>
          </Popover>
        </div>
      </div>

      <div className='content'>
        {contentdata}
      </div>
      { contentImgUrl && <img className='contentImg' src={contentImgUrl} />}

      <div className='reaction'>
        <div className='reaction_action' onClick={() => onActionLike}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            color='black'
          />
          <span className='reaction_num_likes'>{numLike}</span>
        </div>
        <div className='reaction_action' onClick={() => onActionCmt}>
          <span className='reaction_num_cmts'>{numCmt}</span>
          <span>comments</span>
        </div>
      </div>

      <div className='boardReact'>
        <div className='boardReact_wrapper_action' onClick={() => onActionLike}>
          <span>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color='black'
            />
          </span>
          <span className='boardReact_action'>Like</span>
        </div>
        <div className='boardReact_wrapper_action' onClick={() => onActionCmt}>
          <span>
            <FontAwesomeIcon
              icon={faCommentAlt}
              color='black'
            />
          </span>
          <span className='boardReact_action'>Comment</span>
        </div>
      </div>

      <div className='comment'>
        {childComment}
      </div>

      <Modal
        show={modal}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        { modalHeader() }
        { modalBody() }
      </Modal>


    </div>
  )
}
export default Post
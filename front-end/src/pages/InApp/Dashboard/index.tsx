import Notification from '../../../components/Notification/index'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import './style.scss'
import SideBar from 'src/components/Sidebar'
import { useForm } from 'react-hook-form'
import {Button, Popover, TextareaAutosize } from '@mui/material'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import { Modal } from 'react-bootstrap'
import AddPost from 'src/components/AddPost'
import Postdashboard from 'src/components/Postdashboard'
const drawerWidth = 240
const Data = [
  {
    id : '1',
    username: 'abc',
    date:'24/12/2021',
    post :'Loren kahfkafhakfakhfakfafakfhakfhakf',
    img : 'https://cdn.tgdd.vn/Files/2014/12/24/592178/do-phan-giai_800x450.png',
    like: '150',
    comment: [
      {
        userid: '1',
        content: 'abcfafafafaf',
      },
    ]
  },
  {
    id : '2',
    username: 'bcsdaf',
    date:'24/12/2021',
    post :'Loren kahfkafhakfakhfakfafakfhakfhakf',
    img : 'https://cdn.tgdd.vn/Files/2014/12/24/592178/do-phan-giai_800x450.png',
    like: '150',
    comment: [
      {
        userid : '1',
        content :'afafafkaoiaucam;ậopajfajfpafjspajfoajfoff',
      },
      {
        userid : '2',
        content : 'abcà',
      }
    ]
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
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')
  const [department, setDepartment] = React.useState('')
  const { register, handleSubmit,setValue, formState: { errors } } = useForm<AddUserModal>()
  const onSubmit = (data: AddUserModal) =>{
    console.log(data)
  }
  const handleChange = (event:any) => {
    setDepartment(event.target.value)
  }
  const commentEnterSubmit = (e:any) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      console.log(e.target.value)
      e.preventDefault()
    }
  }
  //event popup
  const [popup, setPopup] = React.useState(null)
  const openPopup = (event:any) => {
    setPopup(event.currentTarget)
  }
  const [popupcomment, setPopupComment] = React.useState(null)
  const openPopupComment = (event:any) => {
    setPopupComment(event.currentTarget)
  }
  const openComment = Boolean(popupcomment)
  const idComment = openComment ? 'comment-popover' : undefined

  const openModal = (action: string, data?: any) => {
    setModal(true)
    setAction(action)
    setPopup(null)
    setPopupComment(null)
    // if (data) {
    //   setValue('fullname', data.fullname)
    //   setValue('email', data.email)
    //   setValue('department', data.department)
    // }
  }
  const closeModal = () => {
    setModal(false)
    // setValue('fullname', '')
    // setValue('email', '')
    // setValue('department', '')
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
  const [showAllComment,setshowAllComment] = useState(false)
  const [like,setLike] = useState(false)
  const [editcomment,setEditComment] = useState(false)
  const Editcomment = ( data:any ) => {
    setEditComment(true)
    setValue('editcomment',data.content)
  }
  return (
    <div className="dashboard">
      <SideBar childComponent={
        <>
          <div className="dashboard">
            <Box
              sx={{
                display:'flex',
                justifyItems:'center',
                width:'800px',
                height:'20px',
                margin:'0 auto'
              }}
              className='main-box-dashboard'
            >
              <Box
                sx= {{
                  width:'100%',
                  height:'auto',
                }}
              >
                {/* add post dashboard */}
                <AddPost />

                {Data.map((data,index) => {
                  return (
                    <div className="socail-post-container cus-border" key={index}>
                      {/* Post in dashboard */}
                      <Postdashboard items={data}/>
                      {
                        data.comment.length > 1 ?
                          <>
                            {showAllComment ?
                              <>
                                {data.comment.map((content,indexcomment) => {
                                  return(
                                    <div className="comment" key={indexcomment}>
                                      <div className="parentcomment user-profile">
                                        <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
                                        { editcomment ?
                                          <>
                                            <TextareaAutosize
                                              id="editcomment"
                                              placeholder='Viết bình luận công khai'
                                              minRows={1}
                                              {...register('editcomment')}
                                              onKeyPress={commentEnterSubmit}
                                            />
                                          </>
                                          :
                                          <>
                                            <p>{content.content}</p>
                                          </>
                                        }
                                      </div>
                                      <MoreHorizOutlinedIcon onClick={openPopupComment}/>
                                      <Popover
                                        id={idComment}
                                        open={openComment}
                                        anchorEl={popupcomment}
                                        onClose={()=>setPopupComment(null)}
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'left',
                                        }}
                                        className='postpopup'
                                      >
                                        <div className='postpopup-item'>
                                          <ColorizeOutlinedIcon />
                                          <span onClick={()=>Editcomment(content)}>Chỉnh sửa bình luận</span>
                                        </div>
                                        <div className='postpopup-item'>
                                          <DeleteOutlinedIcon />
                                          <span onClick={() => openModal(ModalActionComment.DELETECOMMENT)}>Xóa bài bình luận</span>
                                        </div>
                                      </Popover>
                                    </div>
                                  )
                                })}
                              </>
                              :
                              <div className="loadmorecomment" onClick={()=>setshowAllComment(true)}>
                                <span>Xem thêm bình luận</span>
                              </div>
                            }
                          </>
                          :
                          <div>
                            {data.comment.map((content,indexcomment) => {
                              return(
                                <div className="comment" key={indexcomment}>
                                  <div className="parentcomment user-profile">
                                    <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
                                    <p>{content.content}</p>
                                  </div>
                                  <MoreHorizOutlinedIcon  onClick={openPopupComment}/>
                                  <Popover
                                    id={idComment}
                                    open={openComment}
                                    anchorEl={popupcomment}
                                    onClose={()=>setPopupComment(null)}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                    className='postpopup'
                                  >
                                    <div className='postpopup-item'>
                                      <ColorizeOutlinedIcon />
                                      <span>Chỉnh sửa bình luận</span>
                                    </div>
                                    <div className='postpopup-item'>
                                      <DeleteOutlinedIcon />
                                      <span onClick={() => openModal(ModalActionComment.DELETECOMMENT)}>Xóa bài bình luận</span>
                                    </div>
                                  </Popover>
                                </div>
                              )
                            })}
                          </div>
                      }
                      <div className="postcomment">
                        <div className="post-comment-parent user-profile">
                          <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
                          <TextareaAutosize
                            id="postcomment"
                            placeholder='Viết bình luận công khai'
                            minRows={1}
                            {...register('postcomment')}
                            onKeyPress={commentEnterSubmit}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Box>
            </Box>
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
        </>
      }/>
    </div>
  )
}
export default DashBoard

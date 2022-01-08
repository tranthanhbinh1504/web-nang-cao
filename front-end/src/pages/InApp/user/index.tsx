import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import  './style.scss'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Pagination from '@mui/material/Pagination'
import ResponsiveDrawer from 'src/components/sidebar'
import {createNewUser, deleteUser, editUser, getListUser} from 'src/api/user'
import {getDepartmentList} from 'src/api/department'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import AlertError from 'src/components/alert'

//schema validate of Add User Modal
interface AddUserModal {
  name: string
  username: string
  department: []
  password:string
  role:string
}

enum ModalAction {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}
const schema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  department: yup.array().required(),
  password: yup.string().required(),
  role: yup.string().required(),
}).required()

const UserAdmin = () => {
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')

  const {control, register, handleSubmit,setValue, formState: { errors } } = useForm<AddUserModal>({
    resolver: yupResolver(schema)
  })
  const [userdata, setUserdata] = useState<any>()
  const [departmentlist, setDepartmentList] = useState<any>()
  const [alertdata,setAlertdata] = useState('')
  const [selectvalue,setSelectValue] = useState([])
  //panigation
  const itemsPerPage = 6
  const [page, setPage]= useState(1)
  const [noOfPages,setNoOfPages]= useState(1)

  useEffect(() => {
    getDataUser()
    getDataDepartment()
  }, [])

  const getDataUser = () => {
    getListUser().then((data)=>{
      setUserdata(data)
      setNoOfPages(Math.ceil(data.length / itemsPerPage))
    })
  }
  const getDataDepartment = () => {
    getDepartmentList().then((data)=>{
      setDepartmentList(data)
    })
  }
  const delUser = (data:any) => {
    deleteUser(data,{setAlertdata}).then(()=>{
      setModal(false)
    }).catch(err => {
      setAlertdata(err.response.data.message)
    })
  }
  const editUers = (data:any) => {
    editUser(data,{setAlertdata}).then(()=>{
      setModal(false)
    }).catch(err => {
      setAlertdata(err.response.data.message)
    })
  }

  const handleChangePage = (event:any, value:any) => {
    setPage(value)
  }

  const onSubmit = (data: AddUserModal) =>{
    createNewUser(data,{setAlertdata}).then(()=>{
      getDataUser()
    }).catch(err => {
      setAlertdata(err.response.data.message)
    })
    setNoOfPages(Math.ceil(userdata.length / itemsPerPage))
  }

  const openModal = (action: string, data?: any) => {
    setModal(true)
    setAction(action)
    console.log(data)
    if (action === ModalAction.ADD) {
      setValue('name', '')
      setValue('username', '')
      setValue('role', '')
      setValue('password', '')
      setValue('department', [])
    }
    if (data) {
      setValue('name', data.name)
      setValue('username', data.username)
      setValue('role', data.role)
    }
  }

  const closeModal = (data:any) => {
    setModal(false)
  }


  const modalHeader = () => {
    return (
      <Modal.Title className='form_header'>
        {action === ModalAction.ADD && <div>Thêm người dùng mới</div>}
        {action === ModalAction.EDIT && <div>Chỉnh sửa người dùng</div>}
        {action === ModalAction.DELETE && <div>Xoá người dùng</div>}
      </Modal.Title>
    )
  }

  const modalBody = () => {
    return (
      <Modal.Body>
        {
          (action === ModalAction.ADD || action === ModalAction.EDIT) &&
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className='form_field'>
              <TextField
                required
                fullWidth
                label="Name"
                autoComplete="name"
                autoFocus
                {...register('name')}
                helperText= {errors.name?.message}
              />
            </div>
            <div className='form_field'>
              <TextField
                required
                fullWidth
                label="Username"
                autoComplete="username"
                autoFocus
                {...register('username')}
                helperText= {errors.username?.message}
              />
            </div>
            <div className='form_field'>
              <TextField
                required
                fullWidth
                label="Password"
                autoComplete="password"
                autoFocus
                {...register('password')}
                helperText= {errors.password?.message}
              />
            </div>
            <div className='form_field'>
              <Controller
                name="department"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <InputLabel id="Department">Department</InputLabel>
                    <Select
                      {...field}
                      labelId="Department"
                      label="department"
                      multiple
                      fullWidth
                      defaultValue={[]}
                    >
                      {departmentlist.map((items:any,index:any) => (
                        <MenuItem value={items.id} key={index}>
                          {items.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
              />
            </div>
            <div className='form_field'>
              <Controller
                name="role"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <div>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      {...field}
                      labelId="role"
                      label="role"
                      fullWidth
                    >
                      <MenuItem value={'Admin'}>Admin</MenuItem>
                      <MenuItem value={'Department'}>Department</MenuItem>
                    </Select>
                  </div>
                )}
              />
            </div>
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
        }
        { action === ModalAction.DELETE &&
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
  return (
    <ResponsiveDrawer childComponent={
      <div className="user-admin">
        <AlertError alertdata={alertdata} />

        <div className="container useradmin">
          <h4 className="header text-primary text-center text-uppercase">Danh sách người dùng</h4>
          <button
            className="btn btn-success btn-sm my-4"
            onClick={() => openModal(ModalAction.ADD)}
          >
            Thêm người dùng
          </button>
          <p>Chọn một người dùng để xem chi tiết</p>
          <table className="table table-striped border user-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Role</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {userdata &&
                userdata
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map(( user: any, index: number ) => {
                    return(
                      <tr key={index+1}>
                        <td>{itemsPerPage*(page-1)+index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary btn-edit-delete"
                            onClick={() => openModal(ModalAction.EDIT, user)}>
                              Chỉnh sửa
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger btn-edit-delete"
                            onClick={() => openModal(ModalAction.DELETE,user.id)}>
                              Xóa
                          </button>
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
          <Pagination
            defaultPage={6}
            count={noOfPages}
            page={page}
            onChange={handleChangePage}
            sx={{justifyContent:'right'}}
          />
        </div>
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
    }/>
  )
}

export default UserAdmin
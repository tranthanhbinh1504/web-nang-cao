import React, { useState } from 'react'
import Footer from '../../../components/Footer/'
import { Modal } from 'react-bootstrap'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import  './style.scss'
import { useForm,Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Pagination from '@mui/material/Pagination'
import Sidebar from 'src/components/Sidebar'

//schema validate of Add User Modal
interface AddUserModal {
  fullname: string
  email: string
  department: string
}

enum ModalAction {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

const schema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().required(),
  department: yup.string().required(),
}).required()

const Userdata = [
  {
    fullname: 'Nguyễn abc',
    email: 'khai@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    fullname: 'Nguyễn abc',
    email: 'khai@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    fullname: 'Nguyễn abc',
    email: 'khai@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    fullname: 'Nguyễn abc',
    email: 'khai@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    fullname: 'Nguyễn abc',
    email: 'khai@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    fullname: 'Nguyễn abc',
    email: 'khai@gmail.com',
    department: 'CNTT,KTPM',
  },
]

const UserAdmin = () => {
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')
  const [department, setDepartment] = React.useState('')

  const { register, handleSubmit,setValue, formState: { errors } } = useForm<AddUserModal>({
    resolver: yupResolver(schema)
  })

  //panigation
  const itemsPerPage = 6
  const [page, setPage] = React.useState(1)
  const [noOfPages,setNoOfPages] = React.useState(
    Math.ceil(Userdata.length / itemsPerPage)
  )
  const handleChangePage = (event:any, value:any) => {
    setPage(value)
  }
  const onSubmit = (data: AddUserModal) =>{
    console.log(data)
    Userdata.push(data)
    setNoOfPages(Math.ceil(Userdata.length / itemsPerPage))
  }

  const handleChange = (event:any) => {
    setDepartment(event.target.value)
  }

  const openModal = (action: string, data?: any) => {
    setModal(true)
    setAction(action)
    if (action === ModalAction.ADD) {
      setValue('fullname', '')
      setValue('email', '')
      setValue('department', '')
    }
    if (data) {
      setValue('fullname', data.fullname)
      setValue('email', data.email)
      setValue('department', data.department)
    }
  }

  const closeModal = () => {
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
                label="FullName"
                autoComplete="fullname"
                autoFocus
                {...register('fullname')}
                helperText= {errors.fullname?.message}
              />
            </div>
            <div className='form_field'>
              <TextField
                required
                fullWidth
                label="Email"
                autoComplete="Email"
                autoFocus
                {...register('email')}
                helperText= {errors.email?.message}
              />
            </div>
            <div className='form_field'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Department"
                  fullWidth
                  required
                  {...register('department')}
                  onChange={handleChange}
                >
                  <MenuItem value={'1'}>a</MenuItem>
                  <MenuItem value={'2'}>b</MenuItem>
                  <MenuItem value={'3'}>c</MenuItem>
                </Select>
              </FormControl>
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
    <Sidebar childComponent={
      <div className="user-admin">
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
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {Userdata
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((user,index) => {
                  return(
                    <tr key={index+1}>
                      <td>{itemsPerPage*(page-1)+index+1}</td>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary btn-edit-delete"
                          onClick={() => openModal(ModalAction.EDIT, user)}>
                            Chỉnh sửa
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger btn-edit-delete"
                          onClick={() => openModal(ModalAction.DELETE)}>
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
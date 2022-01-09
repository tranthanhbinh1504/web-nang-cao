import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import './style.scss'
import ResponsiveDrawer from 'src/components/sidebar'
import TableNotification from 'src/components/tableNotification'
import { getDepartmentList } from 'src/api/department'
import { notification } from 'src/api/notification'
import { notificationSearchData } from 'src/api/notification'

interface searchInfor {
  notificationName: string
  notificationContent: string
  department: string
  notificationType: string
}

const schema = yup.object({
  notificationName: yup.string(),
  notificationContent: yup.string(),
  department: yup.string(),
  // notificationType: yup.string(),
})

const NotificationsPage: React.FC = () => {
  const [handleChangeEvent, setHandleChangeEvent] = React.useState('')
  // const [fromDate, setValueFromDate] = React.useState<Date | null>(null)
  // const [toDate, setValueToDate] = React.useState<Date | null>(null)
  const [notificationData, setNotificationData] = useState<any>()
  const [departmentlist, setDepartmentList] = useState<any>()
  const [selectvalue,setSelectValue] = useState<string[]>([])

  const { control, register, handleSubmit, formState: { errors } } = useForm<searchInfor>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    getDataDepartment()
    getAllNotificationData()
  }, [])

  const getAllNotificationData = () => {
    notification().then((value: any) => {
      setNotificationData(value)
    })
  }
  console.log(notificationData)

  const getDataDepartment = () => {
    getDepartmentList().then((data) => {
      setDepartmentList(data)
    })
  }

  const onSubmit = (data: any) => {
    notificationSearchData(data.notificationName, data.notificationContent, data.department).then((value: any) => {
      setNotificationData(value)
    })
  }
  const handleChange = (event:any) => {
    // setHandleChangeEvent(event.target.value)
    const {
      target: { value },
    } = event
    setHandleChangeEvent(
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <ResponsiveDrawer childComponent={
      <div className="notificationsPage">
        <Box className='main-box-notification'>
          <div className='searchNotification'>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className='form_field'>
                    <TextField
                      required
                      fullWidth
                      label="Search by notification's name"
                      autoComplete="Search by notification's name"
                      autoFocus
                      {...register('notificationName')}
                      helperText= {errors.notificationName?.message}
                      key={'notificationName'}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className='form_field'>
                    <TextField
                      required
                      fullWidth
                      label="Search by notification's content"
                      autoComplete="Search by notification's content"
                      autoFocus
                      {...register('notificationContent')}
                      helperText= {errors.notificationContent?.message}
                    />
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div className='form_field'>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label="Choose Department"
                        fullWidth
                        required
                        {...register('department')}
                        onChange={handleChange}
                        // value={selectvalue}
                      >
                        <MenuItem value={''}>
                          -
                        </MenuItem>
                        {departmentlist && departmentlist.map((items: any, index: number) => (
                          <MenuItem value={items.name} key={index}>
                            {items.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={2} className='button'>
                  <div>
                    <Button
                      type="submit"
                      size='medium'
                      variant="contained"
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
          <hr />
          <TableNotification item={notificationData} />
        </Box>
      </div>
    }/>
  )
}
export default NotificationsPage
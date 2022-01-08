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
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@mui/material/Grid'
import './style.scss'
import ResponsiveDrawer from 'src/components/sidebar'
import TableNotification from 'src/components/tableNotification'
import { getDepartmentList } from 'src/api/department'

interface searchInfor {
  notificationName: string
  notificationContent: string
  department: string
  notificationType: string
}

const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString()
}

const schema = yup.object({
  notificationName: yup.string(),
  notificationContent: yup.string(),
  department: yup.string(),
  notificationType: yup.string(),
})

const NotificationsPage: React.FC = () => {
  const [handleChangeEvent, setHandleChangeEvent] = React.useState('')
  const [fromDate, setValueFromDate] = React.useState<Date | null>(null)
  const [toDate, setValueToDate] = React.useState<Date | null>(null)
  const [departmentlist, setDepartmentList] = useState<any>()
  const [selectvalue,setSelectValue] = useState<string[]>([])

  const { control, register, handleSubmit, formState: { errors } } = useForm<searchInfor>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    getDataDepartment()
  }, [])

  const getDataDepartment = () => {
    getDepartmentList().then((data) => {
      setDepartmentList(data)
    })
  }

  const onSubmit = (data: any) => {
    console.log(data)
    console.log(fromDate)
    console.log(toDate)
    console.log(handleChangeEvent)
  }
  const handleChange = (event:any) => {
    // setHandleChangeEvent(event.target.value)
    const {
      target: { value },
    } = event
    setSelectValue(
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
                <Grid item xs={5}>
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
                <Grid item xs={5}>
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
                        value={selectvalue}
                      >
                        {departmentlist && departmentlist.map((items: any, index: number) => (
                          <div key={index}>
                            <MenuItem value={items.id} >
                              {items.name}
                            </MenuItem>
                          </div>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className='form_field'>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Choose notification type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label="Choose notification's type"
                        fullWidth
                        required
                        {...register('notificationType')}
                        onChange={handleChange}
                      >
                        <MenuItem value={'Bảo hiểm y tế'}>Bảo hiểm y tế</MenuItem>
                        <MenuItem value={'Học vụ'}>Học vụ</MenuItem>
                        <MenuItem value={'Đăng ký kế hoạch học tập'}>Đăng ký kế hoạch học tập</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div className='form_field' id='datePickerFromDate'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disableFuture
                        label="From date"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={fromDate}
                        onChange={(newValue) => {
                          setValueFromDate(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div className='form_field' id='datePickerToDate'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disableFuture
                        label="To date"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={toDate}
                        onChange={(newValue) => {
                          setValueToDate(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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
          <TableNotification />
        </Box>
      </div>
    }/>
  )
}
export default NotificationsPage
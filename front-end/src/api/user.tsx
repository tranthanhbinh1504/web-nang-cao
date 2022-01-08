import React from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/user'
interface Props {
  setAlertdata:React.Dispatch<React.SetStateAction<string>>,
}
export const getListUser = () => {
  return (
    axios.get(API_URL)
      .then(res => {
        return  res.data
      })
  )
}
export const createNewUser = (user:any,{setAlertdata}:Props) => {
  return (
    axios.post(API_URL,user)
      .then(res => {
        setAlertdata(res.data.message)
        return  res.data
      })
  )
}
export const editUser = (user:any,{setAlertdata}:Props) => {
  return (
    axios.put(API_URL+user.id,user)
      .then(res => {
        setAlertdata(res.data.message)
        return  res.data
      })
  )
}
export const deleteUser = (userid:any,{setAlertdata}:Props) => {
  return (
    axios.delete(API_URL,userid)
      .then(res => {
        setAlertdata(res.data.message)
        return  res.data
      })
  )
}
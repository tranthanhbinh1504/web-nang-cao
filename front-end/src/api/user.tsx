import React from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/user/'
interface Props {
  setAlertdata:React.Dispatch<React.SetStateAction<string>>,
  setAlert:React.Dispatch<React.SetStateAction<boolean>>,
}
export const getListUser = () => {
  return (
    axios.get(API_URL)
      .then(res => {
        return  res.data
      })
  )
}
export const createNewUser = (user: any, {setAlertdata, setAlert}:Props) => {
  return (
    axios.post(API_URL, user)
      .then(res => {
        setAlertdata(res.data.message)
        setAlert(true)
        return  res.data
      })
  )
}
export const editUser = (userid: string, user: any,{setAlertdata, setAlert}: Props ) => {
  console.log()
  return (
    axios.put( `${API_URL}${userid}`, user)
      .then(res => {
        setAlertdata(res.data.message)
        setAlert(true)
        return  res.data
      })
  )
}
export const deleteUser = (userid: any,{setAlertdata, setAlert}: Props) => {
  return (
    axios.delete( API_URL + userid)
      .then(res => {
        setAlertdata(res.data.message)
        setAlert(true)
        return  res.data
      })
  )
}
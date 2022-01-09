import React from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/user/'
const token = window.localStorage.getItem('token')

interface Props {
  setAlertdata:React.Dispatch<React.SetStateAction<string>>,
  setAlert:React.Dispatch<React.SetStateAction<boolean>>,
}
export const getListUser = () => {
  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.get(API_URL, options)
      .then(res => {
        return  res.data
      })
  )
}
export const createNewUser = (user: any, {setAlertdata, setAlert}:Props) => {
  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.post(API_URL, user, options)
      .then(res => {
        setAlertdata(res.data.message)
        setAlert(true)
        return  res.data
      })
  )
}
export const editUser = (userid: string, user: any,{setAlertdata, setAlert}: Props ) => {
  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.put( `${API_URL}${userid}`, user, options)
      .then(res => {
        setAlertdata(res.data.message)
        setAlert(true)
        return  res.data
      })
  )
}
export const deleteUser = (userid: any,{setAlertdata, setAlert}: Props) => {
  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.delete( API_URL + userid, options)
      .then(res => {
        setAlertdata(res.data.message)
        setAlert(true)
        return  res.data
      })
  )
}
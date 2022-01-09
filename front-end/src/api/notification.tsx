import React from 'react'
import axios from 'axios'

const token = window.localStorage.getItem('token')
export const notification = () => {

  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.get('http://localhost:5000/api/post/notification', options)
      .then((res: any) => {
        return res.data
      })
  )
}

export const notificationSearchData = (title: any, content: any, department: any) => {

  const options = {
    params: {
      title: title,
      content: content,
      department: department
    },
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.get('http://localhost:5000/api/post/search', options)
      .then((res: any) => {
        return res.data
      })
  )
}

export const getNotificationDetail = (id: any) => {

  const options = {
    params: {id: id},
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.get('http://localhost:5000/api/post/getDetail', options)
      .then((res: any) => {
        return res.data
      })
  )
}
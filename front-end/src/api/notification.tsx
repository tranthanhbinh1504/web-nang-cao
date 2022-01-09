import React from 'react'
import axios from 'axios'

export const notification = () => {
  return (
    axios.get('http://localhost:5000/api/post/notification')
      .then((res: any) => {
        return res.data
      })
  )
}

export const notificationSearchData = (title: any, content: any, department: any) => {
  return (
    axios.get('http://localhost:5000/api/post/search', {
      params: {
        title: title,
        content: content,
        department: department
      }
    })
      .then((res: any) => {
        return res.data
      })
  )
}
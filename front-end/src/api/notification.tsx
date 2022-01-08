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
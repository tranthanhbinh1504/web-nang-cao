import React from 'react'
import axios from 'axios'

export const authLogin = (user:any) => {
  return (
    axios.post('http://localhost:5000/api/login/',user)
      .then(res => {
        if(res.data.token && res.data.user) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userid', res.data.user._id)
          localStorage.setItem('username', res.data.user.username)
          localStorage.setItem('role',res.data.user.role)
        }
        return res.data
      })
  )

}
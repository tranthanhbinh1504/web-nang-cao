import React from 'react'
import axios from 'axios'

export const googleLogin = () => {
  return (
    axios.get('http://localhost:5000/api/login/auth/google')
      .then((res: any) => {
        if(res.data.token && res.data.user) {
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('user',res.data.user)
        }
        return res.data
      })
  )

}
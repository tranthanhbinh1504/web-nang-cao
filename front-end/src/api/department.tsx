import React from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/department'
const token = window.localStorage.getItem('token')

export const getDepartmentList = () => {
  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }
  return (
    axios.get(API_URL, options)
      .then((res: any) => {
        return res.data
      })
  )

}
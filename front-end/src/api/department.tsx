import React from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/department'
export const getDepartmentList = () => {
  return (
    axios.get(API_URL)
      .then(res => {
        return  res.data
      })
  )

}
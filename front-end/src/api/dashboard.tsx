import React from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const token = window.localStorage.getItem('token')

interface Props {
  setAlertdata:React.Dispatch<React.SetStateAction<string>>,
  setAlert:React.Dispatch<React.SetStateAction<boolean>>,
}

export const getPostList = () => {
  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }
  return (
    axios.get(`${API_URL}/post`, options)
      .then((res: any) => {
        return res.data
      })
  )
}

export const addPost = (post: any) => {
  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }
  return (
    axios.post(`${API_URL}/post`, post, options)
  )
}
import React from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/post'

export const getPostList = () => {
  return (
    axios.get(API_URL)
      .then((res: any) => {
        return res.data
      })
  )
}
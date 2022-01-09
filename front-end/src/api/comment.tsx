import React from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/comment/'
const token = window.localStorage.getItem('token')

export const getCommentOfPost = (postId: any) => {

  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.get(API_URL + postId, options)
      .then((res: any) => {
        return res.data
      })
  )

}



export const deleteComment = (cmtId: any) => {

  const options = {
    headers: {'Authorization' : `Bearer ${token}`}
  }

  return (
    axios.delete(API_URL + cmtId, options)
      .then((res: any) => {
        return res.data
      })
  )

}
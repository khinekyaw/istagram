import React, { useEffect, useState } from "react"
import axios from "axios"

import ModalLayout from "../common/ModalLayout"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MessageCircle } from "lucide-react"

const Comments = props => {
  const { postId } = props
  const authToken = useSelector(state => state.user.key)
  const [comments, setComments] = useState()
  const [inputValue, setInputValue] = useState("")

  const onInputChange = e => {
    setInputValue(e.target.value)
  }

  const onSubmitComment = e => {
    e.preventDefault()
    submitComment()
  }

  const updateComments = comment => {
    setComments(state => [comment, ...state])
  }

  const submitComment = async () => {
    const data = { body: inputValue }
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/${postId}/comments/`,
        data,
        {
          headers: { Authorization: `Token ${authToken}` }
        }
      )
      updateComments(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/${postId}/comments/`,
        {
          headers: { Authorization: `Token ${authToken}` }
        }
      )
      setComments(response.data)
    }
    getComments()
  }, [authToken, postId])

  const commentItem =
    comments && comments.length ? (
      comments.map(item => {
        return (
          <div key={item.id} className='item'>
            <Link to={`user/${item.profile}`}>{`@${item.username} `}</Link>
            <span>{item.body}</span>
          </div>
        )
      })
    ) : (
      <div className='empty'>
        <MessageCircle className='icon' />
        <p>No comments yet</p>
      </div>
    )

  return (
    <ModalLayout
      title='Comments'
      onCancel={props.ToggleModal}
      hideDefaultButtons={true}>
      <div className='comments'>{commentItem}</div>
      <form onSubmit={onSubmitComment}>
        <div className='comments-form'>
          <input
            className='form-text-input'
            placeholder='Write a comment'
            value={inputValue}
            onChange={onInputChange}
          />
          <button className='btn'>Submit</button>
        </div>
      </form>
    </ModalLayout>
  )
}

export default Comments

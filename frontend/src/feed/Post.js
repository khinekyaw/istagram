import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, MessageCircle } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

import { likePost } from "../redux/posts-slice"
import Comments from "./Comments"
import Modal from "../common/Modal"
import MoreOptions from "./MoreOptions"

const Post = props => {
  const {
    id,
    username,
    image,
    caption,
    avatar,
    last_comment,
    users_like,
    profile
  } = props
  const likes_count = users_like.length
  const user = useSelector(state => state.user)
  const liked = users_like.includes(user.profile && user.profile.id)
    ? " active"
    : ""

  const dispatch = useDispatch()
  const [showComments, setShowComments] = useState(false)

  const onToggleModal = () => {
    setShowComments(state => !state)
  }

  const lastComment = last_comment && (
    <p>
      <Link to={`/user/${last_comment.profile}`} className='comment-username'>
        @{last_comment.username}{" "}
      </Link>
      {last_comment.body}
    </p>
  )

  const onLike = () => {
    dispatch(likePost(id, liked ? "remove" : "like"))
  }

  const likeButton = (
    <button className='icon-button' onClick={onLike}>
      <Heart className={`like${liked}`} color='black' />
    </button>
  )

  const commentsModal = (
    <Modal show={showComments} onBackdropClick={onToggleModal}>
      <Comments postId={id} show={showComments} ToggleModal={onToggleModal} />
    </Modal>
  )

  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__header__left'>
          <Link to={`/user/${profile}`} className='post__header__avatar'>
            <img src={avatar} alt={username} />
          </Link>
          <Link to={`/user/${profile}`} className='header-username'>
            {username}
          </Link>
        </div>
        <div className='post__header__right'>
          <MoreOptions {...props} />
        </div>
      </div>
      <div className='post__img'>
        <img src={image} alt={caption} />
      </div>
      <div className='post__footer'>
        <div className='post__footer__left'>{likeButton}</div>
        <div className='post__footer__mid'>
          <h5>{caption}</h5>
          {lastComment}
          <span className='post-likes'>
            <span className='count'>{likes_count}</span> people like this
          </span>
        </div>
        <div className='post__footer__right'>
          <button className='icon-button' onClick={onToggleModal}>
            <MessageCircle color='black' />
          </button>
        </div>
      </div>
      {commentsModal}
    </div>
  )
}

export default Post

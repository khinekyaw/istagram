import React from "react"
import { Link } from "react-router-dom"
import { Heart, MoreHorizontal, MessageCircle } from "lucide-react"
import { useSelector } from "react-redux"
import axios from "axios"

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
  const active_like = users_like.includes(user.profile && user.profile.id)
    ? " active"
    : ""

  const lastComment = last_comment && (
    <p>
      <Link to={`/user/${last_comment.profile}`} className='comment-username'>
        @{last_comment.username}{" "}
      </Link>
      {last_comment.body}
    </p>
  )

  const actionLike = async (config, action) => {
    await axios.get(
      `http://127.0.0.1:8000/api/v1/${id}/likes?action=${action}`,
      config
    )
  }

  const onLike = () => {
    const config = {
      headers: { Authorization: `Token ${user.key}` }
    }
    actionLike(config, active_like ? "remove" : "like")
  }

  const likeButton = (
    <button className='icon-button' onClick={onLike}>
      <Heart className={`like${active_like}`} color='black' />
    </button>
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
          <button className='icon-button'>
            <MoreHorizontal color='black' />
          </button>
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
          <button className='icon-button'>
            <MessageCircle color='black' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post

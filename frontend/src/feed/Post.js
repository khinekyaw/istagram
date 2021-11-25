import React from "react"
import { Heart, MoreHorizontal, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

const Post = props => {
  const {
    username,
    image,
    caption,
    avatar,
    last_comment,
    users_like,
    profile
  } = props
  const likes_count = users_like.length

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
        <div className='post__footer__left'>
          <button className='icon-button'>
            <Heart color='black' />
          </button>
        </div>
        <div className='post__footer__mid'>
          <h5>{caption}</h5>
          <p>
            <Link
              to={`/user/${last_comment.profile}`}
              className='comment-username'>
              @{last_comment.username}{" "}
            </Link>
            {last_comment.body}
          </p>
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

import React from "react"
import { Heart, MessageCircle } from "lucide-react"

const PostPreview = props => {
  const { image, users_like } = props
  const likes_count = users_like.length
  const comments_count = 3

  return (
    <div className='photo-grid__item'>
      <img src={image} alt='same' />
      <div className='overlay'>
        <div className='overlay__item'>
          <Heart className='icon' />
          <p>{likes_count}</p>
        </div>
        <div className='overlay__item'>
          <MessageCircle className='icon' />
          <p>{comments_count}</p>
        </div>
      </div>
    </div>
  )
}

export default PostPreview

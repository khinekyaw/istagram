import React from "react"
import { Heart, MessageCircle } from "lucide-react"

const PostPreview = props => {
  const { image, users_like, total_comments } = props
  const likes_count = users_like.length

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
          <p>{total_comments}</p>
        </div>
      </div>
    </div>
  )
}

export default PostPreview

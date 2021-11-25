import React from "react"
import { Image, Bookmark } from "lucide-react"

import PostPreview from "./PostPreview"

const PostGrid = props => {
  const { data, tab } = props

  let blankContent = (
    <>
      <Image className='icon' />
      <p>No Post Yet</p>
    </>
  )

  if (tab === "saved") {
    blankContent = (
      <>
        <Bookmark className='icon' />
        <p>No Saved Yet</p>
      </>
    )
  }

  return (
    <div className='photo-grid'>
      {data && data.length ? (
        data.map(item => <PostPreview key={item.id} {...item} />)
      ) : (
        <div className='blank'>{blankContent}</div>
      )}
    </div>
  )
}

export default PostGrid

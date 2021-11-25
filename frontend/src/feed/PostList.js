import React from "react"

const PostList = props => {
  return (
    <div className='feed'>
      {props.data.map(item => {
        return <props.renderComponent key={item.id} {...item} />
      })}
    </div>
  )
}

export default PostList

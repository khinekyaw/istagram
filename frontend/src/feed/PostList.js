import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Meh } from "lucide-react"

import { fetchPosts } from "../redux/posts-slice"
import Post from "./Post"

const PostList = props => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <div className='feed'>
      {posts.posts ? (
        posts.posts.map(item => {
          return <Post key={item.id} {...item} />
        })
      ) : (
        <div className='empty-feed'>
          <Meh className='icon' />
          <p>Nothing to show</p>
        </div>
      )}
    </div>
  )
}

export default PostList

import React, { useEffect } from "react"
import { Image, Bookmark } from "lucide-react"

import PostPreview from "./PostPreview"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfilePhotos } from "../redux/profilePhotos-slice"

const PostGrid = props => {
  const { tab, routeId } = props
  const dispatch = useDispatch()
  const profilePosts = useSelector(state => state.profile_photos)
  let data = profilePosts.user_photos

  let blankContent = (
    <>
      <Image className='icon' />
      <p>No Post Yet</p>
    </>
  )

  if (tab === "saved") {
    data = profilePosts.saved_photos
    blankContent = (
      <>
        <Bookmark className='icon' />
        <p>No Saved Yet</p>
      </>
    )
  }

  useEffect(() => {
    dispatch(fetchProfilePhotos(routeId, tab))
  }, [dispatch, routeId, tab])

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

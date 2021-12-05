import React, { useEffect } from "react"

import SuggestionsList from "./SuggestionsList"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfiles } from "../redux/profiles-slice"
import MyProfile from "./MyProfile"

const Sidebar = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.profiles)
  const profiles = data.profiles
  const user = useSelector(state => state.user)

  let myProfile = null
  let suggestions = null

  if (profiles) {
    myProfile = profiles.find(p => p.username === user.username)
    suggestions = profiles.filter(p => p.username !== user.username)
  }

  // console.log(profiles)

  useEffect(() => {
    dispatch(fetchProfiles())
  }, [dispatch])

  return (
    <div className='sidebar'>
      <div className='sidebar__inner sticky'>
        <MyProfile {...myProfile} />
        <SuggestionsList data={suggestions} />
      </div>
    </div>
  )
}

export default Sidebar

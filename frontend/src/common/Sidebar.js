import React from "react"
import { Link } from "react-router-dom"

import { PROFILES } from "../data"
import SuggestionsList from "./SuggestionsList"
import SuggestionItem from "./SuggestionItem"

const MyProfile = ({ name, username, avatar, profile }) => (
  <>
    <div className='sidebar__profile-me__shadow'></div>
    <div className='sidebar__profile-me'>
      <Link
        to={`/user/${profile}`}
        className='sidebar__profile-me__avatar avatar'>
        <img src={avatar} alt={username} />
      </Link>
      <div className='sidebar__profile-me__left'>
        <Link to={`/user/${profile}`} className='username--link'>
          {username}
        </Link>
        <span>{name}</span>
      </div>
    </div>
  </>
)

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__inner sticky'>
        <MyProfile {...PROFILES[0]} />
        <SuggestionsList data={PROFILES} renderComponent={SuggestionItem} />
      </div>
    </div>
  )
}

export default Sidebar

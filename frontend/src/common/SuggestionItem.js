import React from "react"
import { Link } from "react-router-dom"

const SuggestionItem = ({ avatar, username, name, profile }) => {
  return (
    <Link to={`/user/${profile}`} className='suggestions-list__user'>
      <div className='avatar'>
        <img src={avatar} alt={username}></img>
      </div>
      <div className='left'>
        <p>{username}</p>
        <p className='name'>{name}</p>
      </div>
    </Link>
  )
}

export default SuggestionItem

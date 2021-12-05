import React from "react"
import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const SuggestionItem = ({ avatar, username, name, id }) => {
  return (
    <Link to={`/user/${id}`} className='suggestions-list__user'>
      <Avatar src={avatar} alt={username} />
      <div className='left'>
        <p>{username}</p>
        <p className='name'>{name}</p>
      </div>
    </Link>
  )
}

export default SuggestionItem

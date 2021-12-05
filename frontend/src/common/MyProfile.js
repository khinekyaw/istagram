import { User } from "lucide-react"
import { Link } from "react-router-dom"

const MyProfile = ({ id, name, username, avatar }) => (
  <>
    <div className='sidebar__profile-me__shadow'></div>
    <div className='sidebar__profile-me'>
      <Link to={`/user/${id}`} className='sidebar__profile-me__avatar avatar'>
        {avatar ? (
          <img src={avatar} alt={username} />
        ) : (
          <User className='icon' />
        )}
      </Link>
      <div className='sidebar__profile-me__left'>
        <Link to={`/user/${id}`} className='username--link'>
          {username}
        </Link>
        <span>{name}</span>
      </div>
    </div>
  </>
)

export default MyProfile

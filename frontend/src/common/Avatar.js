import React from "react"
import { User } from "lucide-react"

const Avatar = props => {
  const Props = { ...props }
  const { src, username } = props
  const classNames = ["avatar"]

  if (props.className) classNames.push(props.className)

  delete Props.src
  delete Props.username

  return (
    <div {...Props} className={classNames.join(" ")}>
      {src ? (
        <img src={props.src} alt={username}></img>
      ) : (
        <User className='icon' />
      )}
    </div>
  )
}

export default Avatar

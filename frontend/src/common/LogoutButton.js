import React from "react"
import { LogOut } from "lucide-react"

import { useNavigate } from "react-router"
import useLogout from "../hooks/use-logout"

const LogoutButton = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  const onClick = () => {
    logout()
    navigate("/login")
  }

  return (
    <button className='logout__button' onClick={onClick}>
      <LogOut className='icon' />
    </button>
  )
}

export default LogoutButton

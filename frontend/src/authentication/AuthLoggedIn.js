import React from "react"
import { ShieldCheck } from "lucide-react"

import useLogout from "../hooks/use-logout"

const AuthLoggedIn = props => {
  const logout = useLogout()

  return (
    <div className='auth-logged-in'>
      <ShieldCheck className='icon' />
      <p>Already logged in</p>
      {props.authType === "register" ? (
        <span>
          <span className='link' onClick={logout}>
            Logout
          </span>{" "}
          first to register!
        </span>
      ) : null}
    </div>
  )
}

export default AuthLoggedIn

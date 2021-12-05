import React from "react"
import { Link } from "react-router-dom"

const AuthFooter = props => {
  return props.authType === "login" ? (
    <>
      <p>Don't have an account? </p>
      <Link to='/register'>Sign Up</Link>
    </>
  ) : (
    <>
      <p>Already have an account? </p>
      <Link to='/login'>Login</Link>
    </>
  )
}

export default AuthFooter

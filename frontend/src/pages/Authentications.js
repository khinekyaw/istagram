import React, { useEffect } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import { Layout } from "../common"
import useInput from "../hooks/use-input"
import { sendLoginData } from "../redux/user-slice"

const Authentications = props => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { authType } = props

  const [
    username,
    usernameIsValid,
    usernameHasError,
    usernameChangeHandler,
    usernameInputBlurHandler,
    usernameReset
  ] = useInput()

  const [
    password,
    passwordIsValid,
    passwordHasError,
    passwordChangeHandler,
    passwordInputBlurHandler,
    passwordReset
  ] = useInput()

  // useEffect(() => {
  // }, [dispatch])

  const onSubmitHandler = () => {
    dispatch(
      sendLoginData({
        username,
        password
      })
    )
  }

  const footer =
    authType === "login" ? (
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

  return (
    <Layout location={location}>
      <h2>{authType === "login" ? "LOGIN" : "REGISTER"}</h2>
      <input
        type='text'
        className='form-text-input'
        placeholder='Username'
        value={username}
        onChange={usernameChangeHandler}
      />
      <input
        type='password'
        className='form-text-input'
        placeholder='Password'
        value={password}
        onChange={passwordChangeHandler}
      />
      <button className='btn' onClick={onSubmitHandler}>
        Submit
      </button>
      {footer}
    </Layout>
  )
}

export default Authentications

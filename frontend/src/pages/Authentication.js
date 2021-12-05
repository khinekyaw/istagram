import React from "react"
import { useLocation, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import { Layout } from "../common"
import useInput from "../hooks/use-input"
import { login, register } from "../redux/user-slice"
import AuthLoggedIn from "../authentication/AuthLoggedIn"
import AuthForm from "../authentication/AuthForm"
import { validatePassword } from "../utils"

const Authentication = props => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.username)
  const { authType } = props

  const username = useInput(state => state.trim())
  const password = useInput(validatePassword)

  const resetInputs = () => {
    username.reset()
    password.reset()
  }

  const formIsValid = () => {
    return username.valueIsValid && password.valueIsValid
  }

  const onLoginSucceed = () => {
    resetInputs()
    const { state } = location
    if (state && state.path) {
      navigate(state.path, { replace: true })
    } else navigate("/", { replace: true })
  }

  const onRegisterSucceed = () => {
    resetInputs()
    navigate("/login")
  }

  const loginHandler = () => {
    dispatch(
      login({
        data: {
          username: username.enteredValue,
          password: password.enteredValue
        },
        onSucceed: onLoginSucceed
      })
    )
  }

  const registerHandler = () => {
    dispatch(
      register({
        data: {
          username: username.enteredValue,
          password: password.enteredValue,
          password2: password.enteredValue
        },
        onSucceed: onRegisterSucceed
      })
    )
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if (!formIsValid()) return
    if (authType === "login") loginHandler()
    else registerHandler()
  }

  const body = user ? (
    <AuthLoggedIn authType={authType} />
  ) : (
    <AuthForm {...{ authType, username, password, onSubmitHandler }} />
  )

  return <Layout location={location}>{body}</Layout>
}

export default Authentication

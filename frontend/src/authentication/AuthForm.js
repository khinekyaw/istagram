import React from "react"
import AuthFooter from "../authentication/AuthFooter"
import TextInput from "../common/TextInput"

const AuthForm = props => {
  const { authType, onSubmitHandler, username, password } = props

  return (
    <>
      <h2>{authType === "login" ? "LOGIN" : "REGISTER"}</h2>
      <form onSubmit={onSubmitHandler}>
        <TextInput
          type='text'
          className='form-text-input'
          placeholder='Username'
          value={username.enteredValue}
          onChange={username.valueChangeHandler}
          hasError={username.hasError}
          onBlur={username.inputBlurHandler}
          autoFocus
        />
        <TextInput
          type='password'
          className='form-text-input'
          placeholder='Password'
          value={password.enteredValue}
          onChange={password.valueChangeHandler}
          hasError={password.hasError}
          onBlur={password.inputBlurHandler}
        />
        <button className='btn' onClick={onSubmitHandler}>
          Submit
        </button>
      </form>
      <AuthFooter authType={authType} />
    </>
  )
}

export default AuthForm

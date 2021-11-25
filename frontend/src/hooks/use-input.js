import { useState } from "react"

const useInput = validateValue => {
  const [enteredValue, setEnteredValue] = useState("")
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid =
    typeof validateValue === "function" ? validateValue(enteredValue) : true
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value)
  }

  const inputBlurHandler = event => {
    setIsTouched(true)
  }

  const reset = () => {
    setEnteredValue("")
    setIsTouched(false)
  }

  return [
    enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  ]
}

export default useInput

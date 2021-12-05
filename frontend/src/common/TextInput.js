import React from "react"

const TextInput = props => {
  const Props = { ...props }
  const classNames = ["form-text-input"]

  if (props.hasError) classNames.push("error")

  delete Props.hasError

  return <input {...Props} className={classNames.join(" ")} />
}

export default TextInput

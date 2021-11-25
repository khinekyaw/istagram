import React from "react"

const Layout = props => {
  const path = props.location ? props.location.pathname.split("/")[1] : null
  const wrapperClasses = ["container"]

  if (path && path === "user") wrapperClasses.push("profile")
  else if ((path && path === "login") || (path && path === "register"))
    wrapperClasses.push("auth")

  return (
    <div className={wrapperClasses.join(" ")}>
      <div className={"layout"}>{props.children}</div>
    </div>
  )
}

export default Layout

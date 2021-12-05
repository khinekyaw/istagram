import React from "react"
import { Bookmark, Layout } from "lucide-react"
import { Link } from "react-router-dom"

const TabButtons = props => {
  const { active, location } = props

  return (
    <div className='tab-bar'>
      <Link
        to={location.pathname}
        replace
        className={`tab__button${active ? "" : " active"}`}>
        <Layout className='icon' />
        <p>Posts</p>
      </Link>
      <Link
        to={location.pathname + "?tab=saved"}
        replace
        className={`tab__button${active === "saved" ? " active" : ""}`}>
        <Bookmark className='icon' />
        <p>Saved</p>
      </Link>
    </div>
  )
}

export default TabButtons

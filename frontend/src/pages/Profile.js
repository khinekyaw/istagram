import React from "react"
import { useLocation } from "react-router"

import ProfileDetails from "../profile/ProfileDetails"
import TabButtons from "../profile/TabButtons"
import Layout from "../common/Layout"
import PostGrid from "../profile/PostGrid"
import { POSTS } from "../data"
import Footer from "../common/Footer"

const Profile = props => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const tab = query.get("tab")

  return (
    <>
      <Layout location={location}>
        <ProfileDetails />
        <TabButtons active={tab} location={location} />
        <PostGrid data={tab === "saved" ? [] : POSTS} tab={tab} />
      </Layout>
      <Footer />
    </>
  )
}

export default Profile

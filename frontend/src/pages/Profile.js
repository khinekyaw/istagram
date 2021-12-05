import React from "react"
import { useLocation, useParams } from "react-router"

import ProfileDetails from "../profile/ProfileDetails"
import TabButtons from "../profile/TabButtons"
import Layout from "../common/Layout"
import PostGrid from "../profile/PostGrid"
import Footer from "../common/Footer"

const Profile = props => {
  const location = useLocation()
  const { id } = useParams()
  const query = new URLSearchParams(location.search)
  const tab = query.get("tab")

  return (
    <>
      <Layout location={location}>
        <ProfileDetails routeId={id} />
        <TabButtons active={tab} location={location} />
        <PostGrid tab={tab} routeId={id} />
      </Layout>
      <Footer />
    </>
  )
}

export default Profile

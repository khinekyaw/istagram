import React from "react"

import PostList from "../feed/PostList"
import Sidebar from "../common/Sidebar"
import Layout from "../common/Layout"

const Home = () => {
  return (
    <Layout>
      <PostList />
      <Sidebar />
    </Layout>
  )
}

export default Home

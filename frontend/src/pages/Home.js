import React from "react"

import PostList from "../feed/PostList"
import Post from "../feed/Post"

import { POSTS } from "../data"
import Sidebar from "../common/Sidebar"
import Layout from "../common/Layout"

const Home = () => {
  return (
    <Layout>
      <PostList data={POSTS} renderComponent={Post} />
      <Sidebar />
    </Layout>
  )
}

export default Home

import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import { Navbar } from "./common"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Authentications from "./pages/Authentications"
import store from "./redux"

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <header className='sticky'>
          <Navbar />
        </header>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/user/:id' element={<Profile />} />
          <Route path='/login' element={<Authentications authType='login' />} />
          <Route path='/register' element={<Authentications />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App

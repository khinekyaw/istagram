import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import { Navbar } from "./common"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Authentication from "./pages/Authentication"
import store from "./redux"
import RequireAuth from "./authentication/RequireAuth"

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <header className='sticky'>
          <Navbar />
        </header>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/user/:id'
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path='/login' element={<Authentication authType='login' />} />
          <Route
            path='/register'
            element={<Authentication authType='register' />}
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import PrivateElement from './components/PrivateElement'

function App() {
  return (
    <BrowserRouter>
    {<Header/>}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route element={<PrivateElement/>}>
          <Route path='/profile' element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
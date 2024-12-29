import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
const App = () => {

  
  return (
    <div className='app'>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path='/' element={<Register/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

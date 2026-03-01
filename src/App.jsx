import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes  } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Post from './components/Post'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/post" element={<Post/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
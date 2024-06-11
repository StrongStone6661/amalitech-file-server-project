/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { Routes,Route} from 'react-router-dom'
import Forgotpassword from './components/auth/Forgotpassword'
import ResetPassword from './components/auth/ResetPassword'
import AdminDashboard from './components/adminUi/dashboard/AdminDashboard'
import FeedPage from './components/feedpage/FeedPage'


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password-forget" element={<Forgotpassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword/>} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path='/feedpage' element={<FeedPage/>} />
    </Routes>
  )
}

export default App

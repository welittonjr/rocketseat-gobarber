import React from 'react'
import SignIn from './pages/SignIn'
import GlobalStyles from './styles/global'
import './App.css'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyles />
    </>
  )
}

export default App

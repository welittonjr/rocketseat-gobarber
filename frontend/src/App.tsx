import React from 'react'
import SignIn from './pages/SignIn'
import GlobalStyles from './styles/global'
import './App.css'
import AppProvider from './hooks'

const App = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyles />
    </>
  )
}

export default App

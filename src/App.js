import React from 'react'
import './App.css'
// import './Components/CreateAccount'
import { Router } from '@reach/router'
import Main from './Components/Main'

const App = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <div>
    <Router>
      <Main path="/" />
    </Router>
  </div>
)

export default App

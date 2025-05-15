import { useState } from 'react'
import { Login } from './pages/Login'
import { Tarefas } from './pages/Tarefas'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [count, setCount] = useState(0)

  if (!token) {
    return <Login onLogin={setToken} />
  }

  return <Tarefas token={token} />
}

export default App
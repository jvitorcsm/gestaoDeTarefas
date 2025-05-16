import { useState } from 'react'
import { Login } from './pages/Login'
import { Tarefas } from './pages/Tarefas'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [idUsuario, setIdUsuario] = useState(null)

  function handleLogin(tokenRecebido, idUsuarioRecebido) {
    setToken(tokenRecebido)
    setIdUsuario(idUsuarioRecebido)
  }

  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return <Tarefas token={token} idUsuario={idUsuario} />
}

export default App

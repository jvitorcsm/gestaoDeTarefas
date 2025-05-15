import { useState } from 'react'
import { loginUser } from '../api.js'

export function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await loginUser(email, senha)
      onLogin(data.token)
    } catch {
      setError('Email ou senha inválidos')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha"
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}

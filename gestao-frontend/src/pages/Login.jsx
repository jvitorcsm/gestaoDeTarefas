import { useState } from 'react'
import jwtDecode from 'jwt-decode'  // Importação correta do jwt-decode
import { loginUser } from '../api.js'

export function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
  
    try {
      const data = await loginUser(email, senha)
      console.log('Login data:', data)
  
      const decodeFn = typeof jwtDecode === 'function' ? jwtDecode : jwtDecode.default
      const decoded = decodeFn(data.token)
  
      const idUsuario = decoded.idUsuario || decoded.id || decoded.sub
      if (!idUsuario) {
        throw new Error('ID do usuário não encontrado no token')
      }
  
      onLogin(data.token, idUsuario)
    } catch (err) {
      console.error(err)
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

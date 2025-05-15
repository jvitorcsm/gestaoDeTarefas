import { useEffect, useState } from 'react'
import { criarTarefa, pegarTarefas, excluirTarefa } from '../api.js'

export function Tarefas({ token }) {
  const [descricao, setDescricao] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [error, setError] = useState(null)

  const carregarTarefas = async () => {
    try {
      const data = await pegarTarefas(token)
      setTarefas(data.tarefas)
    } catch {
      setError('Erro ao carregar tarefas')
    }
  }

  useEffect(() => {
    carregarTarefas()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await criarTarefa(token, descricao)
      setDescricao('')
      carregarTarefas()
    } catch {
      setError('Erro ao criar tarefa')
    }
  }

  const handleDelete = async (id) => {
    try {
      await excluirTarefa(token, id)
      carregarTarefas()
    } catch {
      setError('Erro ao excluir tarefa')
    }
  }

  return (
    <div>
      <h2>Tarefas</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Descrição" 
          value={descricao} 
          onChange={e => setDescricao(e.target.value)} 
          required 
        />
        <button type="submit">Adicionar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            {tarefa.descricao}
            <button onClick={() => handleDelete(tarefa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

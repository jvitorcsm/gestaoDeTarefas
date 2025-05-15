const API_URL = 'http://localhost:3000' // seu backend

export async function loginUser(email, senha) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // seu backend está usando GET para login? Normalmente é POST.
      // Se for POST, ajustar aqui.
    },
    body: JSON.stringify({ email, senha }),
  })
  if(!res.ok) throw new Error('Erro no login')
  return await res.json()
}

export async function criarTarefa(token, descricao) {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    body: JSON.stringify({ descricao }),
  })
  if (!res.ok) throw new Error('Erro ao criar tarefa')
  return await res.json()
}

export async function pegarTarefas(token) {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'GET',
    headers: { token },
  })
  if (!res.ok) throw new Error('Erro ao pegar tarefas')
  return await res.json()
}

export async function excluirTarefa(token, id) {
  const res = await fetch(`${API_URL}/tarefas?id=${id}`, {
    method: 'DELETE',
    headers: { token },
  })
  if (!res.ok) throw new Error('Erro ao excluir tarefa')
  return await res.json()
}

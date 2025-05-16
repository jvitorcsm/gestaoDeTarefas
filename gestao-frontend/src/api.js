const API_URL = 'http://localhost:3000';

export async function pegarTarefas(token) {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Erro ao carregar tarefas');
  return res.json();
}

export async function criarTarefa(token, tarefa) {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tarefa),
  });
  if (!res.ok) throw new Error('Erro ao criar tarefa');
  return res.json();
}

export async function excluirTarefa(token, id) {
  const res = await fetch(`${API_URL}/tarefas/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Erro ao excluir tarefa');
  return res.json();
}

export async function loginUser(email, senha) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error('Erro no login');
  return res.json();
}

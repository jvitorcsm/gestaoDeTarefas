import { useEffect, useState } from 'react'
import { criarTarefa, pegarTarefas, excluirTarefa } from '../api.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import '../styles/Tarefas.css'

export function Tarefas({ token, idUsuario, nomeUsuario }) {
  const [titulo, setTitulo] = useState('')
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
      await criarTarefa(token, {
        titulo,
        descricao,
        status: 'a-fazer',
        id_usuario: idUsuario
      })
      setTitulo('')
      setDescricao('')
      carregarTarefas()
      setError(null)
    } catch {
      setError('Erro ao criar tarefa')
    }
  }

  const handleDelete = async (id) => {
    try {
      await excluirTarefa(token, id)
      carregarTarefas()
      setError(null)
    } catch {
      setError('Erro ao excluir tarefa')
    }
  }

  const colunas = {
    'a-fazer': {
      nome: 'A Fazer',
      tarefas: tarefas.filter(t => t.status === 'a-fazer')
    },
    'fazendo': {
      nome: 'Fazendo',
      tarefas: tarefas.filter(t => t.status === 'fazendo')
    },
    'pronto': {
      nome: 'Pronto',
      tarefas: tarefas.filter(t => t.status === 'pronto')
    }
  }

  return (
    <div className="container-tarefas">
      <div className="formulario">
        <h3>Usuário: {nomeUsuario}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px', gap: '10px' }}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
          <button type="submit">Adicionar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div className="kanban">
        <DragDropContext onDragEnd={async (result) => {
          const { destination, draggableId } = result;

          if (!destination) return;

          const novoStatus = destination.droppableId;

          // Atualiza o estado local primeiro para evitar erro visual
          setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
              String(tarefa.id) === draggableId
                ? { ...tarefa, status: novoStatus }
                : tarefa
            )
          );

          // Depois atualiza no banco
          try {
            const response = await fetch(`http://localhost:3000/tarefas/${draggableId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: novoStatus }),
            });

            if (!response.ok) {
              throw new Error('Erro ao atualizar no servidor');
            }

            // Se quiser garantir consistência total, pode recarregar depois:
            // await carregarTarefas();

          } catch (err) {
            console.error('Erro ao mover tarefa:', err);
            setError('Erro ao atualizar tarefa no servidor');
          }
        }}>
          {Object.entries(colunas).map(([colId, col]) => (
            <Droppable droppableId={colId} isDropDisabled={false}>
              {(provided) => (
                <div className="coluna">
                  <h4>{col.nome}</h4>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minHeight: '100px' }}
                  >
                    {col.tarefas.map((tarefa, index) => (
                      <Draggable draggableId={String(tarefa.id)} index={index} key={tarefa.id}>
                        {(provided) => (
                          <div
                            className="card-tarefa"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span className="badge">
                              {tarefa.status === 'a-fazer' ? 'A Fazer' :
                                tarefa.status === 'fazendo' ? 'Fazendo' : 'Pronto'}
                            </span>

                            <p><strong>{tarefa.titulo}</strong></p>
                            <p>{tarefa.descricao}</p>

                            <button onClick={() => handleDelete(tarefa.id)}>Excluir</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}
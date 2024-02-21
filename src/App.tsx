import { Header } from "./components/Header"
import { Input } from "./components/Input"

import styles from './App.module.css'
import './global.css'
import { Button } from "./components/Button"
import { PlusCircle } from "@phosphor-icons/react"
import { ListHeader } from "./components/list/Header"
import { Empty } from "./components/list/Empty"
import { useState } from "react"
import { Item } from "./components/list/Item"


//criar array para as tarefas:
export interface ITask {
  id: number
  text: string
  isChecked: boolean
}


export function App() {
  //crio um ESTADO para que seja monitorado a adição ou exclusão de infos

  //CRIA AS TAREFAS NO ARRAY COM AS INFORMAÇÕES DO ITASKS
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputValue, setInputValue] = useState('')

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }
    return prevValue
  }, 0)


  //função para adicionar tarefa no botão 
  function handleAddTask() {
    //caso o input tiver valor, retorna a função abaixo, se não não retorna nada
    if (!inputValue)

      return

    //criação de uma nova tarefa
    const newTask: ITask = {
      //cria um id com data unica
      id: new Date().getTime(),
      //texto colocado no input (o Usestate monitora)
      text: inputValue,
      //tarefa original nao estará assinalada
      isChecked: false,
    }
    //lista as tarefas baseada nas informações do State, e cria uma nova tarefa.
    setTasks((state) => [...state, newTask])
    //input com a tarefa digitada
    setInputValue('')
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTasks(filteredTasks)


  }

  //função para editar a tarefa:
  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }


  return (
    < main >
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <ListHeader tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}

          />

          {tasks.length > 0 ? (

            <div>
              {
                tasks.map((task) => (
                  <Item
                    key={task.id}
                    data={task}
                    removeTask={handleRemoveTask}
                    toggleTaskStatus={handleToggleTask}

                  />
                ))}


            </div>

          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  )
}
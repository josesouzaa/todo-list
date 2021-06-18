'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))


const criarItem = (tarefa, status = "", index) => {
  const item = document.createElement('label')
  item.classList.add('todo__item')
  item.innerHTML = `
      <input type="checkbox" ${status} data-index="${index}">
      <div>${tarefa}</div>
      <input type="button" value="X" data-index="${index}">
  `
  document.getElementById('todoList').appendChild(item)
}

const limparTarefas = () => {
  const todoList = document.getElementById('todoList')
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}

const atualizarTela = () => {
  const banco = getBanco()
  limparTarefas()
  banco.forEach((item, index) => { criarItem(item.tarefa, item.status, index) })
}

const inserirItem = (event) => {
  const tecla = event.key
  const texto = event.target.value
  if (tecla === 'Enter') {
    const banco = getBanco()
    banco.push({ tarefa: texto, status: "" })
    setBanco(banco)
    atualizarTela()
    event.target.value = ""
  }
}

const atualizarItem = (index) => {
  const banco = getBanco()
  banco[index].status = banco[index].status === "" ? 'checked' : ""
  setBanco(banco)
  atualizarTela()
}

const removerItem = (index) => {
  const banco = getBanco()
  banco.splice(index, 1)
  setBanco(banco)
  atualizarTela()
}

const clickItem = (event) => {
  const elemento = event.target
  if (elemento.type === "button") {
    const index = elemento.dataset.index
    removerItem(index)
  } else if (elemento.type === "checkbox") {
    const index = elemento.dataset.index
    atualizarItem(index)
  }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todoList').addEventListener('click', clickItem)

atualizarTela()
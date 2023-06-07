import { useState } from 'react'

import Todo from './components/Todo';

import './App.css';
import TodoForm from './components/TodoForm'; 
import Search from './components/Search';
import Filter from './components/Filter';

function App() { 
  //dividir funcionalidades e componentes, 
  // difinir os todos , para armazenar as variaveis , é como se tivesse pegando esses dados do banco de dados

  const [todos, setTodos] = useState([
    {
      //esses 3 objetos possuem as seguintes propriedades:
      id:1, // numero de identificação  
      text:"Criar funcionalidade X no sistema",  // texto conteudo do todo
      category: "Trabalho", // categoria que ele ta dividindo 
      isCompleted: false, // verifica se ta completo ou não
    },
    {
      id:2,
      text:"Ir para a academia",
      category: "Pessoa",
      isCompleted: false,
    },
    {
      id:3,
      text:"Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]); 

  const [search, setSearch] = useState(""); 

  const [filter, setfilter] = useState("All"); 
  const [sort, setSort] = useState("Asc");


  const addTodo = (text, category) => {

    const newTodos = [
      ...todos,
       {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    },
  ];

  setTodos(newTodos);

  };

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null
      
      );
      setTodos(filteredTodos); 
  };

  const completeTodo = (id) =>
  {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos);
  }

  return <div className='app'>
    <h1>Lista de Tarefas</h1>  
    <Search search={search} setSearch={setSearch}/>    
    <Filter filter={filter} setFilter={setfilter}  setSort={setSort}/> 
    <div className="todo-list"> 
    {todos 
    .filter((todo) => 
    filter === "All" 
      ? true 
      : filter === "Completed" 
      ? todo.isCompleted 
      : !todo.isCompleted 
    )
    .filter((todo) => 
    todo.text.toLowerCase().includes(search.toLowerCase())
    ) 
    .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
    .map((todo) => ( // atraves do meto map é possivel exibir cada um desses objetos
     <Todo key = {todo.id} 
     todo ={todo} 
     removeTodo={removeTodo} 
     completeTodo={completeTodo}/>
    ))}
    </div> 

    <TodoForm addTodo={addTodo}/> 

  </div>;
  }
export default App;

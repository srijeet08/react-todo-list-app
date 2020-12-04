import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFileteredTodos] = useState([]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFileteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFileteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFileteredTodos(todos);
        break;
    }
  };

  const saveToLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodos);
    }
  };

  //run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveToLocalTodos();
    console.log("hey");
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1>Srijeet's Todo List App</h1>
      </header>
      <Form
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;

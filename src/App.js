import React, { useCallback, useState, useRef } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function App() {
  //데이터가 없어서 이렇게 넣는것으로 보임
  /*
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트의 기초 알아보기', checked: true },
    { id: 2, text: '컴포넌트 스타일링 해보기', checked: true },
    { id: 3, text: '일정 관리 앱을 만들어보자', checked: false },
  ]);
  */

  const [todos, setTodos] = useState(createBulkTodo);

  function createBulkTodo() {
    const array = [];
    for (let i = 1; i < 2500; i++) {
      array.push({
        id: i,
        text: `할일 ${i}`,
        checked: false,
      });
    }
    return array;
  }

  //const nextId = useRef(4);
  const nextId = useRef(2501);


  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };

      setTodos(todos=> {todos.concat(todo)});
      nextId.current += 1;
    },
    [],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos => todos.filter((todo) => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(todos=>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;

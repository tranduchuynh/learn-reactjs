import React, { useState } from 'react';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {};

const todoLists = [
  {
    id: 1,
    title: 'Eat',
  },
  {
    id: 2,
    title: 'Sleep',
  },
  {
    id: 3,
    title: 'Code',
  },
];

function ListPage(props) {
  const [todoList, setTodoList] = useState(todoLists)

  const handleTodoFormSubmit = (values) => {
    console.log('Form submit:', values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new'
    }

    const newTodoList = [...todoList, newTodo]

    setTodoList(newTodoList)
  };

  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default ListPage;

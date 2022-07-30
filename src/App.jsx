import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import Add from "./components/AddTodo";
import List from "./components/TodoList";
import useFetchTodo  from './components/useFetchTodo';


function App() {
  const { todos, fetchTodos } = useFetchTodo()

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
        <Container maxWidth='800px'>
          <Add fetchTodos={fetchTodos} />
        </Container>
        <Container maxW="800px"  centerContent>
          <List todos={todos} fetchTodos={fetchTodos} />
        </Container>
    </>
  );
}

export default App;

import { Stack, Text } from "@chakra-ui/react";
import Todo from "./Todo";

export default function List({ todos, fetchTodos }) {

  return (
    <>
      <Text fontSize='4xl'>ToDO List</Text>
      <Stack align="center">
        {todos.map((todo) => (
          <Todo todo={todo} fetchTodos={fetchTodos} key={todo.id} />
        ))}
      </Stack>
    </>
  );
}

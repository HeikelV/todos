import { Button, Input, Spinner, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Add({ fetchTodos }) {
  const toast = useToast();
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    setLoading(true);
    await axios.post("http://localhost:5000/todo", {
      todo: todo,
      status: "Done",
    });

    setLoading(false);

    toast({
      title: "Added!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    fetchTodos();
    setTodo("");
  };

  const set = (event) => {
    setTodo(event.target.value);
  };

  return (
    <Stack align="center" direction="row" margin="5">
      <Input
        value={todo}
        placeholder="ADD TODO"
        size="lg"
        required
        onChange={set}
      />
      {loading ? (
        <Spinner />
      ) : (
        <Button colorScheme="teal" size="lg" onClick={addTodo}>
          save
        </Button>
      )}
    </Stack>
  );
}

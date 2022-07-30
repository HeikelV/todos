import {
  EditablePreview,
  Editable,
  HStack,
  Checkbox,
  Box,
  EditableTextarea,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SingleTodo({ fetchTodos, todo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const [task, setTask] = useState(todo.todo);
  const temp = todo.todo;

  const todo_status = todo.status == "Pending" ? false : true;

  const [status, setStatus] = useState(todo_status);

  const deleteTodo = async () => {
    await axios.delete("http://localhost:5000/todo/" + todo.id);

    toast({
      title: "Deleted!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    onClose();
    fetchTodos();
  };

  const set = (event) => {
    setTask(event.target.value);
  };

  const updateTodo = async (event) => {
    if (temp !== task) {
      await axios.put("http://localhost:5000/todo/" + todo.id, {
        todo: event.target.value,
      });

      toast({
        title: "Updated!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      fetchTodos();
    }
  };

  const complete = async (event) => {
    await axios.patch("http://localhost:5000/todo/" + todo.id);

    toast({
      title: "Updated!",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });

    setStatus();
    fetchTodos();
  };

  return (
    <Box borderWidth={1} p={4} borderRadius={15}>
      <HStack w="100%">
        <Checkbox
          size="lg"
          colorScheme="green"
          isChecked={todo_status}
          onChange={complete}
        ></Checkbox>
        <Editable w="md" defaultValue={task}>
          <EditablePreview />
          <EditableTextarea onChange={set} onBlur={updateTodo} />
        </Editable>
        <Badge w={20}>{todo.status}</Badge>
        <DeleteIcon color="red.500" onClick={onOpen} cursor="pointer" />
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete ToDO?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteTodo} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

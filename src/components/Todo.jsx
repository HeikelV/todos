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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import axios from "axios";

export default function SingleTodo({ fetchTodos, todo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const [task, setTask] = useState(todo.todo);

  const deleteTodo = async () => {
    const { data } = await axios.delete(
      "http://localhost:5000/todo/" + todo.id
    );
    const deleted_todo = data.data;

    console.log(deleted_todo);

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
    const { data } = await axios.put("http://localhost:5000/todo/" + todo.id, {
      todo: event.target.value,
    });
    const updated_todo = data.data;

    console.log(updated_todo);

    toast({
      title: "Updated!",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });

    fetchTodos();
  };

  return (
    <Box borderWidth={1} p={4} borderRadius={15}>
      <HStack w="100%">
        <Checkbox size="lg" colorScheme="orange"></Checkbox>
        <Editable w="md" defaultValue={task}>
          <EditablePreview />
          <EditableTextarea onChange={set} onBlur={updateTodo} />
        </Editable>
        <DeleteIcon color="red.500" onClick={onOpen} />
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

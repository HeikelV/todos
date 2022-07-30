import { useState } from "react";
import axios from "axios";

export default function useFetchTodo () {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const { data } = await axios.get(
          "http://localhost:5000/todos/"
        );
        const todos = data.data;
        setTodos(todos);
      };
    

    return {todos, fetchTodos}
}


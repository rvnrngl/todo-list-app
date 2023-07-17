import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Todo } from "./components/Todo";

import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { CardSkeleton } from "./components/CardSkeleton";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState([]);
  const [onGoing, setOnGoing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create data from firebase
  const createTodo = async (event) => {
    event.preventDefault(event);
    if (input === "") {
      alert("Enter a valid text!");
      return;
    }
    await addDoc(collection(db, "todos"), {
      task: input,
      completed: false,
    });
    setInput("");
  };

  // Read data from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      let todosArr = [];
      querySnapShot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setIsLoading(false);
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Read data from firebase where completed is false
  useEffect(() => {
    const q = query(collection(db, "todos"), where("completed", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const onGoing = [];
      querySnapShot.forEach((doc) => {
        onGoing.push(doc.data().name);
      });
      setOnGoing(onGoing);
    });
    return () => unsubscribe();
  }, []);

  //Read data from firebase where completed is true
  useEffect(() => {
    const q = query(collection(db, "todos"), where("completed", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const completed = [];
      querySnapShot.forEach((doc) => {
        completed.push(doc.data().name);
      });
      setCompleted(completed);
    });
    return () => unsubscribe();
  }, []);

  // Update data from firebase
  const handleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  // Delete data from firebase
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="min-h-screen w-screen bg-[#222831] flex justify-center items-center p-4">
      <div className=" bg-[#EEEEEE] w-full min-w-[250px] max-w-[450px] flex flex-col items-center justify-center rounded-lg overflow-hidden p-5">
        <h1 className="w-full p-5 text-black text-center text-2xl font-bold">
          Todo-List App
        </h1>
        <form
          onSubmit={createTodo}
          className="w-full border flex justify-between gap-3"
        >
          <input
            className="w-full py-3 px-3"
            onChange={(event) => setInput(event.target.value)}
            value={input}
            type="text"
            placeholder="Add todos here..."
          />
          <button className="bg-[#00ADB5] px-3">
            <AiOutlinePlus size={30} />
          </button>
        </form>
        {isLoading ? (
          <CardSkeleton cards={4} />
        ) : (
          <div className="w-full">
            <ul>
              {todos.map((todo, index) => (
                <Todo
                  key={index}
                  todo={todo}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                />
              ))}
            </ul>
            {todos.length < 1 ? (
              <p className="pt-4 text-center">You don't have todos yet!</p>
            ) : (
              <div className="w-full h-[60px] flex justify-between items-center bg-[#00ADB5] rounded-lg px-4">
                <p>Todos: {todos.length}</p>
                <div className="flex flex-col items-end">
                  <p>Ongoing: {onGoing.length}</p>
                  <p>Completed: {completed.length}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

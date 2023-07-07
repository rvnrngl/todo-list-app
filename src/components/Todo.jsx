import React from "react";
import { FaTrash } from "react-icons/fa";

const style = {
  li: `flex items-center justify-between bg-zinc-200 border rounded-lg py-3 px-4 my-3`,
  liCompleted: `flex items-center justify-between bg-[#00ADB5] border rounded-lg py-3 px-4 my-3`,
};

export const Todo = ({ todo, handleComplete, handleDelete }) => {
  return (
    <li className={todo.completed ? style.liCompleted : style.li}>
      <div
        onClick={() => handleComplete(todo)}
        className="inline-flex gap-2 items-center cursor-pointer w-full"
      >
        <input
          onChange={() => handleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          className={
            todo.completed ? "cursor-pointer line-through" : "cursor-pointer"
          }
        >
          {todo.task}
        </p>
      </div>
      <button onClick={() => handleDelete(todo.id)}>
        <FaTrash className=" text-red-800" size={20} />
      </button>
    </li>
  );
};

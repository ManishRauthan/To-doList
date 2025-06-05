import { useState } from "react";

const ToDoItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() === "") return;
    onEditTask(task.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between border-b border-gray-200 py-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mr-3"
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
          </form>
        ) : (
          <span
            className={`${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            if (isEditing) {
              handleEditSubmit({ preventDefault: () => {} });
            }
            setIsEditing(!isEditing);
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ToDoItem;

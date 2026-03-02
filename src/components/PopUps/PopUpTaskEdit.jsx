import { useState } from "react";
import axios from "axios";

export default function PopUpTaskEdit({ task, onClose, onTaskUpdated }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/tasks/${task.id}`,
        { title, description, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      onTaskUpdated(response.data);
      onClose();
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-80 p-6 rounded-md bg-white flex flex-col gap-4 shadow-xl"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        >
          <option value="todo">To do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-between">
          <button
            type="submit"
            className="py-2 px-4 bg-green-400 hover:bg-green-700 rounded-md text-white"
          >
            Update
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-gray-400 hover:bg-gray-700 rounded-md text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

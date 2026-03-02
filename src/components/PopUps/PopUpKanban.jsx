import { useState } from "react";
import axios from "axios";

export default function PopUpKanban({
  onClose,
  status,
  pictureId,
  onTaskCreated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/pictures/${pictureId}/tasks`,
        {
          title,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      onTaskCreated(response.data);
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
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        />

        <input
          type="text"
          value={status}
          readOnly
          className="outline-none p-2 border rounded-md w-full bg-gray-100"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="py-2 px-4 bg-green-400 hover:bg-green-700 rounded-md text-white"
          >
            Create
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

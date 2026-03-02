import axios from "axios";

export default function PopUpTaskDelete({ task, onClose, onTaskDeleted }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      onTaskDeleted(task.id);
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
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 p-6 rounded-md bg-white flex flex-col gap-4 shadow-xl"
      >
        <p>Are you sure you want to delete this task?</p>

        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="py-2 px-4 bg-red-400 hover:bg-red-700 rounded-md text-white"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-400 hover:bg-gray-700 rounded-md text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

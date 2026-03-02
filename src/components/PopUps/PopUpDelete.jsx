import axios from "axios";

export default function PopUpDelete({
  picture,
  setPictures,
  setPopUpDeleteOpen,
}) {
  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://127.0.0.1:8000/api/pictures/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setPictures((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-80 p-6 rounded-md bg-white flex flex-col gap-4 shadow-xl">
        <h2 className="text-lg font-bold">
          Are you sure you want to delete this picture?
        </h2>
        <div className="w-full flex justify-between">
          <button
            onClick={() => {
              handleDelete(picture.id);
              setPopUpDeleteOpen(false);
            }}
            className="py-2 px-4 rounded-md bg-green-400 transition duration-200 ease-in-out hover:bg-green-700 text-white"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setPopUpDeleteOpen(false);
            }}
            className="py-2 px-4 rounded-md bg-red-400 transition duration-200 ease-in-out hover:bg-red-700 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

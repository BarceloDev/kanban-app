import { useState } from "react";
import axios from "axios";

export default function PopUpEdit({ picture, setPopUpEditOpen, setPictures }) {
  const [title, setTitle] = useState(picture.title);
  const [description, setDescription] = useState(picture.description || "");
  const [deadline, setDeadline] = useState(picture.deadline || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://127.0.0.1:8000/api/pictures/${picture.id}`,
        {
          title,
          description,
          deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      setPictures((prev) =>
        prev.map((p) => (p.id === picture.id ? response.data : p)),
      );

      setPopUpEditOpen(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 rounded-md bg-white flex flex-col gap-4 shadow-xl"
      >
        <h2 className="text-lg font-bold">Edit Picture</h2>

        <input
          required
          type="text"
          placeholder="Title"
          className="outline-none p-2 border rounded-md w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="outline-none p-2 border rounded-md w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="outline-none p-2 border rounded-md w-full"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="w-full flex justify-between gap-2 mt-2">
          <button
            type="button"
            className="flex-1 py-2 rounded-md bg-gray-400 text-white"
            onClick={() => setPopUpEditOpen(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 rounded-md bg-green-500 text-white font-semibold"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

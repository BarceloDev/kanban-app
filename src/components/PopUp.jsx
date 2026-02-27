import { useState } from "react";
import axios from "axios";

export default function PopUp({ setPopUpOpen, setPictures }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      // 1. Primeiro pegamos o token
      const token = localStorage.getItem("token");

      // 2. Depois fazemos a requisição (usando o token já declarado)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/pictures",
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

      // 3. Se deu certo, atualizamos o estado no componente pai
      setPictures((prev) => [response.data, ...prev]);

      // 4. Fechamos o modal
      setPopUpOpen(false);
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message,
      );
      alert("Erro ao salvar. Verifique se você está logado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 rounded-md bg-white flex flex-col gap-4 shadow-xl"
      >
        <h2 className="text-lg font-bold">New Picture</h2>

        <input
          required
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="outline-none p-2 border rounded-md w-full"
        />

        <div className="w-full flex justify-between gap-2 mt-2">
          <button
            type="button"
            onClick={() => setPopUpOpen(false)}
            className="flex-1 py-2 rounded-md bg-gray-400 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 rounded-md bg-green-500 text-white font-semibold"
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

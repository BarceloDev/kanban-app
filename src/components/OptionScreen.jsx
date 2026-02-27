import { useState, useEffect } from "react";
import axios from "axios";
import PopUp from "./PopUp";
import NavBar from "./NavBar";
import Pictures from "./Pictures";

export default function OptionScreen({ navBarOpen }) {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [option, setOption] = useState("pictures");
  const [pictures, setPictures] = useState([]);

  // 1. Defina a função ANTES do useEffect para evitar problemas de referência
  async function fetchPictures() {
    try {
      const token = localStorage.getItem("token");

      // Verificação simples de segurança
      if (!token) {
        console.warn("Nenhum token encontrado no localStorage");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/mypictures", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPictures(response.data);
    } catch (error) {
      console.error(
        "Erro ao buscar fotos:",
        error.response?.data || error.message,
      );
    }
  }

  // 2. O useEffect chama a função após a montagem do componente
  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Overlay para escurecer o fundo quando o popup abrir */}
      {popUpOpen && (
        <div
          className="fixed inset-0 bg-gray-400 opacity-75 z-40"
          onClick={() => setPopUpOpen(false)}
        />
      )}

      {navBarOpen && <NavBar setOption={setOption} />}

      <main className="flex-1 h-full overflow-y-auto">
        {option === "pictures" && (
          <Pictures pictures={pictures} setPopUpOpen={setPopUpOpen} />
        )}
      </main>

      {popUpOpen && (
        <PopUp setPopUpOpen={setPopUpOpen} setPictures={setPictures} />
      )}
    </div>
  );
}

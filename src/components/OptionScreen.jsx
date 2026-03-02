import { useState, useEffect } from "react";
import axios from "axios";
import PopUp from "./PopUps/PopUp";
import PopUpEdit from "./PopUps/PopUpEdit";
import PopUpDelete from "./PopUps/PopUpDelete";
import NavBar from "./Fixeds/NavBar";
import Pictures from "./Screens/Pictures";
import Dashboards from "./Screens/Dashboards";

export default function OptionScreen({ navBarOpen }) {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpEditOpen, setPopUpEditOpen] = useState(false);
  const [popUpDeleteOpen, setPopUpDeleteOpen] = useState(false);
  const [option, setOption] = useState("pictures");
  const [pictures, setPictures] = useState([]);

  async function fetchPictures() {
    try {
      const token = localStorage.getItem("token");

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

  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Overlay para escurecer o fundo quando o popup abrir */}
      {popUpOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setPopUpOpen(false)}
        />
      )}

      {popUpEditOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setPopUpEditOpen(false)}
        />
      )}

      {popUpDeleteOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setPopUpEditOpen(false)}
        />
      )}

      {navBarOpen && <NavBar option={option} setOption={setOption} />}

      <main className="flex-1 h-full overflow-y-auto">
        {option === "pictures" && (
          <Pictures
            pictures={pictures}
            setPopUpOpen={setPopUpOpen}
            setPopUpEditOpen={setPopUpEditOpen}
            setSelectedPicture={setSelectedPicture}
            setPopUpDeleteOpen={setPopUpDeleteOpen}
          />
        )}
      </main>

      {popUpOpen && (
        <PopUp setPopUpOpen={setPopUpOpen} setPictures={setPictures} />
      )}

      {popUpEditOpen && selectedPicture && (
        <PopUpEdit
          picture={selectedPicture}
          setPopUpEditOpen={setPopUpEditOpen}
          setPictures={setPictures}
        />
      )}

      {popUpDeleteOpen && selectedPicture && (
        <PopUpDelete
          picture={selectedPicture}
          setPopUpDeleteOpen={setPopUpDeleteOpen}
          setPictures={setPictures}
        />
      )}
    </div>
  );
}

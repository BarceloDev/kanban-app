import { useState, useEffect } from "react";
import axios from "axios";

import PopUp from "./PopUps/PopUp";
import PopUpEdit from "./PopUps/PopUpEdit";
import PopUpDelete from "./PopUps/PopUpDelete";

import NavBar from "./Fixeds/NavBar";

import Pictures from "./Screens/Pictures";
import Dashboards from "./Screens/Dashboards";
import Mail from "./Screens/Mail";
import Notifications from "./Screens/Notifications";

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
      {/* overlay popup create */}
      {popUpOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setPopUpOpen(false)}
        />
      )}

      {/* overlay popup edit */}
      {popUpEditOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setPopUpEditOpen(false)}
        />
      )}

      {/* overlay popup delete */}
      {popUpDeleteOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setPopUpDeleteOpen(false)}
        />
      )}

      {/* navbar */}
      {navBarOpen && <NavBar option={option} setOption={setOption} />}

      {/* main content */}
      <main className="flex-1 h-full overflow-y-auto">
        {option === "pictures" && (
          <Pictures
            pictures={pictures}
            setPictures={setPictures}
            setPopUpOpen={setPopUpOpen}
            setPopUpEditOpen={setPopUpEditOpen}
            setPopUpDeleteOpen={setPopUpDeleteOpen}
            setSelectedPicture={setSelectedPicture}
          />
        )}

        {option === "dashboards" && <Dashboards />}

        {option === "mail" && <Mail />}

        {option === "notifications" && <Notifications />}
      </main>

      {/* popups */}

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

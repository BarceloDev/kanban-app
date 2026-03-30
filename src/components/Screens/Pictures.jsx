import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Pictures({
  pictures,
  setPictures,
  setPopUpOpen,
  setPopUpEditOpen,
  setPopUpDeleteOpen,
  setSelectedPicture,
}) {
  const [completed, setCompleted] = useState(false);

  function togglePin(picture) {
    axios
      .patch(
        `http://localhost:8000/api/pictures/${picture.id}/pin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        setPictures((prev) => {
          const updated = prev.map((p) => (p.id === picture.id ? res.data : p));

          return [...updated].sort((a, b) => {
            if (a.pinned === b.pinned) return 0;
            return a.pinned ? -1 : 1;
          });
        });
      })
      .catch((err) => console.error(err));
  }

  function toggleComplete(picture) {
    axios
      .patch(
        `http://localhost:8000/api/pictures/${picture.id}/conclude`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        setPictures((prev) => {
          const updated = prev.map((p) => (p.id === picture.id ? res.data : p));

          return [...updated].sort((a, b) => {
            if (a.pinned === b.pinned) return 0;
            return a.pinned ? -1 : 1;
          });
        });
      })
      .catch((err) => console.error(err));

    setCompleted((prev) => !prev);
  }

  return (
    <div className="w-full p-6">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pictures</h1>

        <div className="flex gap-2 justify-center items-center text-xl">
          <span className="text-base">New picture</span>
          <button
            className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors"
            onClick={() => setPopUpOpen(true)}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pictures.length > 0 ? (
          pictures.map((picture) => (
            <div
              key={picture.id}
              className="border p-4 rounded-lg shadow-sm bg-white flex justify-between"
            >
              <Link to={`/picture/${picture.id}`}>
                <div>
                  <h2 className="font-bold text-lg">{picture.title}</h2>
                  <p className="text-gray-600 mt-1">{picture.description}</p>

                  {picture.deadline && (
                    <p className="text-xs text-red-500 mt-2">
                      Deadline:{" "}
                      {new Date(picture.deadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>

              <div className="flex flex-col-reverse gap-8">
                <button
                  onClick={() => {
                    setSelectedPicture(picture);
                    setPopUpEditOpen(true);
                  }}
                >
                  <i className="bi bi-pencil-square p-2 bg-green-400 rounded-md text-white hover:bg-green-700 transition duration-200 ease-in-out"></i>
                </button>

                <button
                  onClick={() => {
                    setSelectedPicture(picture);
                    setPopUpDeleteOpen(true);
                  }}
                >
                  <i className="bi bi-trash p-2 bg-red-400 rounded-md text-white hover:bg-red-700 transition duration-200 ease-in-out"></i>
                </button>

                <button onClick={() => togglePin(picture)}>
                  <i
                    className={`bi ${picture.pinned ? "bi-pin-angle-fill" : "bi-pin-angle"}`}
                  ></i>
                </button>

                <button
                  onClick={() => {
                    toggleComplete(picture);
                  }}
                >
                  <i
                    className={`bi ${completed ? "bi-check-square-fill" : "bi-check-square"}`}
                  ></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No pictures found.</p>
        )}
      </div>
    </div>
  );
}

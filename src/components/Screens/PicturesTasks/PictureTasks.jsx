import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PopUpKanban from "../../PopUps/PopUpKanban";
import PopUpTaskEdit from "../../PopUps/PopUpTaskEdit";
import PopUpTaskDelete from "../../PopUps/PopUpTaskDelete";

export default function PictureTasks() {
  const { id } = useParams();

  const [theme, setTheme] = useState("claro");
  const [picture, setPicture] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [popUpKanbanOpen, setPopUpKanbanOpen] = useState(false);
  const [popUpTaskEditOpen, setPopUpTaskEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [popUpTaskDeleteOpen, setPopUpTaskDeleteOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pictures/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPicture(res.data);
        setTasks(res.data.tasks || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!picture) return <p>Loading...</p>;

  return (
    <div
      className={`p-6 h-screen w-screen flex flex-col gap-8 transition duration-200 ease-in-out ${
        theme === "escuro" ? "bg-blue-950" : "bg-white"
      }`}
    >
      {popUpKanbanOpen && (
        <PopUpKanban
          onClose={() => setPopUpKanbanOpen(false)}
          status={status}
          pictureId={picture.id}
          onTaskCreated={(newTask) => setTasks((prev) => [...prev, newTask])}
        />
      )}

      {popUpTaskEditOpen && selectedTask && (
        <PopUpTaskEdit
          task={selectedTask}
          onClose={() => setPopUpTaskEditOpen(false)}
          onTaskUpdated={(updatedTask) =>
            setTasks((prev) =>
              prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
            )
          }
        />
      )}

      {popUpTaskDeleteOpen && selectedTask && (
        <PopUpTaskDelete
          task={selectedTask}
          onClose={() => setPopUpTaskDeleteOpen(false)}
          onTaskDeleted={(taskId) =>
            setTasks((prev) => prev.filter((t) => t.id !== taskId))
          }
        />
      )}

      <header className="w-full border p-4 rounded-lg shadow-sm bg-white flex justify-between">
        <div className="flex gap-6">
          <Link to={"/main"}>
            <i className="bi bi-arrow-left bg-blue-500 text-white py-1 px-2 rounded-md"></i>
          </Link>
          <div>
            <h1 className="font-bold text-xl">{picture.title}</h1>
            <p>{picture.description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setTheme("claro")}>
            <i
              className={`bi ${theme === "claro" ? "bi-sun-fill" : "bi-sun"}`}
            ></i>
          </button>
          <button onClick={() => setTheme("escuro")}>
            <i
              className={`bi ${theme === "escuro" ? "bi-moon-fill" : "bi-moon"}`}
            ></i>
          </button>
        </div>
      </header>

      <div className="w-full flex gap-6">
        <KanbanColumn
          title="To do"
          columnStatus="todo"
          tasks={tasks}
          setStatus={setStatus}
          openPopup={setPopUpKanbanOpen}
          setSelectedTask={setSelectedTask}
          openEdit={setPopUpTaskEditOpen}
          openDelete={setPopUpTaskDeleteOpen}
        />

        <KanbanColumn
          title="Doing"
          columnStatus="doing"
          tasks={tasks}
          setStatus={setStatus}
          openPopup={setPopUpKanbanOpen}
          setSelectedTask={setSelectedTask}
          openEdit={setPopUpTaskEditOpen}
          openDelete={setPopUpTaskDeleteOpen}
        />

        <KanbanColumn
          title="Done"
          columnStatus="done"
          tasks={tasks}
          setStatus={setStatus}
          openPopup={setPopUpKanbanOpen}
          setSelectedTask={setSelectedTask}
          openEdit={setPopUpTaskEditOpen}
          openDelete={setPopUpTaskDeleteOpen}
        />
      </div>
    </div>
  );
}

function KanbanColumn({
  title,
  columnStatus,
  tasks,
  setStatus,
  openPopup,
  setSelectedTask,
  openEdit,
  openDelete,
}) {
  return (
    <div className="flex-1 bg-slate-200 rounded-md p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">{title}</h2>
        <button
          onClick={() => {
            setStatus(columnStatus);
            openPopup(true);
          }}
        >
          <i className="bi bi-plus-lg py-1 px-2 bg-blue-500 rounded-md text-white"></i>
        </button>
      </div>

      {tasks
        .filter((task) => task.status === columnStatus)
        .map((task) => (
          <div
            key={task.id}
            className="bg-white p-3 rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex flex-col gap-6">
              <button
                onClick={() => {
                  setSelectedTask(task);
                  openEdit(true);
                }}
              >
                <i className="bi bi-pencil-square p-2 bg-green-400 rounded-md text-white hover:bg-green-700"></i>
              </button>

              <button
                onClick={() => {
                  setSelectedTask(task);
                  openDelete(true);
                }}
              >
                <i className="bi bi-trash p-2 bg-red-400 rounded-md text-white hover:bg-red-700"></i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

import { useState, useEffect } from "react";

export default function Pictures() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlines, setDeadlines] = useState(0);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [pictures, setPictures] = useState([
    {
      title: title,
      description: description,
      deadlines: deadlines,
    },
  ]);

  function onPopUpSubmit() {
    setPictures([...Pictures]);
  }

  const popUpRegister = (
    <div className="w-screen h-screen justify-center items-center">
      <div className="w-200 p-4 absolute">
        <h1>New Picture</h1>
        <form onSubmit={onPopUpSubmit}>
          <input type="text" placeholder="Title" value={setTitle} />
          <input type="text" placeholder="Description" value={setDescription} />
          <input type="date" placeholder="Deadlines" value={setDeadlines} />
          <input type="submit" value={"Add"} />
        </form>
      </div>
    </div>
  );

  useEffect(() => {}, [pictures]);

  return (
    <div>
      <div>
        <h1>Pictures</h1>
        <div>
          <h3>New picture</h3>
          <button onClick={() => setPopUpOpen((prev) => !prev)}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
      {popUpOpen && popUpRegister}
    </div>
  );
}

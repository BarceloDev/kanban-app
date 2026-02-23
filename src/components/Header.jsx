import { useState } from "react";

export default function Header({ setOption }) {
  const [navBarOpen, setnavBarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navBar = (
    <div className="h-screen px-5 py-5 w-50 bg-slate-200 flex flex-col gap-5">
      <h3 className="font-bold text-2xl">Projects</h3>
      <ul className="ml-4 flex flex-col gap-2">
        <li>
          <button onClick={() => setOption("picture")}>Pictures</button>
        </li>
        <li>
          <button>Dashboards</button>
        </li>
        <li>
          <button>Assigned</button>
        </li>
        <li>
          <button>Fixed</button>
        </li>
        <li>
          <button>Deadlines</button>
        </li>
      </ul>
      <div className="line bg-blue-950"></div>
      <h3 className="font-bold text-2xl">Box</h3>
      <ul className="ml-4 flex flex-col gap-2">
        <li>
          <button>Notifications</button>
        </li>
        <li>
          <button>Mail</button>
        </li>
      </ul>
      <div className="line bg-blue-950"></div>
      <h3 className="font-bold text-2xl">Settings</h3>
      <ul className="ml-4 flex flex-col gap-2">
        <li>
          <button>Profile</button>
        </li>
        <li>
          <button>Preferences</button>
        </li>
      </ul>
    </div>
  );

  const profile = (
    <div className="p-5 bg-slate-200 rounded-md mr-5 h-50 flex flex-col gap-4">
      <h3 className="font-bold text-2xl">Profile</h3>
      <ul className="ml-4 flex flex-col gap-2">
        <li>
          <button>Profile</button>
        </li>
        <li>
          <button>Settings</button>
        </li>
        <li>
          <button>Preferences</button>
        </li>
      </ul>
    </div>
  );

  return (
    <header>
      <div className="bg-blue-500 text-white flex justify-between fixed w-screen p-5 z-50">
        <div className="flex gap-2">
          <button onClick={() => setnavBarOpen((prev) => !prev)}>
            <i
              className={`bi ${!navBarOpen ? "bi-list" : "bi-x-lg"} font-bold text-2xl`}
            ></i>
          </button>
          <h1 className="font-bold text-2xl">KANBAN APP</h1>
        </div>
        <button onClick={() => setProfileOpen((prev) => !prev)}>
          <i className="bi bi-person-circle font-bold text-2xl"></i>
        </button>
      </div>
      {navBarOpen && <div className="fixed left-0 top-17 z-40">{navBar}</div>}

      {profileOpen && (
        <div className="fixed top-17 right-0 z-40">{profile}</div>
      )}
    </header>
  );
}

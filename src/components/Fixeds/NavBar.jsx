export default function NavBar({ option, setOption }) {
  return (
    <nav className="p-2 w-50 h-full flex flex-col gap-4 bg-slate-100">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">PROJECTS</h3>
        <ul className="px-4 flex flex-col gap-4">
          <li>
            <button onClick={() => setOption("pictures")}>
              <i
                className={`bi ${option === "pictures" ? "bi-kanban-fill" : "bi-kanban"}`}
              ></i>
              Pictures
            </button>
          </li>
          <li>
            <button onClick={() => setOption("dashboards")}>
              <i
                className={`bi ${option === "dashboards" ? "bi-speedometer" : "bi-speedometer2"}`}
              ></i>
              Dashboards
            </button>
          </li>
          <li>
            <button onClick={() => setOption("assigned")}>
              <i
                class={`bi ${option === "assigned" ? "bi-geo-fill" : "bi-geo"}`}
              ></i>
              Assigned
            </button>
          </li>
          <li>
            <button onClick={() => setOption("deadlines")}>
              <i
                className={`bi ${option === "deadlines" ? "bi-alarm-fill" : "bi-alarm"}`}
              ></i>
              Deadlines
            </button>
          </li>
          <li>
            <button></button>
          </li>
        </ul>
      </div>
      <div className="line bg-blue-950"></div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">BOX</h3>
        <ul className="px-4 flex flex-col gap-4">
          <li>
            <button onClick={() => setOption("notifications")}>
              <i
                className={`bi ${option === "notifications" ? "bi-bell-fill" : "bi-bell"}`}
              ></i>
              Notifications
            </button>
          </li>
          <li>
            <button onClick={() => setOption("inbox")}>
              <i
                className={`bi ${option === "inbox" ? "bi-box-fill" : "bi-box"}`}
              ></i>
              Inbox
            </button>
          </li>
        </ul>
      </div>
      <div className="line bg-blue-950"></div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">SETTINGS</h3>
        <ul className="px-4 flex flex-col gap-4">
          <li>
            <button onClick={() => setOption("profile")}>
              <i
                className={`bi ${option === "profile" ? "bi-people-fill" : "bi-people"}`}
              ></i>
              Profile
            </button>
          </li>
          <li>
            <button onClick={() => setOption("settings")}>
              <i
                className={`bi ${option === "settings" ? "bi-gear-fill" : "bi-gear"}`}
              ></i>
              Settings
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

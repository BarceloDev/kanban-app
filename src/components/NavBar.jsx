export default function NavBar({ setOption }) {
  return (
    <nav className="p-2 w-50 h-full flex flex-col gap-4 bg-slate-100">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">PROJECTS</h3>
        <ul className="px-4 flex flex-col gap-4">
          <li>
            <button onClick={() => setOption("pictures")}>
              <i className={`bi bi-kanban`}></i>Pictures
            </button>
          </li>
          <li>
            <button onClick={() => setOption("dashboards")}>
              <i className={`bi bi-speedometer`}></i>Dashboards
            </button>
          </li>
          <li>
            <button onClick={() => setOption("assigned")}>
              <i class={`bi bi-geo`}></i>Assigned
            </button>
          </li>
          <li>
            <button onClick={() => setOption("deadlines")}>
              <i className={`bi bi-alarm`}></i>Deadlines
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
            <button>
              <i className={`bi bi-bell`}></i>Notifications
            </button>
          </li>
          <li>
            <button>
              <i className={`bi bi-box`}></i>Inbox
            </button>
          </li>
        </ul>
      </div>
      <div className="line bg-blue-950"></div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">SETTINGS</h3>
        <ul className="px-4 flex flex-col gap-4">
          <li>
            <button>
              <i className={`bi bi-people`}></i>Profile
            </button>
          </li>
          <li>
            <button>
              <i className={`bi bi-gear`}></i>Settings
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

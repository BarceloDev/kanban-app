export default function Header({
  navBarOpen,
  setNavBarOpen,
  setProfileNavBarOpen,
}) {
  return (
    <header className="w-screen p-4 bg-blue-500 text-xl font-bold flex justify-between">
      <div className="text-white flex gap-2">
        <button onClick={() => setNavBarOpen((prev) => !prev)}>
          <i className={`bi ${navBarOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
        <h1>KANBAN APP</h1>
      </div>

      <button onClick={() => setProfileNavBarOpen((prev) => !prev)}>
        <i
          className={`bi bi-person-circle px-2 py-1 rounded-md text-white transition duration-200 ease-in-out hover:bg-slate-100 hover:text-black`}
        ></i>
      </button>
    </header>
  );
}

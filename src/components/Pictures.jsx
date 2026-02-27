export default function Pictures({ pictures, setPopUpOpen }) {
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
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <h2 className="font-bold text-lg">{picture.title}</h2>
              <p className="text-gray-600 mt-1">{picture.description}</p>
              {picture.deadline && (
                <p className="text-xs text-red-500 mt-2">
                  Deadline: {new Date(picture.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No pictures found.</p>
        )}
      </div>
    </div>
  );
}

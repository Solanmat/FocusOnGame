import { useState } from "react";

export default function DashboardGames() {
  const [games, setGames] = useState([
    { id: 1, name: "Enchainement Maths" },
    { id: 2, name: "Enchainement Culture G" }
  ]);

  const [newGame, setNewGame] = useState("");

  const addGame = (e) => {
    e.preventDefault();

    if (!newGame.trim()) return;

    setGames([
      ...games,
      { id: Date.now(), name: newGame }
    ]);

    setNewGame("");
  };

  const deleteGame = (id) => {
    setGames(games.filter((g) => g.id !== id));
  };

  const editGame = (game) => {
    const newName = prompt("New name:", game.name);

    if (!newName) return;

    setGames(
      games.map((g) =>
        g.id === game.id ? { ...g, name: newName } : g
      )
    );
  };

  // PLAY (placeholder)
  const playGame = (game) => {
    alert("Lancement : " + game.name);
  };

  return (
    <div className="min-h-screen bg-sky-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">

        {/* CREATE */}
        <form
          onSubmit={addGame}
          className="flex gap-2 mb-6"
        >
          <input
            value={newGame}
            onChange={(e) => setNewGame(e.target.value)}
            placeholder="Nom de l'enchainement..."
            className="flex-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-sky-400 outline-none"
          />

          <button className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600">
            + Create
          </button>
        </form>

        {/* LIST */}
        <div className="space-y-3">

          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              {/* NAME */}
              <span className="font-medium text-gray-800">
                {game.name}
              </span>

              {/* ACTIONS */}
              <div className="flex gap-2">

                <button
                  onClick={() => playGame(game)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  Play
                </button>

                <button
                  onClick={() => editGame(game)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteGame(game.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
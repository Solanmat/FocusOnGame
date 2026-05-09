import { useState, useEffect } from "react";

import GameItem from "../components/GameItem";
import GameTypeModal from "../components/modals/GameTypeModal";
import { gameCreatorComponents } from "../components/gamesCreator/gameCreatorComponents";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export default function GameCreator() {

  const [games, setGames] = useState(() => {
  const saved = localStorage.getItem("games");
  return saved ? JSON.parse(saved) : [];
});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const selectedGame = games.find(g => g.id === selectedId);

  const GameComponent = selectedGame ? gameCreatorComponents[selectedGame.type] : null;


  const addGame = (type) => {
  const newGame = {
    id: Date.now(),
    name: "New Game",
    type,
    data: {}
    };

    setGames([...games, newGame]);
    setSelectedId(newGame.id);
  };

  useEffect(() => {
    if (games.length > 0 && selectedId === null) {
      setSelectedId(games[0].id);
    }
  }, [games]);

  const deleteGame = (id) => {
    setGames(games.filter(g => g.id !== id));
  };

  const updateGame = (updatedGame) => {
    setGames(prev =>
      prev.map(g =>
      g.id === updatedGame.id ? updatedGame : g
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = games.findIndex(g => g.id === active.id);
    const newIndex = games.findIndex(g => g.id === over.id);

    setGames(arrayMove(games, oldIndex, newIndex));
  };

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  return (
    <div className="p-6 space-y-6">

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-nowrap gap-2 overflow-x-auto p-3 bg-gray-100 rounded-xl items-center">

          <button
            onClick={() => setIsModalOpen(true)}
            className="min-w-[40px] h-10 bg-sky-500 text-white rounded-xl"
          >
            +
          </button>

          <SortableContext
            items={games.map(g => g.id)}
            strategy={horizontalListSortingStrategy}
          >
            {games.map(game => (
              <GameItem
                key={game.id}
                game={game}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                deleteGame={deleteGame}
              />
            ))}
          </SortableContext>

        </div>
      </DndContext>

      <div className="bg-white p-6 rounded-xl shadow min-h-[300px]">
        {GameComponent ? (
        <GameComponent
          key={selectedGame.id}
          game={selectedGame}
          onUpdate={updateGame}
        />
        ) : (
        <p>Type de jeu inconnu</p>
        )}
      </div>

      {isModalOpen && (
      <GameTypeModal
        onSelect={(type) => {
          addGame(type);
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      />
      )}

    </div>
  );
}
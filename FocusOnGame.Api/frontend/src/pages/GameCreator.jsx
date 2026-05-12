import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import GameItem from "../components/GameItem";
import GameTypeModal from "../components/modals/GameTypeModal";
import { gameCreatorComponents } from "../components/gamesCreator/gameCreatorComponents";
import { pathwayService } from "../services/PathwayService";
import { gameService } from "../services/GameService";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";

const normalizeGames = (list) => {
  return list.map((game, index) => ({
    ...game,
    order: index,
    name: `${index + 1} - ${game.type}`
  }));
};

export default function GameCreator() {
  const { idUser, namePathway } = useParams();

  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem("games");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const selectedGame = games.find((g) => g.id === selectedId);
  const GameComponent = selectedGame
    ? gameCreatorComponents[selectedGame.type]
    : null;

  const addGame = (type) => {
    const newGame = {
      id: uuidv4(),
      type,
      data: {}
    };

    const newList = normalizeGames([...games, newGame]);

    setGames(newList);
    setSelectedId(newGame.id);
  };


  useEffect(() => {
    if (games.length > 0 && selectedId === null) {
      setSelectedId(games[0].id);
    }
  }, [games]);

  const deleteGame = (id) => {
    const newList = normalizeGames(games.filter((g) => g.id !== id));
    setGames(newList);
  };

  const savePathway = async () => {
    try {
      const pathway = {
        id: uuidv4(),
        idUser: idUser,
        name: namePathway,
      };

      const pathwayResult = await pathwayService.createPathway(pathway);

      if(pathwayResult != null)
      {
        for (const game of games) {
        const gameToSave = {
          id: game.id,
          idPathway: pathwayResult.id,
          type: game.type,
          orderGame: game.order,
          data: JSON.stringify(game.data)
        };

        await gameService.createGame(gameToSave);
      }
      navigate(`/dashboardPathways/${idUser}`);
    }
    else
    {
      console.error("Pathway not created");
    }
      

    } catch (error) {
      console.error("Save pathway error:", error);
    }
  };

  const updateGame = (updatedGame) => {
    setGames((prev) =>
      prev.map((g) => (g.id === updatedGame.id ? updatedGame : g))
    );
  };


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = games.findIndex((g) => g.id === active.id);
    const newIndex = games.findIndex((g) => g.id === over.id);

    const newGames = arrayMove(games, oldIndex, newIndex);

    setGames(normalizeGames(newGames));
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
        <div className="flex items-center justify-between gap-3">

          <div className="flex flex-nowrap gap-2 overflow-x-auto p-3 bg-gray-100 rounded-xl items-center flex-1">

            <button
              onClick={() => setIsModalOpen(true)}
              className="min-w-[40px] h-10 bg-sky-500 text-white rounded-xl"
            >
              +
            </button>

            <SortableContext
              items={games.map((g) => g.id)}
              strategy={horizontalListSortingStrategy}
            >
              {games.map((game) => (
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

          <button
            onClick={() => savePathway()}
            className="px-3 h-10 bg-sky-500 text-white rounded-xl"
          >
            Save
          </button>

        </div>
      </DndContext>

      <div className="bg-white p-6 rounded-xl shadow min-h-[300px]">
        {GameComponent && selectedGame ? (
          <GameComponent
            key={selectedGame.id}
            game={selectedGame}
            onUpdate={updateGame}
          />
        ) : (
          <p>Aucun jeu sélectionné</p>
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
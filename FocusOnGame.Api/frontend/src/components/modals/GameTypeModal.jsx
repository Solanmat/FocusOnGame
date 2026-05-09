import { gameTypes } from "../../data/gameTypes";

export default function GameTypeModal({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">

        <h2 className="text-xl font-bold">
          🎮 Choisir un type de jeu
        </h2>

        <div className="grid gap-2">
          {gameTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => onSelect(type.type)}
              className="p-3 rounded-lg bg-gray-100 hover:bg-sky-500 hover:text-white"
            >
              {type.label}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 mt-2"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";

export default function MatchingGame({ game, onUpdate }) {

  const [question, setQuestion] = useState(
    game.data?.question || "Relie chaque élément à sa correspondance"
  );

  const [pairs, setPairs] = useState(
    game.data?.pairs || [
      { id: 1, left: "Chat", right: "🐱" },
      { id: 2, left: "Chien", right: "🐶" }
    ]
  );

  const sync = (newData) => {
    onUpdate({
      ...game,
      data: {
        ...game.data,
        ...newData
      }
    });
  };


  const handleQuestion = (value) => {
    setQuestion(value);
    sync({ question: value });
  };

  const addPair = () => {
    if (pairs.length >= 8) return;

    const newPairs = [
      ...pairs,
      { id: Date.now(), left: "", right: "" }
    ];

    setPairs(newPairs);
    sync({ pairs: newPairs });
  };

  const updatePair = (id, side, value) => {
    const newPairs = pairs.map((p) =>
      p.id === id ? { ...p, [side]: value } : p
    );

    setPairs(newPairs);
    sync({ pairs: newPairs });
  };

  const removePair = (id) => {
    const newPairs = pairs.filter((p) => p.id !== id);

    setPairs(newPairs);
    sync({ pairs: newPairs });
  };

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">🔗 Matching Game</h2>

      <div className="p-4 bg-gray-100 rounded-xl">
        <input
          className="w-full p-2 rounded"
          value={question}
          onChange={(e) => handleQuestion(e.target.value)}
        />
      </div>

      <div className="p-4 bg-white rounded-xl shadow space-y-3">

        <div className="flex justify-between">
          <p className="text-sm text-gray-500">
            Paires ({pairs.length}/8)
          </p>

          <button
            onClick={addPair}
            className="px-3 py-1 bg-sky-500 text-white rounded"
          >
            + Ajouter
          </button>
        </div>

        {pairs.map((pair) => (
          <div key={pair.id} className="flex gap-2">

            <input
              className="flex-1 border p-2 rounded"
              value={pair.left}
              onChange={(e) =>
                updatePair(pair.id, "left", e.target.value)
              }
            />

            <input
              className="flex-1 border p-2 rounded"
              value={pair.right}
              onChange={(e) =>
                updatePair(pair.id, "right", e.target.value)
              }
            />

            <button
              onClick={() => removePair(pair.id)}
              className="text-red-500"
            >
              ✕
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}
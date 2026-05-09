import { useState } from "react";

export default function PuzzleGame({ game, onUpdate }) {

  const [question, setQuestion] = useState(
    game.data?.question || "Reconstitue le puzzle de l’image"
  );

  const [image, setImage] = useState(game.data?.image || null);

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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
    sync({ image: url });
  };

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">🧩 Puzzle Game</h2>

      <div className="p-4 bg-gray-100 rounded-xl">
        <input
          className="w-full p-2 rounded"
          value={question}
          onChange={(e) => handleQuestion(e.target.value)}
        />
      </div>

      <div className="p-4 bg-white rounded-xl shadow">
        <input type="file" onChange={handleImage} />

        {image && (
          <img
            src={image}
            className="mt-2 max-h-60 rounded object-cover"
          />
        )}
      </div>

    </div>
  );
}
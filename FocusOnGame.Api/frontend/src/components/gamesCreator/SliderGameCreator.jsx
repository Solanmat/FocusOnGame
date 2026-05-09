import { useState } from "react";

export default function SliderGame({ game, onUpdate }) {

  const [question, setQuestion] = useState(
    game.data?.question || ""
  );

  const [image, setImage] = useState(game.data?.image || null);
  const [min, setMin] = useState(game.data?.min ?? 0);
  const [max, setMax] = useState(game.data?.max ?? 100);
  const [value, setValue] = useState(game.data?.value ?? 50);

  const syncGame = (data) => {
    onUpdate({
      ...game,
      data: {
        ...game.data,
        ...data
      }
    });
  };

  const handleQuestion = (val) => {
    setQuestion(val);
    syncGame({ question: val });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
    syncGame({ image: url });
  };

  const handleMin = (val) => {
    setMin(Number(val));
    syncGame({ min: Number(val) });
  };

  const handleMax = (val) => {
    setMax(Number(val));
    syncGame({ max: Number(val) });
  };

  const handleValue = (val) => {
    setValue(Number(val));
    syncGame({ value: Number(val) });
  };

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">🎚️ Slider Game</h2>

      <div className="p-4 bg-gray-100 rounded-xl">
        <input
          className="w-full p-2 rounded"
          value={question}
          onChange={(e) => handleQuestion(e.target.value)}
        />
      </div>

      <div className="p-4 bg-gray-100 rounded-xl">
        <input type="file" onChange={handleImage} />

        {image && (
          <img src={image} className="mt-2 max-h-40 rounded" />
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          value={min}
          onChange={(e) => handleMin(e.target.value)}
          className="border p-2 w-20"
        />

        <input
          type="number"
          value={max}
          onChange={(e) => handleMax(e.target.value)}
          className="border p-2 w-20"
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => handleValue(e.target.value)}
        className="w-full"
      />

      <p className="text-center font-bold">
        {value}
      </p>

    </div>
  );
}
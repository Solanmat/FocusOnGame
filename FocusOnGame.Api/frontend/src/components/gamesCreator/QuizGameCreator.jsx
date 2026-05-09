import { useState } from "react";

export default function QuizGame({ game, onUpdate }) {

  const [question, setQuestion] = useState(
    game.data.question || ""
  );

  const [image, setImage] = useState(
    game.data.image || ""
  );

  const [answers, setAnswers] = useState(
    game.data.answers || [
      { text: "", correct: false },
      { text: "", correct: false }
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

  const updateQuestion = (value) => {
    setQuestion(value);
    sync({ question: value });
  };

  const updateImage = (file) => {
    const url = URL.createObjectURL(file);

    setImage(url);
    sync({ image: url });
  };

  const updateAnswer = (index, value) => {
    const newAnswers = [...answers];

    newAnswers[index].text = value;

    setAnswers(newAnswers);
    sync({ answers: newAnswers });
  };

  const toggleCorrect = (index) => {
    const newAnswers = [...answers];

    newAnswers[index].correct =
      !newAnswers[index].correct;

    setAnswers(newAnswers);
    sync({ answers: newAnswers });
  };

  const addAnswer = () => {
    if (answers.length >= 6) return;

    const newAnswers = [
      ...answers,
      { text: "", correct: false }
    ];

    setAnswers(newAnswers);
    sync({ answers: newAnswers });
  };

  const removeAnswer = (index) => {
    if (answers.length <= 2) return;

    const newAnswers = answers.filter(
      (_, i) => i !== index
    );

    setAnswers(newAnswers);
    sync({ answers: newAnswers });
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        🧠 Quiz Builder
      </h2>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Question
          </p>

          <input
            value={question}
            onChange={(e) =>
              updateQuestion(e.target.value)
            }
            placeholder="Write your question..."
            className="w-full p-3 rounded-xl border text-lg"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Image
          </p>

          <input
            type="file"
            onChange={(e) =>
              updateImage(e.target.files[0])
            }
          />

          {image && (
            <img
              src={image}
              alt=""
              className="rounded-xl max-h-64 object-cover"
            />
          )}
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        {answers.map((answer, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-2xl text-white relative
              ${index === 0 && "bg-red-500"}
              ${index === 1 && "bg-blue-500"}
              ${index === 2 && "bg-yellow-500"}
              ${index === 3 && "bg-green-500"}
              ${index === 4 && "bg-purple-500"}
              ${index === 5 && "bg-pink-500"}
            `}
          >

            <button
              onClick={() => removeAnswer(index)}
              className="absolute top-2 right-2 text-sm"
            >
              ✕
            </button>

            <input
              value={answer.text}
              onChange={(e) =>
                updateAnswer(index, e.target.value)
              }
              placeholder="Answer..."
              className="w-full bg-transparent outline-none placeholder:text-white"
            />

            <label className="flex items-center gap-2 mt-4 text-sm">

              <input
                type="checkbox"
                checked={answer.correct}
                onChange={() =>
                  toggleCorrect(index)
                }
              />

              Correct answer

            </label>

          </div>
        ))}

      </div>

      {answers.length < 6 && (
        <button
          onClick={addAnswer}
          className="px-4 py-2 bg-gray-100 rounded-xl"
        >
          + Add answer
        </button>
      )}

    </div>
  );
}
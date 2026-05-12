import { useState } from "react";

export default function PathwayModal({ onCreate, onClose }) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;

    onCreate(name);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      
      <div className="bg-white p-6 rounded-xl w-80 space-y-4">

        <h2 className="text-lg font-bold">
          Create
        </h2>

        <input
          type="text"
          placeholder="Pathway name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-3 py-2 rounded-lg bg-sky-500 text-white"
          >
            Create
          </button>

        </div>

      </div>
    </div>
  );
}
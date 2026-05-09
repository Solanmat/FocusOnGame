import { useState } from "react";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function SortableItem({
  item,
  updateItem,
  removeItem
}) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border rounded-xl p-3 flex items-center gap-3"
    >

      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400"
      >
        ☰
      </div>

      <input
        value={item.label}
        onChange={(e) =>
          updateItem(item.id, e.target.value)
        }
        placeholder="Item..."
        className="flex-1 outline-none"
      />

      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500"
      >
        ✕
      </button>

    </div>
  );
}

export default function SortingGameCreator({game, onUpdate}) 
{

  const [question, setQuestion] = useState(
    game.data?.question || ""
  );

  const [image, setImage] = useState(
    game.data?.image || ""
  );

  const [items, setItems] = useState(
    game.data?.items || [
      { id: 1, label: "First item" },
      { id: 2, label: "Second item" }
    ]
  );

  const sync = (newQuestion, newItems, newImage) => {
    onUpdate({
      ...game,
      data: {
        question: newQuestion,
        items: newItems,
        image: newImage
      }
    });
  };

  const handleQuestionChange = (value) => {
    setQuestion(value);
    sync(value, items, image);
  };

  const handleImage = (file) => {
    const url = URL.createObjectURL(file);

    setImage(url);
    sync(question, items, url);
  };

  const addItem = () => {
    if (items.length >= 8) return;

    const newItems = [
      ...items,
      {
        id: Date.now(),
        label: ""
      }
    ];

    setItems(newItems);
    sync(question, newItems, image);
  };

  const updateItem = (id, value) => {
    const newItems = items.map((item) =>
      item.id === id
        ? { ...item, label: value }
        : item
    );

    setItems(newItems);
    sync(question, newItems, image);
  };

  const removeItem = (id) => {
    const newItems = items.filter(
      (item) => item.id !== id
    );

    setItems(newItems);
    sync(question, newItems, image);
  };

  const handleDragEnd = (event) => {

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (i) => i.id === active.id
    );

    const newIndex = items.findIndex(
      (i) => i.id === over.id
    );

    const newItems = arrayMove(
      items,
      oldIndex,
      newIndex
    );

    setItems(newItems);
    sync(question, newItems, image);
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        📚 Sorting Game
      </h2>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-sm text-gray-500 mb-2">
          Question
        </p>

        <input
          value={question}
          onChange={(e) =>
            handleQuestionChange(e.target.value)
          }
          placeholder="Write your question..."
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="space-y-4">

          <div className="flex justify-between items-center">

            <p className="font-semibold">
              Items
            </p>

            {items.length < 8 && (
            <button
              onClick={addItem}
              className="px-4 py-2 bg-sky-500 text-white rounded-xl">
              + Add item
            </button>
            )}

          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >

            <SortableContext
              items={items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >

              <div className="space-y-2">

                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    updateItem={updateItem}
                    removeItem={removeItem}
                  />
                ))}

              </div>

            </SortableContext>

          </DndContext>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">

          <p className="font-semibold">
            Image
          </p>

          <input
            type="file"
            onChange={(e) =>
              handleImage(e.target.files[0])
            }
          />

          {image && (
            <img
              src={image}
              alt=""
              className="rounded-xl max-h-[400px] object-cover"
            />
          )}

        </div>

      </div>

    </div>
  );
}
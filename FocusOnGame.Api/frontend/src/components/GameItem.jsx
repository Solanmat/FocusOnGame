import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function GameItem({
  game,
  selectedId,
  setSelectedId,
  deleteGame
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: game.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        min-w-[140px]
        flex-shrink-0
        px-3
        py-2
        rounded-xl
        flex
        justify-between
        items-center
        border
        cursor-pointer
        ${
          selectedId === game.id
            ? "bg-sky-500 text-white"
            : "bg-white"
        }
      `}
      onClick={() => setSelectedId(game.id)}
    >
      {/* DRAG HANDLE */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab mr-2 select-none"
      >
        ☰
      </div>

      {/* TITLE */}
      <div className="flex-1">
        {game.name}
      </div>

      {/* DELETE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteGame(game.id);
        }}
        className="ml-2"
      >
        ✕
      </button>
    </div>
  );
}
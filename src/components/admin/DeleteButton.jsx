export default function DeleteButton({ onDelete }) {
  return (
    <button
      onClick={onDelete}
      className="
        bg-red-500
        hover:bg-red-600
        text-white
        font-semibold
        px-4
        py-2
        rounded-xl
        transition-all
        duration-300
        shadow-md
      "
    >
      Eliminar
    </button>
  )
}
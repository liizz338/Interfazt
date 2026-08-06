export default function SearchBar({ busqueda, setBusqueda }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Buscar por nombre, teléfono, correo o mensaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-2xl px-5 py-4 text-[#000D38] outline-none focus:border-[#4F8CFF] shadow-md"
      />
    </div>
  )
}
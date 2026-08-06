export default function StatusBadge({ estado }) {
  const estilos = {
    pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'en proceso': 'bg-blue-100 text-blue-700 border-blue-300',
    atendido: 'bg-green-100 text-green-700 border-green-300'
  }

  return (
    <span
      className={`
        inline-block
        px-3
        py-1
        rounded-full
        text-sm
        font-bold
        border
        ${estilos[estado] || 'bg-gray-100 text-gray-700 border-gray-300'}
      `}
    >
      {estado}
    </span>
  )
}
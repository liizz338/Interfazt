export default function StatsCards({ total, pendientes, enProceso, atendidos }) {
  const cards = [
    {
      titulo: 'Total de mensajes',
      valor: total,
      color: 'text-[#000D38]'
    },
    {
      titulo: 'Pendientes',
      valor: pendientes,
      color: 'text-yellow-500'
    },
    {
      titulo: 'En proceso',
      valor: enProceso,
      color: 'text-[#4F8CFF]'
    },
    {
      titulo: 'Atendidos',
      valor: atendidos,
      color: 'text-green-500'
    }
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <p className="text-gray-500 mb-2">
            {card.titulo}
          </p>

          <h2 className={`text-4xl font-extrabold ${card.color}`}>
            {card.valor}
          </h2>
        </div>
      ))}
    </div>
  )
}
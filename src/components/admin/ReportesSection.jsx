export default function ReportesSection() {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
      <h2 className="text-3xl font-extrabold text-[#000D38] mb-4">
        Reportes
      </h2>

      <p className="text-gray-600 mb-6">
        Esta sección permitirá visualizar información importante del sistema administrativo.
      </p>

      <div className="grid md:grid-cols-4 gap-6">
        <Card titulo="Clientes activos" valor="0" />
        <Card titulo="Mensajes recibidos" valor="0" />
        <Card titulo="Pagos registrados" valor="$0" />
        <Card titulo="Paquetes activos" valor="0" />
      </div>
    </div>
  )
}

function Card({ titulo, valor }) {
  return (
    <div className="bg-[#F5F7FA] border border-gray-200 rounded-2xl p-6">
      <p className="text-gray-500">{titulo}</p>
      <h3 className="text-3xl font-extrabold text-[#000D38] mt-2">
        {valor}
      </h3>
    </div>
  )
}
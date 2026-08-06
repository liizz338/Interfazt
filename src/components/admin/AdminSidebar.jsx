import {
  FaChartPie,
  FaEnvelope,
  FaUsers,
  FaBoxOpen,
  FaWifi,
  FaCreditCard,
  FaChartLine,
  FaCog
} from 'react-icons/fa'

export default function AdminSidebar({ seccionActiva, setSeccionActiva, pendientes }) {
  const menu = [
    { id: 'dashboard', nombre: 'Dashboard', icono: <FaChartPie /> },
    { id: 'mensajes', nombre: 'Mensajes', icono: <FaEnvelope />, contador: pendientes },
    { id: 'clientes', nombre: 'Clientes', icono: <FaUsers /> },
    { id: 'paquetes', nombre: 'Paquetes', icono: <FaBoxOpen /> },
    { id: 'cobertura', nombre: 'Cobertura', icono: <FaWifi /> },
    { id: 'pagos', nombre: 'Pagos', icono: <FaCreditCard /> },
    { id: 'reportes', nombre: 'Reportes', icono: <FaChartLine /> },
    { id: 'configuracion', nombre: 'Configuración', icono: <FaCog /> }
  ]

  return (
    <aside className="flex w-72 min-h-screen bg-[#000D38] text-white p-6 flex-col justify-between shrink-0">
      <div>
        <h2 className="text-3xl font-extrabold mb-1">
          InterfazT
        </h2>

        <p className="text-gray-400 text-sm mb-10">
          Panel administrativo
        </p>

        <nav className="space-y-3">
          {menu.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSeccionActiva(item.id)}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-2xl
                transition-all duration-300 text-left
                ${
                  seccionActiva === item.id
                    ? 'bg-[#6F7277] text-white shadow-lg'
                    : 'hover:bg-[#071A55] text-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className="text-[#7DB8FF]">
                  {item.icono}
                </span>

                <span className="font-semibold">
                  {item.nombre}
                </span>
              </div>

              {item.contador > 0 && (
                <span className="bg-[#4F8CFF] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.contador}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="text-sm text-gray-400 border-t border-[#1D3475] pt-5">
        Sistema InterfazT
      </div>
    </aside>
  )
}
import {
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWifi,
  FaBolt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaStickyNote
} from 'react-icons/fa'

export default function ClienteModal({ cliente, onClose }) {
  if (!cliente) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-[#000D38]"
        >
          <FaTimes />
        </button>

        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-[#000D38]">
            {cliente.nombre}
          </h2>

          <span className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-bold ${
            cliente.estado === 'activo'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {cliente.estado}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-5 text-gray-700">

          <Info icono={<FaPhoneAlt />} titulo="Teléfono" valor={cliente.telefono} />
          <Info icono={<FaEnvelope />} titulo="Correo" valor={cliente.correo || 'Sin correo'} />
          <Info icono={<FaMapMarkerAlt />} titulo="Dirección" valor={cliente.direccion || 'Sin dirección'} />
          <Info icono={<FaWifi />} titulo="Servicio" valor={cliente.tipoServicio || 'Sin servicio'} />
          <Info icono={<FaBolt />} titulo="Velocidad" valor={cliente.velocidad || 'Sin velocidad'} />
          <Info icono={<FaMoneyBillWave />} titulo="Precio mensual" valor={`$${cliente.precio || 0}`} />
          <Info icono={<FaCalendarAlt />} titulo="Fecha instalación" valor={cliente.fechaInstalacion || 'Sin fecha'} />
          <Info icono={<FaCalendarAlt />} titulo="Próximo pago" valor={cliente.proximoPago || 'Sin fecha'} />

          <div className="md:col-span-2 bg-[#F5F7FA] rounded-2xl p-5">
            <div className="flex gap-3 text-[#000D38] font-bold mb-2">
              <FaStickyNote />
              Notas
            </div>

            <p className="text-gray-600">
              {cliente.notas || 'Sin notas registradas.'}
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

function Info({ icono, titulo, valor }) {
  return (
    <div className="bg-[#F5F7FA] rounded-2xl p-5">
      <div className="flex items-center gap-3 text-[#000D38] font-bold mb-2">
        {icono}
        {titulo}
      </div>

      <p className="text-gray-600">
        {valor}
      </p>
    </div>
  )
}
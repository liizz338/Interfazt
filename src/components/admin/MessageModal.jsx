export default function MessageModal({ mensaje, onClose }) {
  if (!mensaje) return null

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">

        <h2 className="text-3xl font-extrabold text-[#000D38] mb-6">
          Detalle del mensaje
        </h2>

        <div className="space-y-4 text-gray-700">
          <p><strong>Nombre:</strong> {mensaje.nombre}</p>
          <p><strong>Teléfono:</strong> {mensaje.telefono}</p>
          <p><strong>Correo:</strong> {mensaje.correo}</p>
          <p><strong>Estado:</strong> {mensaje.estado}</p>

          <div>
            <strong>Mensaje:</strong>
            <p className="mt-2 bg-[#F5F7FA] p-4 rounded-2xl">
              {mensaje.mensaje}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-[#000D38] hover:bg-[#6F7277] text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  )
}
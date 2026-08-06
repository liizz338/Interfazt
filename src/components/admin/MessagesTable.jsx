import StatusBadge from './StatusBadge'
import DeleteButton from './DeleteButton'

export default function MessagesTable({
  mensajes,
  formatearFecha,
  cambiarEstado,
  eliminarMensaje,
  abrirModal,
  convertirCliente
}) {
  const abrirWhatsApp = (telefono, nombre) => {
    const numero = telefono?.replace(/\D/g, '')
    const mensaje = `Hola ${nombre || ''}, te contactamos de InterfazT para dar seguimiento a tu solicitud.`

    window.open(
      `https://wa.me/52${numero}?text=${encodeURIComponent(mensaje)}`,
      '_blank'
    )
  }

  const crearLinkCorreo = (correo, nombre) => {
    const asunto = 'Seguimiento a tu solicitud - InterfazT'
    const cuerpo = `Hola ${nombre || ''}, te contactamos de InterfazT para dar seguimiento a tu solicitud.`

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(correo || '')}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-x-auto shadow-xl">
      <table className="w-full min-w-[1250px]">
        <thead className="bg-[#000D38] text-white">
          <tr>
            <th className="p-4 text-left">Fecha</th>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Teléfono</th>
            <th className="p-4 text-left">Correo</th>
            <th className="p-4 text-left">Estado</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {mensajes.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-8 text-center text-gray-500">
                No hay mensajes para mostrar.
              </td>
            </tr>
          ) : (
            mensajes.map((mensaje) => (
              <tr
                key={mensaje.id}
                className="border-t border-gray-200 hover:bg-[#F5F7FA] transition"
              >
                <td className="p-4 text-gray-600">
                  {formatearFecha(mensaje.fecha)}
                </td>

                <td className="p-4 font-semibold text-[#000D38]">
                  {mensaje.nombre}
                </td>

                <td className="p-4 text-gray-700">
                  {mensaje.telefono}
                </td>

                <td className="p-4 text-gray-700">
                  {mensaje.correo || 'Sin correo'}
                </td>

                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <StatusBadge estado={mensaje.estado} />

                    <select
                      value={mensaje.estado}
                      onChange={(e) =>
                        cambiarEstado(mensaje.id, e.target.value)
                      }
                      className="bg-[#F5F7FA] border border-gray-300 rounded-xl px-3 py-2 outline-none focus:border-[#4F8CFF] text-[#000D38]"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en proceso">En proceso</option>
                      <option value="atendido">Atendido</option>
                    </select>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => abrirModal(mensaje)}
                      className="bg-[#000D38] hover:bg-[#6F7277] text-white px-4 py-2 rounded-xl font-semibold transition"
                    >
                      Ver
                    </button>

                    <button
                      onClick={() => abrirWhatsApp(mensaje.telefono, mensaje.nombre)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                    >
                      WhatsApp
                    </button>

                    <a
                      href={crearLinkCorreo(mensaje.correo, mensaje.nombre)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#4F8CFF] hover:bg-[#6F7277] text-white px-4 py-2 rounded-xl font-semibold transition"
                    >
                      Correo
                    </a>

                    <button
                      onClick={() => convertirCliente(mensaje)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                    >
                      Convertir
                    </button>

                    <DeleteButton onDelete={() => eliminarMensaje(mensaje.id)} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
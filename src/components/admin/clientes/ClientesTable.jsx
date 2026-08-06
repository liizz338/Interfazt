import {
  FaEdit,
  FaTrash,
  FaEye,
  FaWhatsapp
} from 'react-icons/fa'

export default function ClientesTable({
  clientes,
  editarCliente,
  eliminarCliente,
  cambiarEstado,
  abrirModal
}) {

  const abrirWhatsApp = (telefono, nombre) => {

    if (!telefono) return

    const numero = telefono.replace(/\D/g, '')

    const mensaje =
      `Hola ${nombre}, te saluda InterfazT.`

    window.open(
      `https://wa.me/52${numero}?text=${encodeURIComponent(mensaje)}`,
      '_blank'
    )

  }

  return (

    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      <div className="px-8 py-6 border-b">

        <h2 className="text-2xl font-bold text-[#000D38]">
          Clientes registrados
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#000D38] text-white">

            <tr>

              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Plan
              </th>

              <th className="p-4 text-left">
                Próximo pago
              </th>

              <th className="p-4 text-left">
                Saldo
              </th>

              <th className="p-4 text-left">
                Estado
              </th>

              <th className="p-4 text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {clientes.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No hay clientes registrados.
                </td>

              </tr>

            ) : (

              clientes.map(cliente => (

                <tr
                  key={cliente.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4">

                    <p className="font-bold text-[#000D38]">
                      {cliente.nombre}
                    </p>

                    <p className="text-sm text-gray-500">
                      {cliente.telefono}
                    </p>

                  </td>

                  <td className="p-4">

                    <p className="font-semibold">
                      {cliente.plan}
                    </p>

                    <p className="text-sm text-gray-500">
                      {cliente.velocidad}
                    </p>

                  </td>

                  <td className="p-4">

                    {cliente.proximoPago || '--'}

                  </td>

                  <td className="p-4 font-semibold">

                    ${cliente.saldoPendiente || 0}

                  </td>

                  <td className="p-4">

                    <select
                      value={cliente.estado}
                      onChange={(e)=>
                        cambiarEstado(
                          cliente.id,
                          e.target.value
                        )
                      }
                      className="border rounded-xl px-3 py-2"
                    >

                      <option value="activo">
                        Activo
                      </option>

                      <option value="suspendido">
                        Suspendido
                      </option>

                    </select>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          abrirModal(cliente)
                        }
                        className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-xl"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() =>
                          editarCliente(cliente)
                        }
                        className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          abrirWhatsApp(
                            cliente.telefono,
                            cliente.nombre
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl"
                      >
                        <FaWhatsapp />
                      </button>

                      <button
                        onClick={() =>
                          eliminarCliente(cliente.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}
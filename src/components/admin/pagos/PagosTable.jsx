import { useMemo, useState } from 'react'
import {
  FaTrash,
  FaSearch,
  FaEye
} from 'react-icons/fa'

export default function PagosTable({
  pagos,
  eliminarPago,
  abrirModal
}) {

  const [busqueda, setBusqueda] = useState('')
  const [filtroMetodo, setFiltroMetodo] = useState('Todos')

  const pagosFiltrados = useMemo(() => {

    return pagos.filter((pago) => {

      const coincideBusqueda =
        pago.cliente?.toLowerCase().includes(busqueda.toLowerCase()) ||
        pago.plan?.toLowerCase().includes(busqueda.toLowerCase()) ||
        pago.folio?.toLowerCase().includes(busqueda.toLowerCase())

      const coincideMetodo =
        filtroMetodo === 'Todos'
          ? true
          : pago.metodo === filtroMetodo

      return coincideBusqueda && coincideMetodo

    })

  }, [pagos, busqueda, filtroMetodo])

  const totalCobrado = pagosFiltrados.reduce(
    (total, pago) => total + Number(pago.monto || 0),
    0
  )

  return (

    <div className="bg-white rounded-3xl shadow-xl border border-gray-200">

      <div className="p-8 border-b border-gray-200">

        <div className="flex flex-col lg:flex-row gap-4 justify-between">

          <div className="relative w-full">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar cliente, plan o folio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 outline-none focus:border-[#4F8CFF]"
            />

          </div>

          <select
            value={filtroMetodo}
            onChange={(e) => setFiltroMetodo(e.target.value)}
            className="border border-gray-300 rounded-2xl px-5"
          >

            <option>Todos</option>
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
            <option>SPEI</option>

          </select>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-[#000D38] text-white">

            <tr>

              <th className="p-4 text-left">Folio</th>
              <th className="p-4 text-left">Cliente</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Monto</th>
              <th className="p-4 text-left">Método</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Acciones</th>

            </tr>

          </thead>

          <tbody>

            {pagosFiltrados.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500"
                >

                  No existen pagos registrados.

                </td>

              </tr>

            ) : (

              pagosFiltrados.map((pago) => (

                <tr
                  key={pago.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {pago.folio}
                  </td>

                  <td className="p-4">
                    {pago.cliente}
                  </td>

                  <td className="p-4">
                    {pago.plan}
                  </td>

                  <td className="p-4 font-bold text-green-700">
                    ${Number(pago.monto).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {pago.metodo}
                  </td>

                  <td className="p-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                      {pago.estado}

                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => abrirModal(pago)}
                        className="bg-[#4F8CFF] hover:bg-[#366ed8] text-white p-3 rounded-xl"
                      >

                        <FaEye />

                      </button>

                      <button
                        onClick={() => eliminarPago(pago.id)}
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

      <div className="flex justify-end p-8 border-t">

        <div className="text-right">

          <p className="text-gray-500">

            Total Cobrado

          </p>

          <h2 className="text-4xl font-extrabold text-green-700">

            ${totalCobrado.toLocaleString()}

          </h2>

        </div>

      </div>

    </div>

  )

}
import {
  FaMoneyBillWave,
  FaCalendarCheck,
  FaUsers,
  FaCreditCard
} from 'react-icons/fa'

export default function PagosStats({ pagos }) {

  const totalCobrado = pagos.reduce(
    (total, pago) => total + Number(pago.monto || 0),
    0
  )

  const pagosHoy = pagos.filter((pago) => {
    if (!pago.fechaPago) return false

    const fecha = pago.fechaPago.toDate
      ? pago.fechaPago.toDate()
      : new Date(pago.fechaPago)

    const hoy = new Date()

    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    )
  })

  const cobradoHoy = pagosHoy.reduce(
    (total, pago) => total + Number(pago.monto || 0),
    0
  )

  const efectivo = pagos.filter(
    (p) => p.metodo === 'Efectivo'
  ).length

  const transferencia = pagos.filter(
    (p) => p.metodo === 'Transferencia'
  ).length

  return (

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500">
              Total Cobrado
            </p>

            <h2 className="text-4xl font-extrabold text-[#000D38] mt-2">
              ${totalCobrado.toLocaleString()}
            </h2>

          </div>

          <FaMoneyBillWave
            className="text-5xl text-green-500"
          />

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500">
              Cobrado Hoy
            </p>

            <h2 className="text-4xl font-extrabold text-[#000D38] mt-2">
              ${cobradoHoy.toLocaleString()}
            </h2>

          </div>

          <FaCalendarCheck
            className="text-5xl text-blue-500"
          />

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500">
              Pagos Registrados
            </p>

            <h2 className="text-4xl font-extrabold text-[#000D38] mt-2">
              {pagos.length}
            </h2>

          </div>

          <FaUsers
            className="text-5xl text-purple-500"
          />

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500">
              Transferencias
            </p>

            <h2 className="text-4xl font-extrabold text-[#000D38] mt-2">
              {transferencia}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Efectivo: {efectivo}
            </p>

          </div>

          <FaCreditCard
            className="text-5xl text-orange-500"
          />

        </div>

      </div>

    </div>

  )

}
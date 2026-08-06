import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaMoneyBillWave
} from 'react-icons/fa'

import { motion } from 'framer-motion'

export default function ClienteStats({ clientes }) {

  const total = clientes.length

  const activos = clientes.filter(
    cliente => cliente.estado === 'activo'
  ).length

  const suspendidos = clientes.filter(
    cliente => cliente.estado === 'suspendido'
  ).length

  const ingresos = clientes.reduce(
    (total, cliente) =>
      total + Number(cliente.precio || 0),
    0
  )

  const cards = [
    {
      titulo: 'Clientes',
      valor: total,
      icono: <FaUsers />,
      color: 'bg-blue-600'
    },
    {
      titulo: 'Activos',
      valor: activos,
      icono: <FaUserCheck />,
      color: 'bg-green-600'
    },
    {
      titulo: 'Suspendidos',
      valor: suspendidos,
      icono: <FaUserSlash />,
      color: 'bg-red-500'
    },
    {
      titulo: 'Ingreso mensual',
      valor: `$${ingresos.toLocaleString()}`,
      icono: <FaMoneyBillWave />,
      color: 'bg-[#000D38]'
    }
  ]

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card, index) => (

        <motion.div
          key={card.titulo}
          initial={{
            opacity: 0,
            y: 25
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: index * .08
          }}
          className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">

                {card.titulo}

              </p>

              <h2 className="text-3xl font-extrabold text-[#000D38] mt-2">

                {card.valor}

              </h2>

            </div>

            <div
              className={`${card.color} h-14 w-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
            >
              {card.icono}
            </div>

          </div>

        </motion.div>

      ))}

    </div>

  )

}
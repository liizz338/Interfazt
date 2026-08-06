import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../../../firebase/config'

export default function PagoForm({ actualizarPagos }) {

  const [clientes, setClientes] = useState([])

  const [form, setForm] = useState({
    clienteId: '',
    cliente: '',
    plan: '',
    monto: '',
    metodo: 'Efectivo',
    observaciones: ''
  })

  useEffect(() => {
    obtenerClientes()
  }, [])

  const obtenerClientes = async () => {
    const snapshot = await getDocs(collection(db, 'clientes'))

    const datos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setClientes(datos)
  }

  const seleccionarCliente = (id) => {

    const cliente = clientes.find(c => c.id === id)

    if (!cliente) return

    setForm({
      ...form,
      clienteId: cliente.id,
      cliente: cliente.nombre,
      plan: cliente.plan,
      monto: cliente.precio || '',
      metodo: 'Efectivo',
      observaciones: ''
    })
  }

  const handleChange = (e) => {

    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const registrarPago = async (e) => {

    e.preventDefault()

    if (!form.clienteId) {
      alert('Selecciona un cliente.')
      return
    }

    const folio =
      'INT-' +
      Date.now().toString().slice(-6)

    await addDoc(collection(db, 'pagos'), {

      ...form,

      folio,

      estado: 'Pagado',

      fechaPago: new Date(),

      fechaRegistro: serverTimestamp()

    })

    alert('Pago registrado correctamente.')

    setForm({
      clienteId: '',
      cliente: '',
      plan: '',
      monto: '',
      metodo: 'Efectivo',
      observaciones: ''
    })

    actualizarPagos()

  }

  return (

    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

      <h2 className="text-3xl font-extrabold text-[#000D38] mb-8">

        Registrar Pago

      </h2>

      <form
        onSubmit={registrarPago}
        className="grid md:grid-cols-2 gap-5"
      >

        <select
          value={form.clienteId}
          onChange={(e) => seleccionarCliente(e.target.value)}
          className="border rounded-2xl px-5 py-4"
          required
        >

          <option value="">
            Seleccionar cliente
          </option>

          {clientes.map(cliente => (

            <option
              key={cliente.id}
              value={cliente.id}
            >

              {cliente.nombre}

            </option>

          ))}

        </select>

        <input
          value={form.plan}
          readOnly
          placeholder="Plan"
          className="border rounded-2xl px-5 py-4 bg-gray-100"
        />

        <input
          value={form.monto}
          readOnly
          placeholder="Monto"
          className="border rounded-2xl px-5 py-4 bg-gray-100"
        />

        <select
          name="metodo"
          value={form.metodo}
          onChange={handleChange}
          className="border rounded-2xl px-5 py-4"
        >

          <option>Efectivo</option>
          <option>Transferencia</option>
          <option>Tarjeta</option>
          <option>SPEI</option>

        </select>

        <textarea
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          placeholder="Observaciones..."
          rows="4"
          className="border rounded-2xl px-5 py-4 md:col-span-2"
        />

        <button
          className="md:col-span-2 bg-[#000D38] hover:bg-[#6F7277] text-white py-4 rounded-2xl font-bold transition"
        >

          Registrar Pago

        </button>

      </form>

    </div>

  )

}
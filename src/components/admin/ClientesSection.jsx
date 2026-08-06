import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../../firebase/config'

export default function ClientesSection() {
  const [clientes, setClientes] = useState([])
  const [paquetes, setPaquetes] = useState([])
  const [editandoId, setEditandoId] = useState(null)

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    plan: '',
    planId: '',
    precio: '',
    velocidad: '',
    tipoServicio: '',
    estado: 'activo'
  })

  const obtenerClientes = async () => {
    const q = query(collection(db, 'clientes'), orderBy('fecha', 'desc'))
    const snapshot = await getDocs(q)

    const datos = snapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data()
    }))

    setClientes(datos)
  }

  const obtenerPaquetes = async () => {
    const q = query(collection(db, 'paquetes'), orderBy('fecha', 'desc'))
    const snapshot = await getDocs(q)

    const datos = snapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data()
    }))

    setPaquetes(datos.filter((paquete) => paquete.estado === 'activo'))
  }

  useEffect(() => {
    obtenerClientes()
    obtenerPaquetes()
  }, [])

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      telefono: '',
      correo: '',
      direccion: '',
      plan: '',
      planId: '',
      precio: '',
      velocidad: '',
      tipoServicio: '',
      estado: 'activo'
    })

    setEditandoId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'planId') {
      const paqueteSeleccionado = paquetes.find((paquete) => paquete.id === value)

      setForm({
        ...form,
        planId: value,
        plan: paqueteSeleccionado?.nombre || '',
        precio: paqueteSeleccionado?.precio || '',
        velocidad: paqueteSeleccionado?.velocidad || '',
        tipoServicio: paqueteSeleccionado?.tipo || ''
      })

      return
    }

    setForm({
      ...form,
      [name]: value
    })
  }

  const existeTelefono = async (telefono) => {
    const consulta = query(
      collection(db, 'clientes'),
      where('telefono', '==', telefono)
    )

    const resultado = await getDocs(consulta)

    return resultado.docs.some((docu) => docu.id !== editandoId)
  }

  const existeCorreo = async (correo) => {
    if (!correo) return false

    const consulta = query(
      collection(db, 'clientes'),
      where('correo', '==', correo)
    )

    const resultado = await getDocs(consulta)

    return resultado.docs.some((docu) => docu.id !== editandoId)
  }

  const guardarCliente = async (e) => {
    e.preventDefault()

    const telefonoLimpio = form.telefono.trim()
    const correoLimpio = form.correo.trim().toLowerCase()

    if (await existeTelefono(telefonoLimpio)) {
      alert('Este teléfono ya está registrado en otro cliente.')
      return
    }

    if (await existeCorreo(correoLimpio)) {
      alert('Este correo ya está registrado en otro cliente.')
      return
    }

    const datosCliente = {
      nombre: form.nombre.trim(),
      telefono: telefonoLimpio,
      correo: correoLimpio,
      direccion: form.direccion.trim(),
      plan: form.plan,
      planId: form.planId,
      precio: form.precio,
      velocidad: form.velocidad,
      tipoServicio: form.tipoServicio,
      estado: form.estado,
      actualizado: serverTimestamp()
    }

    if (editandoId) {
      await updateDoc(doc(db, 'clientes', editandoId), datosCliente)
      alert('Cliente actualizado correctamente.')
    } else {
      await addDoc(collection(db, 'clientes'), {
        ...datosCliente,
        fecha: serverTimestamp()
      })

      alert('Cliente guardado correctamente.')
    }

    limpiarFormulario()
    obtenerClientes()
  }

  const editarCliente = (cliente) => {
    setEditandoId(cliente.id)

    setForm({
      nombre: cliente.nombre || '',
      telefono: cliente.telefono || '',
      correo: cliente.correo || '',
      direccion: cliente.direccion || '',
      plan: cliente.plan || '',
      planId: cliente.planId || '',
      precio: cliente.precio || '',
      velocidad: cliente.velocidad || '',
      tipoServicio: cliente.tipoServicio || '',
      estado: cliente.estado || 'activo'
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const eliminarCliente = async (id) => {
    const confirmar = confirm('¿Seguro que quieres eliminar este cliente?')
    if (!confirmar) return

    await deleteDoc(doc(db, 'clientes', id))
    obtenerClientes()
  }

  const cambiarEstado = async (id, estado) => {
    await updateDoc(doc(db, 'clientes', id), { estado })
    obtenerClientes()
  }

  return (
    <div className="space-y-8">

      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-extrabold text-[#000D38] mb-6">
          {editandoId ? 'Editar cliente' : 'Registrar cliente'}
        </h2>

        <form onSubmit={guardarCliente} className="grid md:grid-cols-2 gap-5">
          <input
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <input
            name="correo"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <input
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <select
            name="planId"
            value={form.planId}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          >
            <option value="">Selecciona un paquete</option>

            {paquetes.map((paquete) => (
              <option key={paquete.id} value={paquete.id}>
                {paquete.nombre} - {paquete.velocidad} - ${paquete.precio}
              </option>
            ))}
          </select>

          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          >
            <option value="activo">Activo</option>
            <option value="suspendido">Suspendido</option>
          </select>

          {form.plan && (
            <div className="md:col-span-2 bg-[#F5F7FA] border border-gray-200 rounded-2xl p-5">
              <p className="font-bold text-[#000D38] mb-2">
                Información del paquete seleccionado
              </p>

              <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                <p><strong>Plan:</strong> {form.plan}</p>
                <p><strong>Velocidad:</strong> {form.velocidad}</p>
                <p><strong>Precio:</strong> ${form.precio}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-[#000D38] hover:bg-[#6F7277] text-white py-4 rounded-2xl font-bold transition"
          >
            {editandoId ? 'Guardar cambios' : 'Guardar cliente'}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className="bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-2xl font-bold transition"
            >
              Cancelar edición
            </button>
          )}
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-x-auto shadow-xl">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-[#000D38] text-white">
            <tr>
              <th className="p-4 text-left">Cliente</th>
              <th className="p-4 text-left">Teléfono</th>
              <th className="p-4 text-left">Correo</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Precio</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No hay clientes registrados.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="border-t border-gray-200 hover:bg-[#F5F7FA]"
                >
                  <td className="p-4 font-semibold text-[#000D38]">
                    {cliente.nombre}
                  </td>

                  <td className="p-4 text-gray-700">
                    {cliente.telefono}
                  </td>

                  <td className="p-4 text-gray-700">
                    {cliente.correo || 'Sin correo'}
                  </td>

                  <td className="p-4 text-gray-700">
                    {cliente.plan || 'Sin plan'}
                    <br />
                    <span className="text-sm text-gray-500">
                      {cliente.velocidad || ''}
                    </span>
                  </td>

                  <td className="p-4 text-gray-700">
                    {cliente.precio ? `$${cliente.precio}` : 'Sin precio'}
                  </td>

                  <td className="p-4">
                    <select
                      value={cliente.estado || 'activo'}
                      onChange={(e) => cambiarEstado(cliente.id, e.target.value)}
                      className="border border-gray-300 rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="activo">Activo</option>
                      <option value="suspendido">Suspendido</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => editarCliente(cliente)}
                        className="bg-[#4F8CFF] hover:bg-[#6F7277] text-white px-4 py-2 rounded-xl font-semibold transition"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarCliente(cliente.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                      >
                        Eliminar
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
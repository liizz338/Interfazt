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
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../../firebase/config'

export default function PaquetesSection() {
  const [paquetes, setPaquetes] = useState([])
  const [editandoId, setEditandoId] = useState(null)

  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    velocidad: '',
    precio: '',
    ift: '',
    estado: 'activo'
  })

  const obtenerPaquetes = async () => {
    const q = query(collection(db, 'paquetes'), orderBy('fecha', 'desc'))
    const snapshot = await getDocs(q)

    const datos = snapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data()
    }))

    setPaquetes(datos)
  }

  useEffect(() => {
    obtenerPaquetes()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      tipo: '',
      velocidad: '',
      precio: '',
      ift: '',
      estado: 'activo'
    })

    setEditandoId(null)
  }

  const guardarPaquete = async (e) => {
    e.preventDefault()

    const datosPaquete = {
      nombre: form.nombre.trim(),
      tipo: form.tipo,
      velocidad: form.velocidad.trim(),
      precio: form.precio.trim(),
      ift: form.ift.trim(),
      estado: form.estado,
      actualizado: serverTimestamp()
    }

    if (editandoId) {
      await updateDoc(doc(db, 'paquetes', editandoId), datosPaquete)
      alert('Paquete actualizado correctamente.')
    } else {
      await addDoc(collection(db, 'paquetes'), {
        ...datosPaquete,
        fecha: serverTimestamp()
      })

      alert('Paquete guardado correctamente.')
    }

    limpiarFormulario()
    obtenerPaquetes()
  }

  const editarPaquete = (paquete) => {
    setEditandoId(paquete.id)

    setForm({
      nombre: paquete.nombre || '',
      tipo: paquete.tipo || '',
      velocidad: paquete.velocidad || '',
      precio: paquete.precio || '',
      ift: paquete.ift || '',
      estado: paquete.estado || 'activo'
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const eliminarPaquete = async (id) => {
    const confirmar = confirm('¿Seguro que quieres eliminar este paquete?')
    if (!confirmar) return

    await deleteDoc(doc(db, 'paquetes', id))
    obtenerPaquetes()
  }

  const cambiarEstado = async (id, estado) => {
    await updateDoc(doc(db, 'paquetes', id), { estado })
    obtenerPaquetes()
  }

  return (
    <div className="space-y-8">

      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-extrabold text-[#000D38] mb-6">
          {editandoId ? 'Editar paquete' : 'Registrar paquete'}
        </h2>

        <form onSubmit={guardarPaquete} className="grid md:grid-cols-2 gap-5">
          <input
            name="nombre"
            placeholder="Nombre del paquete"
            value={form.nombre}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          >
            <option value="">Tipo de servicio</option>
            <option value="Fibra Óptica">Fibra Óptica</option>
            <option value="Wireless WISP">Wireless WISP</option>
          </select>

          <input
            name="velocidad"
            placeholder="Velocidad, ejemplo: 25 Mbps simétrico"
            value={form.velocidad}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <input
            name="precio"
            placeholder="Precio mensual, ejemplo: 350"
            value={form.precio}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <input
            name="ift"
            placeholder="Número de inscripción IFT"
            value={form.ift}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          />

          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <button
            type="submit"
            className="bg-[#000D38] hover:bg-[#6F7277] text-white py-4 rounded-2xl font-bold transition"
          >
            {editandoId ? 'Guardar cambios' : 'Guardar paquete'}
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
        <table className="w-full min-w-[1000px]">
          <thead className="bg-[#000D38] text-white">
            <tr>
              <th className="p-4 text-left">Paquete</th>
              <th className="p-4 text-left">Tipo</th>
              <th className="p-4 text-left">Velocidad</th>
              <th className="p-4 text-left">Precio</th>
              <th className="p-4 text-left">IFT</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {paquetes.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No hay paquetes registrados.
                </td>
              </tr>
            ) : (
              paquetes.map((paquete) => (
                <tr
                  key={paquete.id}
                  className="border-t border-gray-200 hover:bg-[#F5F7FA]"
                >
                  <td className="p-4 font-semibold text-[#000D38]">
                    {paquete.nombre}
                  </td>

                  <td className="p-4 text-gray-700">
                    {paquete.tipo}
                  </td>

                  <td className="p-4 text-gray-700">
                    {paquete.velocidad}
                  </td>

                  <td className="p-4 text-gray-700">
                    ${paquete.precio}
                  </td>

                  <td className="p-4 text-gray-700">
                    {paquete.ift || 'Sin registro'}
                  </td>

                  <td className="p-4">
                    <select
                      value={paquete.estado || 'activo'}
                      onChange={(e) => cambiarEstado(paquete.id, e.target.value)}
                      className="border border-gray-300 rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => editarPaquete(paquete)}
                        className="bg-[#4F8CFF] hover:bg-[#6F7277] text-white px-4 py-2 rounded-xl font-semibold transition"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarPaquete(paquete.id)}
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
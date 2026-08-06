import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore'

import { db } from '../../../firebase/config'

export default function ClienteForm({
  paquetes,
  actualizarClientes,
  editandoCliente,
  cancelarEdicion
}) {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    planId: '',
    plan: '',
    precio: '',
    velocidad: '',
    tipoServicio: '',
    fechaInstalacion: '',
    diaPago: '',
    notas: '',
    estado: 'activo'
  })

  useEffect(() => {
    if (editandoCliente) {
      setForm({
        nombre: editandoCliente.nombre || '',
        telefono: editandoCliente.telefono || '',
        correo: editandoCliente.correo || '',
        direccion: editandoCliente.direccion || '',
        planId: editandoCliente.planId || '',
        plan: editandoCliente.plan || '',
        precio: editandoCliente.precio || '',
        velocidad: editandoCliente.velocidad || '',
        tipoServicio: editandoCliente.tipoServicio || '',
        fechaInstalacion: editandoCliente.fechaInstalacion || '',
        diaPago: editandoCliente.diaPago || '',
        notas: editandoCliente.notas || '',
        estado: editandoCliente.estado || 'activo'
      })
    }
  }, [editandoCliente])

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      telefono: '',
      correo: '',
      direccion: '',
      planId: '',
      plan: '',
      precio: '',
      velocidad: '',
      tipoServicio: '',
      fechaInstalacion: '',
      diaPago: '',
      notas: '',
      estado: 'activo'
    })

    cancelarEdicion()
  }

  const calcularProximoPago = () => {
    if (!form.fechaInstalacion || !form.diaPago) return ''

    const fecha = new Date(form.fechaInstalacion)
    fecha.setMonth(fecha.getMonth() + 1)
    fecha.setDate(Number(form.diaPago))

    return fecha.toISOString().split('T')[0]
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'planId') {
      const paquete = paquetes.find((p) => p.id === value)

      setForm({
        ...form,
        planId: value,
        plan: paquete?.nombre || '',
        precio: paquete?.precio || '',
        velocidad: paquete?.velocidad || '',
        tipoServicio: paquete?.tipo || ''
      })

      return
    }

    setForm({
      ...form,
      [name]: value
    })
  }

  const existeDato = async (campo, valor) => {
    if (!valor) return false

    const q = query(
      collection(db, 'clientes'),
      where(campo, '==', valor)
    )

    const snapshot = await getDocs(q)

    return snapshot.docs.some(
      (documento) => documento.id !== editandoCliente?.id
    )
  }

  const guardarCliente = async (e) => {
    e.preventDefault()

    const telefono = form.telefono.trim()
    const correo = form.correo.trim().toLowerCase()

    if (await existeDato('telefono', telefono)) {
      toast.error('Ese teléfono ya está registrado')
      return
    }

    if (await existeDato('correo', correo)) {
      toast.error('Ese correo ya está registrado')
      return
    }

    const datosCliente = {
      nombre: form.nombre.trim(),
      telefono,
      correo,
      direccion: form.direccion.trim(),
      planId: form.planId,
      plan: form.plan,
      precio: Number(form.precio),
      velocidad: form.velocidad,
      tipoServicio: form.tipoServicio,
      fechaInstalacion: form.fechaInstalacion,
      diaPago: Number(form.diaPago),
      proximoPago: calcularProximoPago(),
      saldoPendiente: Number(form.precio),
      notas: form.notas,
      estado: form.estado,
      actualizado: serverTimestamp()
    }

    if (editandoCliente) {
      await updateDoc(
        doc(db, 'clientes', editandoCliente.id),
        datosCliente
      )

      toast.success('Cliente actualizado correctamente')
    } else {
      await addDoc(collection(db, 'clientes'), {
        ...datosCliente,
        ultimoPago: null,
        fecha: serverTimestamp()
      })

      toast.success('Cliente registrado correctamente')
    }

    limpiarFormulario()
    actualizarClientes()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-extrabold text-[#000D38] mb-6">
        {editandoCliente ? 'Editar cliente' : 'Registrar cliente'}
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

        <input
          type="date"
          name="fechaInstalacion"
          value={form.fechaInstalacion}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
        />

        <input
          type="number"
          min="1"
          max="31"
          name="diaPago"
          placeholder="Día de pago"
          value={form.diaPago}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
        />

        {form.plan && (
          <div className="md:col-span-2 bg-[#F5F7FA] border border-gray-200 rounded-2xl p-5">
            <p className="font-bold text-[#000D38] mb-2">
              Información del paquete
            </p>

            <div className="grid md:grid-cols-4 gap-4 text-gray-700">
              <p><strong>Plan:</strong> {form.plan}</p>
              <p><strong>Velocidad:</strong> {form.velocidad}</p>
              <p><strong>Precio:</strong> ${form.precio}</p>
              <p><strong>Próximo pago:</strong> {calcularProximoPago() || 'Sin fecha'}</p>
            </div>
          </div>
        )}

        <textarea
          name="notas"
          placeholder="Notas del cliente..."
          value={form.notas}
          onChange={handleChange}
          rows="4"
          className="md:col-span-2 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#4F8CFF]"
        />

        <button
          type="submit"
          className="bg-[#000D38] hover:bg-[#6F7277] text-white py-4 rounded-2xl font-bold transition"
        >
          {editandoCliente ? 'Guardar cambios' : 'Guardar cliente'}
        </button>

        {editandoCliente && (
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
  )
}
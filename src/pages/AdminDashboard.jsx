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

import { db } from '../firebase/config'

import AdminSidebar from '../components/admin/AdminSidebar'
import AdminNavbar from '../components/admin/AdminNavbar'
import StatsCards from '../components/admin/StatsCards'
import SearchBar from '../components/admin/SearchBar'
import MessagesTable from '../components/admin/MessagesTable'
import MessageModal from '../components/admin/MessageModal'
import ClientesSection from '../components/admin/clientes/ClientesSection'
import PaquetesSection from '../components/admin/PaquetesSection'
import PagosSection from '../components/admin/PagosSection'
import CoberturaSection from '../components/admin/CoberturaSection'
import ReportesSection from '../components/admin/ReportesSection'
import ConfiguracionSection from '../components/admin/ConfiguracionSection'

export default function AdminDashboard() {
  const [mensajes, setMensajes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null)
  const [seccionActiva, setSeccionActiva] = useState('dashboard')

  const obtenerMensajes = async () => {
    const q = query(collection(db, 'mensajes'), orderBy('fecha', 'desc'))
    const querySnapshot = await getDocs(q)

    const datos = querySnapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data()
    }))

    setMensajes(datos)
  }

  useEffect(() => {
    obtenerMensajes()
  }, [])

  const eliminarMensaje = async (id) => {
    const confirmar = confirm('¿Seguro que quieres eliminar este mensaje?')
    if (!confirmar) return

    await deleteDoc(doc(db, 'mensajes', id))
    obtenerMensajes()
  }

  const cambiarEstado = async (id, nuevoEstado) => {
    await updateDoc(doc(db, 'mensajes', id), {
      estado: nuevoEstado
    })

    obtenerMensajes()
  }

  const convertirCliente = async (mensaje) => {
    const confirmar = confirm('¿Quieres convertir este mensaje en cliente?')
    if (!confirmar) return

    const telefono = mensaje.telefono || ''
    const correo = mensaje.correo || ''

    const consultaTelefono = query(
      collection(db, 'clientes'),
      where('telefono', '==', telefono)
    )

    const resultadoTelefono = await getDocs(consultaTelefono)

    if (!resultadoTelefono.empty) {
      alert('Este cliente ya existe. No se puede crear de nuevo.')
      return
    }

    if (correo) {
      const consultaCorreo = query(
        collection(db, 'clientes'),
        where('correo', '==', correo)
      )

      const resultadoCorreo = await getDocs(consultaCorreo)

      if (!resultadoCorreo.empty) {
        alert('Este cliente ya existe con ese correo. No se puede crear de nuevo.')
        return
      }
    }

    await addDoc(collection(db, 'clientes'), {
      nombre: mensaje.nombre || '',
      telefono,
      correo,
      direccion: '',
      plan: '',
      estado: 'activo',
      origen: 'mensaje',
      mensajeOriginal: mensaje.mensaje || '',
      fecha: serverTimestamp()
    })

    await updateDoc(doc(db, 'mensajes', mensaje.id), {
      estado: 'atendido'
    })

    obtenerMensajes()
    alert('Cliente creado correctamente.')
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'

    const date = fecha.toDate()

    return date.toLocaleString('es-MX', {
      dateStyle: 'short',
      timeStyle: 'short'
    })
  }

  const mensajesFiltrados = mensajes.filter((mensaje) =>
    mensaje.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    mensaje.telefono?.toLowerCase().includes(busqueda.toLowerCase()) ||
    mensaje.correo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    mensaje.mensaje?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const total = mensajes.length
  const pendientes = mensajes.filter((m) => m.estado === 'pendiente').length
  const enProceso = mensajes.filter((m) => m.estado === 'en proceso').length
  const atendidos = mensajes.filter((m) => m.estado === 'atendido').length

  const renderMensajes = () => (
    <>
      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <MessagesTable
        mensajes={mensajesFiltrados}
        formatearFecha={formatearFecha}
        cambiarEstado={cambiarEstado}
        eliminarMensaje={eliminarMensaje}
        abrirModal={setMensajeSeleccionado}
        convertirCliente={convertirCliente}
      />
    </>
  )

  const renderSeccion = () => {
    if (seccionActiva === 'dashboard') {
      return (
        <>
          <StatsCards
            total={total}
            pendientes={pendientes}
            enProceso={enProceso}
            atendidos={atendidos}
          />

          {renderMensajes()}
        </>
      )
    }

    if (seccionActiva === 'mensajes') {
      return renderMensajes()
    }

    if (seccionActiva === 'clientes') {
      return <ClientesSection />
    }

    if (seccionActiva === 'paquetes') {
      return <PaquetesSection />
    }

    if (seccionActiva === 'pagos') {
  return <PagosSection />
}
 if (seccionActiva === 'cobertura') {
  return <CoberturaSection />
}

if (seccionActiva === 'reportes') {
  return <ReportesSection />
}

if (seccionActiva === 'configuracion') {
  return <ConfiguracionSection />
}

    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
        <h2 className="text-3xl font-extrabold text-[#000D38] mb-4">
          {seccionActiva.charAt(0).toUpperCase() + seccionActiva.slice(1)}
        </h2>

        <p className="text-gray-600">
          Esta sección se desarrollará en el siguiente paso.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#000D38] flex">
      <AdminSidebar
        seccionActiva={seccionActiva}
        setSeccionActiva={setSeccionActiva}
        pendientes={pendientes}
      />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <AdminNavbar />

          {renderSeccion()}

          <MessageModal
            mensaje={mensajeSeleccionado}
            onClose={() => setMensajeSeleccionado(null)}
          />
        </div>
      </main>
    </div>
  )
}
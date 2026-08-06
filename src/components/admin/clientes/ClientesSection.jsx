import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'

import { db } from '../../../firebase/config'

import ClienteForm from './ClienteForm'
import ClientesTable from './ClientesTable'
import ClienteStats from './ClienteStats'
import ClienteModal from './ClienteModal'

export default function ClientesSection() {

  const [clientes, setClientes] = useState([])
  const [paquetes, setPaquetes] = useState([])

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)

  const [editandoCliente, setEditandoCliente] = useState(null)

  const obtenerClientes = async () => {

    const q = query(
      collection(db, 'clientes'),
      orderBy('fecha', 'desc')
    )

    const snapshot = await getDocs(q)

    const datos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setClientes(datos)

  }

  const obtenerPaquetes = async () => {

    const q = query(
      collection(db, 'paquetes'),
      orderBy('fecha', 'desc')
    )

    const snapshot = await getDocs(q)

    const datos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setPaquetes(
      datos.filter(
        paquete => paquete.estado === 'activo'
      )
    )

  }

  useEffect(() => {

    obtenerClientes()

    obtenerPaquetes()

  }, [])

  const eliminarCliente = async (id) => {

    const confirmar = confirm(
      '¿Eliminar este cliente?'
    )

    if (!confirmar) return

    await deleteDoc(
      doc(db, 'clientes', id)
    )

    obtenerClientes()

  }

  const cambiarEstado = async (
    id,
    estado
  ) => {

    await updateDoc(
      doc(db, 'clientes', id),
      {
        estado
      }
    )

    obtenerClientes()

  }

  return (

    <div className="space-y-8">

      <ClienteStats
        clientes={clientes}
      />

      <ClienteForm

        paquetes={paquetes}

        actualizarClientes={
          obtenerClientes
        }

        editandoCliente={
          editandoCliente
        }

        cancelarEdicion={() =>
          setEditandoCliente(null)
        }

      />

      <ClientesTable

        clientes={clientes}

        editarCliente={
          setEditandoCliente
        }

        eliminarCliente={
          eliminarCliente
        }

        cambiarEstado={
          cambiarEstado
        }

        abrirModal={
          setClienteSeleccionado
        }

      />

      <ClienteModal

        cliente={clienteSeleccionado}

        onClose={() =>
          setClienteSeleccionado(null)
        }

      />

    </div>

  )

}
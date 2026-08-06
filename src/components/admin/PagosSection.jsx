import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore'

import { db } from '../../firebase/config'

import PagoForm from './pagos/PagoForm'
import PagosTable from './pagos/PagosTable'
import PagosStats from './pagos/PagosStats'

export default function PagosSection() {

  const [pagos, setPagos] = useState([])
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null)

  const obtenerPagos = async () => {

    const q = query(
      collection(db, 'pagos'),
      orderBy('fechaRegistro', 'desc')
    )

    const snapshot = await getDocs(q)

    const datos = snapshot.docs.map(docu => ({
      id: docu.id,
      ...docu.data()
    }))

    setPagos(datos)

  }

  useEffect(() => {
    obtenerPagos()
  }, [])

  const eliminarPago = async (id) => {

    const confirmar = confirm(
      '¿Deseas eliminar este pago?'
    )

    if (!confirmar) return

    await deleteDoc(doc(db, 'pagos', id))

    obtenerPagos()

  }

  return (

    <div className="space-y-8">

      <PagosStats pagos={pagos} />

      <PagoForm
        actualizarPagos={obtenerPagos}
      />

      <PagosTable
        pagos={pagos}
        eliminarPago={eliminarPago}
        abrirModal={setPagoSeleccionado}
      />

    </div>

  )

}
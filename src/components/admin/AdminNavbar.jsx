import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/config'

export default function AdminNavbar() {
  const navigate = useNavigate()

  const cerrarSesion = async () => {
    await signOut(auth)
    navigate('/admin')
  }

  return (
    <div className="bg-[#000D38] text-white rounded-3xl p-6 mb-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Panel Administrador
        </h1>

        <p className="text-gray-300 mt-2">
          Gestión de solicitudes enviadas desde la página web.
        </p>
      </div>

      <button
        onClick={cerrarSesion}
        className="bg-[#6F7277] hover:bg-[#8A8D91] px-6 py-3 rounded-xl font-bold transition"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
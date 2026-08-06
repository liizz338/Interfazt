import { Link } from 'react-router-dom'
import logo from '../assets/Gemini_Generated_Image_w25fvrw25fvrw25f-removebg-preview.png'

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[9999]">

      <nav className="bg-[#000D38]/90 backdrop-blur-xl border-b border-[#1C2A5A]">

        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

          {/* LOGO */}
          <img
            src={logo}
            alt="InterfazT Logo"
            className="h-16 w-auto"
          />

          {/* MENÚ */}
          <div className="hidden lg:flex items-center gap-6 text-white font-medium">

            <a href="#inicio" className="hover:text-[#7DB8FF] transition">
              Inicio
            </a>

            <a href="#nosotros" className="hover:text-[#7DB8FF] transition">
              Nosotros
            </a>

            <a href="#soluciones" className="hover:text-[#7DB8FF] transition">
              Soluciones
            </a>

            <a href="#soporte" className="hover:text-[#7DB8FF] transition">
              Soporte Técnico
            </a>

            <a href="#cobertura" className="hover:text-[#7DB8FF] transition">
              Cobertura
            </a>

            <a href="#precios" className="hover:text-[#7DB8FF] transition">
              Precios
            </a>

            <a href="#servicios" className="hover:text-[#7DB8FF] transition">
              Servicios
            </a>

            <a href="#contacto" className="hover:text-[#7DB8FF] transition">
              Contacto
            </a>

            <a href="#legales" className="hover:text-[#7DB8FF] transition">
              Legales
            </a>

            <Link
              to="/admin"
              className="bg-[#6F7277] hover:bg-[#8A8D91] px-5 py-3 rounded-xl text-white font-semibold transition"
            >
              Iniciar sesión
            </Link>

          </div>

        </div>

      </nav>

    </header>
  )
}
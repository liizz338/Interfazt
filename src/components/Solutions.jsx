import {
  FaWifi,
  FaNetworkWired,
  FaTools,
  FaBuilding,
  FaBolt,
  FaMapMarkedAlt
} from 'react-icons/fa'

export default function Solutions() {
  const soluciones = [
    {
      icono: <FaWifi />,
      titulo: 'Internet Inalámbrico',
      texto: 'Conectividad para zonas donde otros proveedores no llegan.'
    },
    {
      icono: <FaNetworkWired />,
      titulo: 'Fibra Óptica',
      texto: 'Internet de alta velocidad y baja latencia para hogares y negocios.'
    },
    {
      icono: <FaTools />,
      titulo: 'Soporte Técnico',
      texto: 'Atención remota y presencial para resolver fallas y dudas.'
    },
    {
      icono: <FaBuilding />,
      titulo: 'Empresas',
      texto: 'Soluciones de conectividad para oficinas, comercios y negocios.'
    },
    {
      icono: <FaBolt />,
      titulo: 'Instalación Rápida',
      texto: 'Servicio de instalación en 24 horas para comenzar a navegar.'
    },
    {
      icono: <FaMapMarkedAlt />,
      titulo: 'Cobertura Regional',
      texto: 'Presencia en Hidalgo.'
    }
  ]

  return (
    <section
      id="soluciones"
      className="py-32 px-6 bg-[#000D38]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-6 text-white">
            Soluciones para tu
            <span className="text-[#7DB8FF]"> conectividad</span>
          </h2>

          <p className="text-gray-300 text-xl max-w-4xl mx-auto">
            Brindamos soluciones tecnológicas para hogares,
            negocios y comunidades con acceso limitado a las
            telecomunicaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {soluciones.map((item, index) => (
            <div
              key={index}
              className="
                bg-[#071A55]
                border
                border-[#1D3475]
                rounded-3xl
                p-8
                hover:bg-[#6F7277]
                hover:border-[#6F7277]
                hover:-translate-y-2
                hover:shadow-xl
                hover:shadow-black/40
                transition-all
                duration-300
                group
              "
            >
              <div className="text-[#7DB8FF] text-4xl mb-6 group-hover:text-white transition">
                {item.icono}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">
                {item.titulo}
              </h3>

              <p className="text-gray-300 leading-relaxed group-hover:text-white transition">
                {item.texto}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
import torre from '../assets/torre.png'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function Coverage() {
  const zonas = [
    {
      nombre: 'Tulancingo, Hgo.',
      link: 'https://maps.google.com/?q=Tulancingo+Hidalgo'
    },
    {
      nombre: 'Acaxochitlán, Hgo.',
      link: 'https://maps.google.com/?q=Acaxochitlan+Hidalgo'
    },
    {
      nombre: 'Metepec, Hgo.',
      link: 'https://maps.google.com/?q=Metepec+Hidalgo'
    },
    {
      nombre: 'Zempoala, Hgo.',
      link: 'https://maps.google.com/?q=Zempoala+Hidalgo'
    },
    {
      nombre: 'Santa María Atipac, Mex.',
      link: 'https://maps.google.com/?q=Santa+Maria+Atipac+Mexico'
    },
    {
      nombre: 'Singuilucan, Hgo.',
      link: 'https://maps.google.com/?q=Singuilucan+Hidalgo'
    },
    {
      nombre: 'Agua Blanca, Hgo.',
      link: 'https://maps.google.com/?q=Agua+Blanca+Hidalgo'
    },
    {
      nombre: 'Huasca, Hgo.',
      link: 'https://maps.google.com/?q=Huasca+Hidalgo'
    }
  ]

  const ZonaCard = ({ zona }) => (
    <a
      href={zona.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        block
        bg-white
        border
        border-gray-200
        rounded-3xl
        p-6
        text-center
        shadow-lg
        hover:bg-[#000D38]
        hover:border-[#000D38]
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      <div className="flex flex-col items-center gap-4">

        <div
          className="
            w-14
            h-14
            rounded-full
            border
            border-[#4F8CFF]
            flex
            items-center
            justify-center
            group-hover:bg-white/20
            transition
          "
        >
          <FaMapMarkerAlt className="text-[#4F8CFF] group-hover:text-white text-2xl transition" />
        </div>

        <h3 className="text-xl font-semibold text-[#000D38] group-hover:text-white transition">
          {zona.nombre}
        </h3>

      </div>
    </a>
  )

  return (
    <section
      id="cobertura"
      className="py-32 px-6 bg-[#F5F7FA]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-6 text-[#000D38]">
            Zonas de
            <span className="text-[#4F8CFF]"> Cobertura</span>
          </h2>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Conectamos comunidades mediante internet inalámbrico
            y fibra óptica de alta calidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-center mb-20">

          <div className="space-y-6">
            {zonas.slice(0, 4).map((zona, index) => (
              <ZonaCard key={index} zona={zona} />
            ))}
          </div>

          <div className="flex justify-center">
            <img
              src={torre}
              alt="Torre de señal"
              className="
                w-[320px]
                md:w-[380px]
                object-contain
                drop-shadow-[0_0_30px_rgba(79,140,255,0.45)]
                animate-pulse
              "
            />
          </div>

          <div className="space-y-6">
            {zonas.slice(4, 8).map((zona, index) => (
              <ZonaCard key={index} zona={zona} />
            ))}
          </div>

        </div>

        <div className="flex justify-center">
          <a
            href="https://wa.me/527751301262"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#000D38]
              hover:bg-[#6F7277]
              transition-all
              duration-300
              px-10
              py-5
              rounded-2xl
              text-lg
              font-bold
              text-white
              shadow-lg
              hover:shadow-gray-500/40
            "
          >
            Consultar Cobertura en mi Zona
          </a>
        </div>

      </div>
    </section>
  )
}
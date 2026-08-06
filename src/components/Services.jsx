import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

import foto1 from '../assets/foto1.png'
import foto2 from '../assets/foto2.png'
import foto3 from '../assets/foto3.png'
import foto4 from '../assets/foto4.png'

export default function Services() {
  const servicios = [
    'Internet fijo inalámbrico a clientes con poca disponibilidad a las telecomunicaciones.',
    'Internet fijo por fibra óptica de alta velocidad.',
    'Soporte técnico vía remota y presencial.',
    'Asesoría técnica en redes.'
  ]

  return (
    <section
      id="servicios"
      className="py-32 px-6 bg-[#000D38]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6 text-white">
            Nuestros
            <span className="text-[#7DB8FF]">
              {" "}Servicios
            </span>
          </h2>

          <p className="text-gray-300 text-xl">
            Soluciones profesionales en conectividad y redes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-6">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="
                  bg-[#071A55]
                  border
                  border-[#1D3475]
                  rounded-2xl
                  p-6
                  hover:bg-[#6F7277]
                  hover:border-[#6F7277]
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-black/40
                  transition-all
                  duration-300
                  group
                "
              >
                <div className="flex gap-4 items-start">

                  <div className="w-3 h-3 bg-[#7DB8FF] rounded-full mt-2 group-hover:bg-white transition"></div>

                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition">
                    {servicio}
                  </p>

                </div>
              </div>
            ))}
          </div>

          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              loop={true}
              spaceBetween={20}
            >
              <SwiperSlide>
                <img
                  src={foto1}
                  alt="Servicio de internet inalámbrico"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src={foto2}
                  alt="Instalación de fibra óptica"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src={foto3}
                  alt="Soporte técnico"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src={foto4}
                  alt="Asesoría en redes"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                />
              </SwiperSlide>
            </Swiper>
          </div>

        </div>

      </div>
    </section>
  )
}
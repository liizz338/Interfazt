import Navbar from '../components/Navbar'
import About from '../components/About'
import Support from '../components/Support'
import Coverage from '../components/Coverage'
import Pricing from '../components/pricing'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Solutions from '../components/Solutions'

import logo from '../assets/Gemini_Generated_Image_w25fvrw25fvrw25f-removebg-preview.png'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/navigation'

import hero1 from '../assets/Hero1.png'
import hero2 from '../assets/Hero2.png'
import hero3 from '../assets/Hero3.png'
import hero5 from '../assets/Hero4.png'

export default function Home() {
  const slides = [
    {
      image: hero1,
      subtitulo: 'COBERTURA INALÁMBRICA',
      titulo: 'Internet para comunidades',
      destacado: 'sin límites',
      texto: 'Conectamos zonas rurales y urbanas con tecnología inalámbrica de alto rendimiento.'
    },
    {
      image: hero2,
      subtitulo: 'FIBRA ÓPTICA',
      titulo: 'Velocidad y estabilidad',
      destacado: 'para tu hogar',
      texto: 'Navega, trabaja y disfruta de streaming con una conexión rápida y confiable.'
    },
    {
      image: hero3,
      subtitulo: '',
      titulo: 'Atención profesional',
      destacado: '24/7',
      texto: 'Nuestro equipo especializado está listo para ayudarte cuando lo necesites.'
    },
    {
      image: hero5,
      subtitulo: '',
      titulo: 'Presencia en',
      destacado: ' Hidalgo',
      texto: 'Tulancingo, Singuilucan, Huasca, Zempoala, Metepec, Acaxochitlán y más.'
    }
  ]

  return (
    <div className="bg-[#F5F7FA] text-gray-800 overflow-hidden">
      <Navbar />

      <section
        id="inicio"
        className="relative min-h-screen overflow-hidden bg-[#000D38]"
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          loop
          navigation
          autoplay={{
            delay: 10000,
            disableOnInteraction: false
          }}
          speed={900}
          className="min-h-screen"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative min-h-screen flex items-center justify-center px-6 pt-32">

                <img
                  src={slide.image}
                  alt={slide.titulo}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <motion.div
                  key={slide.titulo}
                  initial={{ opacity: 0, y: 45 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 max-w-5xl mx-auto text-center text-white"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-6"
                  >
                    <img
                      src={logo}
                      alt="InterfazT"
                      className="w-48 md:w-64 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-white font-bold tracking-[0.35em] uppercase mb-6 text-sm md:text-base"
                  >
                    {slide.subtitulo}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8"
                  >
                    {slide.titulo}
                    <span className="text-[#7DB8FF]">
                      {' '}{slide.destacado}
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-gray-100 text-base md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto"
                  >
                    {slide.texto}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                  >
                    <a
                      href="#precios"
                      className="
                        bg-[#000D38]
                        hover:bg-[#02248A]
                        px-8
                        py-4
                        rounded-xl
                        text-lg
                        font-bold
                        text-white
                        shadow-xl
                        transition
                      "
                    >
                      Contratar Ahora
                    </a>

                    <a
                      href="#cobertura"
                      className="
                        border
                        border-white/70
                        hover:bg-white
                        hover:text-[#000D38]
                        px-8
                        py-4
                        rounded-xl
                        text-lg
                        font-bold
                        text-white
                        transition
                      "
                    >
                      Ver Cobertura
                    </a>
                  </motion.div>
                </motion.div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <About />
      <Solutions />
      <Support />
      <Services />
      <Coverage />
      <Pricing />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
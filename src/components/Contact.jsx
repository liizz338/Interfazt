import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

export default function Contact() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: ''
  })

  const [enviando, setEnviando] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)

    try {
      await addDoc(collection(db, 'mensajes'), {
        nombre: form.nombre.trim(),
        telefono: form.telefono.trim(),
        correo: form.correo.trim(),
        mensaje: form.mensaje.trim(),
        estado: 'pendiente',
        fecha: serverTimestamp()
      })

      alert('Mensaje enviado correctamente')

      setForm({
        nombre: '',
        telefono: '',
        correo: '',
        mensaje: ''
      })
    } catch (error) {
      console.error('Error Firebase:', error)
      alert(`Error al enviar el mensaje: ${error.message}`)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="contacto" className="py-32 px-6 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold mb-6 text-[#000D38]">
            Contáctanos
          </h2>

          <p className="text-gray-600 text-xl mb-12">
            Tienes alguna duda, contáctanos para resolver cualquier inquietud.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <div className="bg-[#000D38] border border-[#233B73] rounded-3xl p-10 shadow-xl">
            <h3 className="text-3xl font-bold mb-8 text-white">
              Envíanos un mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
                disabled={enviando}
                className="w-full bg-[#071A55] border border-[#233B73] rounded-2xl px-5 py-4 outline-none text-white placeholder-gray-400 focus:border-[#4F8CFF] transition"
              />

              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
                required
                disabled={enviando}
                className="w-full bg-[#071A55] border border-[#233B73] rounded-2xl px-5 py-4 outline-none text-white placeholder-gray-400 focus:border-[#4F8CFF] transition"
              />

              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={handleChange}
                required
                disabled={enviando}
                className="w-full bg-[#071A55] border border-[#233B73] rounded-2xl px-5 py-4 outline-none text-white placeholder-gray-400 focus:border-[#4F8CFF] transition"
              />

              <textarea
                name="mensaje"
                placeholder="Escribe tu mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                disabled={enviando}
                rows="5"
                className="w-full bg-[#071A55] border border-[#233B73] rounded-2xl px-5 py-4 outline-none text-white placeholder-gray-400 focus:border-[#4F8CFF] transition resize-none"
              />

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-[#6F7277] hover:bg-[#8A8D91] disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 py-4 rounded-2xl font-bold text-white shadow-lg"
              >
                {enviando ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>

          <div className="bg-[#000D38] border border-[#233B73] rounded-3xl overflow-hidden shadow-xl">
            <iframe
              title="Ubicación InterfazT"
              src="https://www.google.com/maps?q=Av.%20Revolucion%2020,%20Los%20Pinos,%2043780%20Singuilucan,%20Hgo.&output=embed"
              className="w-full h-[650px]"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
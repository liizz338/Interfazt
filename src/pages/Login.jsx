import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Gemini_Generated_Image_w25fvrw25fvrw25f-removebg-preview.png'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    setError('')

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate('/dashboard')

    } catch (error) {

      setError('Correo o contraseña incorrectos')

    }

  }

  return (

    <div className="relative min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">

      {/* Glow rojo */}
      <div className="absolute w-[500px] h-[500px] bg-red-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">

        <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-10 shadow-2xl">

          {/* Logo */}
          <div className="flex justify-center mb-8">

            <img
              src={logo}
              alt="InterfazT"
              className="w-52 object-contain"
            />

          </div>

          {/* Título */}
          <h1 className="text-center text-4xl font-extrabold text-white mb-8">

            Panel Administrador

          </h1>

          {/* Error */}
          {error && (

            <div className="bg-red-500/20 border border-red-500 rounded-xl p-3 mb-5">

              <p className="text-red-300 text-center">
                {error}
              </p>

            </div>

          )}

          {/* Formulario */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                bg-black
                border
                border-zinc-700
                rounded-2xl
                px-5
                py-4
                text-white
                outline-none
                focus:border-red-500
              "
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                bg-black
                border
                border-zinc-700
                rounded-2xl
                px-5
                py-4
                text-white
                outline-none
                focus:border-red-500
              "
            />

            <button
              type="submit"
              className="
                w-full
                bg-zinc-700
                hover:bg-red-600
                text-white
                py-4
                rounded-2xl
                font-bold
                transition
              "
            >

              Iniciar sesión

            </button>

            <a
              href="/"
              className="
                block
                text-center
                mt-2
                py-2
                rounded-xl
                border
                border-zinc-700
                text-zinc-300
                text-sm
                hover:bg-zinc-700
                hover:border-red-500
                hover:text-white
                transition
              "
            >

              ← Volver al inicio

            </a>

          </form>

        </div>

      </div>

    </div>

  )
}
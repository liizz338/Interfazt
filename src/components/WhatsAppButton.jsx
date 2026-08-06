import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/527751450957?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20servicios."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="
        fixed
        bottom-5
        right-5
        z-50
        flex
        items-center
        gap-2
        rounded-full
        bg-[#25D366]
        px-5
        py-3
        text-white
        shadow-xl
        shadow-green-500/30
        transition-all
        duration-300
        hover:scale-110
        hover:bg-[#1ebe5d]
      "
    >
      <FaWhatsapp className="text-2xl" />

      <span className="hidden lg:block font-semibold text-sm">
        WhatsApp
      </span>
    </a>
  )
}
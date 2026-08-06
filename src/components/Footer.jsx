import logo from '../assets/Gemini_Generated_Image_w25fvrw25fvrw25f-removebg-preview.png'

export default function Footer() {
  return (
    <footer className="bg-[#000D38] border-t border-[#1D3475] px-6 py-12">
      <div className="max-w-7xl mx-auto text-center">

        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="InterfazT"
            className="w-48 object-contain"
          />
        </div>

        <p className="text-gray-300 mb-4">
          Internet, fibra óptica, redes inalámbricas y soporte técnico.
        </p>

        <p className="text-gray-300">
          Av. Revolución 20, Los Pinos, 43780 Singuilucan, Hgo.
        </p>

        <p className="text-gray-300 mt-2">
          WhatsApp: <span className="text-[#7DB8FF] font-semibold">775 145 0957</span>
          {' '}|{' '}
          Tel: <span className="text-[#7DB8FF] font-semibold">775 208 3573</span>
        </p>

        <p className="text-[#7DB8FF] mt-2">
          interf4zt@gmail.com
        </p>

        <div className="w-24 h-[2px] bg-[#4F8CFF] mx-auto my-8 rounded-full"></div>

        <div className="text-gray-500 text-sm">
          © 2026 InterfazT. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}
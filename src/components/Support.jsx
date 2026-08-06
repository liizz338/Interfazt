export default function Support() {
  return (
    <section
      id="soporte"
      className="py-32 px-6 bg-[#F5F7FA]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-6 text-[#000D38]">
            Soporte
            <span className="text-[#4F8CFF]">
              {" "}Técnico
            </span>
          </h2>

          <p className="text-gray-600 text-xl">
            Atención profesional para nuestros clientes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg hover:bg-[#000D38] hover:border-[#000D38] transition-all duration-300 group">

            <h3 className="text-3xl font-bold text-[#000D38] group-hover:text-white mb-8 transition">
              Atención y Soporte
            </h3>

            <div className="space-y-6 text-lg">

              <div>
                <h4 className="font-bold text-[#000D38] group-hover:text-white mb-2 transition">
                  Horarios de oficina
                </h4>

                <p className="text-gray-600 group-hover:text-gray-200 transition">
                  Lunes a sábado de 9:00 am a 8:00 pm
                </p>
              </div>

              <hr className="border-gray-300 group-hover:border-gray-500 transition" />

              <div>
                <h4 className="font-bold text-[#000D38] group-hover:text-white mb-2 transition">
                  Dirección
                </h4>

                <p className="text-gray-600 group-hover:text-gray-200 transition">
                  Avenida Revolución 20A,
                  Colonia Centro,
                  Singuilucan, Hidalgo,
                  C.P. 43780
                </p>
              </div>

              <hr className="border-gray-300 group-hover:border-gray-500 transition" />

              <div>
                <h4 className="font-bold text-[#000D38] group-hover:text-white mb-2 transition">
                  Contrata Ahora
                </h4>

                <p className="text-gray-600 group-hover:text-gray-200 transition">
                  Servicio de instalación en 24 horas para navegar ilimitadamente.
                </p>
              </div>

              <hr className="border-gray-300 group-hover:border-gray-500 transition" />

              <div>
                <h4 className="font-bold text-[#000D38] group-hover:text-white mb-2 transition">
                  Soporte Telefónico 24/7
                </h4>

                <p className="text-gray-600 group-hover:text-gray-200 transition">
                  Soporte telefónico a dudas y fallas de nuestros servicios.
                </p>

                <p className="mt-3 text-[#4F8CFF] group-hover:text-white font-semibold transition">
                  WhatsApp/Cel: 775 145 09 57
                </p>

                <p className="text-[#4F8CFF] group-hover:text-white font-semibold transition">
                  Fijo: 775 208 3573
                </p>
              </div>

            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg hover:bg-[#000D38] hover:border-[#000D38] transition-all duration-300 group">

            <h3 className="text-3xl font-bold text-[#000D38] group-hover:text-white mb-8 transition">
              Formas de Pago
            </h3>

            <div className="space-y-8">

              <div>
                <h4 className="text-[#000D38] group-hover:text-white font-bold text-xl mb-3 transition">
                  Santander
                </h4>

                <p className="text-gray-600 group-hover:text-gray-200 mb-3 transition">
                  Transferencia SPEI desde cualquier banco o depósitos en efectivo.
                </p>

                <p className="text-[#4F8CFF] group-hover:text-white transition">
                  Número de Tarjeta:
                </p>

                <p className="font-bold text-[#000D38] group-hover:text-white text-xl transition">
                  5579 0890 0274 0135
                </p>
              </div>

              <hr className="border-gray-300 group-hover:border-gray-500 transition" />

              <div>
                <h4 className="text-[#000D38] group-hover:text-white font-bold text-xl mb-3 transition">
                  BBVA
                </h4>

                <p className="text-gray-600 group-hover:text-gray-200 transition">
                  Transferencias bancarias.
                </p>

                <p className="mt-3 text-[#4F8CFF] group-hover:text-white transition">
                  Número de Cuenta:
                </p>

                <p className="font-bold text-[#000D38] group-hover:text-white text-xl transition">
                  0474711580
                </p>

                <p className="mt-3 text-[#4F8CFF] group-hover:text-white transition">
                  Cuenta CLABE:
                </p>

                <p className="font-bold text-[#000D38] group-hover:text-white text-xl break-all transition">
                  012312004747115804
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
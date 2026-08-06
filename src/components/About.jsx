export default function About() {
  const valores = [
    'Respeto',
    'Compromiso',
    'Tolerancia',
    'Atención',
    'Honestidad',
    'Credibilidad'
  ]

  return (
    <section
      id="nosotros"
      className="py-32 px-6 bg-[#F5F7FA]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-6 text-[#011761]">
            Sobre
            <span className="text-[#60A5FA]">
              {" "}Nosotros
            </span>
          </h2>

          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
            Conectando comunidades mediante tecnología moderna
            y soluciones profesionales de telecomunicación.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-3xl font-bold mb-6 text-[#011761]">
              ¿Quiénes somos?
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              Somos una empresa que brinda servicios de
              telecomunicación con profesionalismo,
              calidad de atención, capacitación continua
              de nuestro personal e implementación
              de tecnologías inalámbricas y de fibra
              óptica de última generación.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-3xl font-bold mb-6 text-[#011761]">
              Misión
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              Brindar un servicio de internet y atención
              de calidad a las comunidades y localidades
              con un nivel bajo de acceso a las
              telecomunicaciones.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-3xl font-bold mb-6 text-[#011761]">
              Visión
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              Posicionarnos como empresa líder en servicios
              de telecomunicación, manteniendo un crecimiento
              continuo en el que se destaque la calidad
              en el servicio y atención al cliente.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-3xl font-bold mb-8 text-[#011761]">
              Valores
            </h3>

            <div className="grid grid-cols-2 gap-5">
              {valores.map((valor, index) => (
                <div
                  key={index}
                  className="rounded-2xl py-4 text-center border border-gray-300 hover:bg-[#011761] hover:border-[#011761] transition duration-300 group"
                >
                  <p className="text-[#011761] font-semibold group-hover:text-white">
                    {valor}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
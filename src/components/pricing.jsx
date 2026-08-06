export default function Pricing() {
  const fibra = [
    {
      nombre: 'Básico FO',
      precio: '$250',
      velocidad: '15 Mbps simétrico',
      ift: '1108086'
    },
    {
      nombre: 'Intermedio FO',
      precio: '$350',
      velocidad: '25 Mbps simétrico',
      ift: '1108090'
    },
    {
      nombre: 'Pro FO',
      precio: '$500',
      velocidad: '40 Mbps simétrico',
      ift: '1108096'
    }
  ]

  const wireless = [
    {
      nombre: 'Básico WISP',
      precio: '$250',
      velocidad: '4 Mbps bajada / 2 Mbps subida',
      ift: '1120365'
    },
    {
      nombre: 'Intermedio WISP',
      precio: '$350',
      velocidad: '6 Mbps bajada / 3 Mbps subida',
      ift: '1108059'
    },
    {
      nombre: 'Pro WISP',
      precio: '$500',
      velocidad: '10 Mbps bajada / 5 Mbps subida',
      ift: '1108072'
    }
  ]

  const cardClass =
    'bg-[#071A55] border border-[#1D3475] rounded-3xl p-10 shadow-xl shadow-blue-900/20 hover:bg-[#6F7277] hover:border-[#6F7277] hover:shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-2 transition-all duration-300'

  const buttonClass =
    'block text-center py-4 rounded-2xl font-bold bg-[#000D38] border border-[#4F8CFF] hover:bg-[#6F7277] hover:border-[#6F7277] text-white transition-all duration-300'

  return (
    <section
      id="precios"
      className="py-32 px-6 bg-[#000D38]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-extrabold mb-6 text-white">
            Paquetes de internet
            <span className="text-[#7DB8FF]">
              {' '}fijo residencial
            </span>
          </h2>

          <p className="text-gray-300 text-xl mb-10">
            Planes diseñados para hogares y negocios.
          </p>

          <a
            href="https://tarifas.ift.org.mx/ift_visor/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              bg-[#071A55]
              border
              border-[#4F8CFF]
              hover:bg-[#6F7277]
              hover:border-[#6F7277]
              transition-all
              duration-300
              px-8
              py-4
              rounded-2xl
              text-lg
              font-bold
              text-white
              shadow-lg
            "
          >
            Visor de Tarifas IFT
          </a>

        </div>

        {/* FIBRA ÓPTICA */}

        <div className="mb-24">

          <h3 className="text-4xl font-extrabold mb-12 text-center text-white">
            Fibra
            <span className="text-[#7DB8FF]">
              {' '}Óptica
            </span>
          </h3>

          <div className="grid lg:grid-cols-3 gap-8">

            {fibra.map((plan, index) => (

              <div
                key={index}
                className={cardClass}
              >

                <h4 className="text-3xl font-bold mb-4 text-white">
                  {plan.nombre}
                </h4>

                <div className="mb-8 text-white">
                  <span className="text-6xl font-extrabold">
                    {plan.precio}
                  </span>

                  <span className="text-xl ml-2">
                    mxn
                  </span>
                </div>

                <div className="space-y-4 mb-10 text-lg text-gray-300">
                  <p>{plan.velocidad}</p>
                  <p>Pago mensual</p>
                  <p>Fibra Óptica</p>
                  <p>Sin límite de datos</p>
                  <p>Soporte Técnico 24/7</p>

                  <p className="text-sm text-[#7DB8FF]">
                    Número de Inscripción IFT: {plan.ift}
                  </p>
                </div>

                <a
                  href="https://wa.me/527751301262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  Contratar
                </a>

              </div>

            ))}

          </div>

        </div>

        {/* WIRELESS */}

        <div>

          <h3 className="text-4xl font-extrabold mb-12 text-center text-white">
            Wireless
            <span className="text-[#7DB8FF]">
              {' '}WISP
            </span>
          </h3>

          <div className="grid lg:grid-cols-3 gap-8">

            {wireless.map((plan, index) => (

              <div
                key={index}
                className={cardClass}
              >

                <h4 className="text-3xl font-bold mb-4 text-white">
                  {plan.nombre}
                </h4>

                <div className="mb-8 text-white">
                  <span className="text-6xl font-extrabold">
                    {plan.precio}
                  </span>

                  <span className="text-xl ml-2">
                    mxn
                  </span>
                </div>

                <div className="space-y-4 mb-10 text-lg text-gray-300">
                  <p>{plan.velocidad}</p>
                  <p>Pago mensual</p>
                  <p>Wireless</p>
                  <p>Sin límite de datos</p>
                  <p>Soporte Técnico 24/7</p>

                  <p className="text-sm text-[#7DB8FF]">
                    Número de Inscripción IFT: {plan.ift}
                  </p>
                </div>

                <a
                  href="https://wa.me/527751301262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  Contratar
                </a>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  )
}
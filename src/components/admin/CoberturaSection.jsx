export default function CoberturaSection() {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
      <h2 className="text-3xl font-extrabold text-[#000D38] mb-4">
        Cobertura
      </h2>

      <p className="text-gray-600 mb-6">
        En esta sección se administrarán las zonas donde InterfazT ofrece servicio.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {['Tulancingo', 'Singuilucan', 'Huasca', 'Metepec', 'Zempoala', 'Acaxochitlán'].map((zona) => (
          <div key={zona} className="border border-gray-200 rounded-2xl p-6 bg-[#F5F7FA]">
            <h3 className="text-xl font-bold text-[#000D38]">
              {zona}
            </h3>
            <p className="text-gray-600 mt-2">
              Zona activa de cobertura.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default function ConfiguracionSection() {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
      <h2 className="text-3xl font-extrabold text-[#000D38] mb-4">
        Configuración
      </h2>

      <p className="text-gray-600 mb-6">
        En esta sección se podrán modificar datos generales del sistema.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <input
          placeholder="Nombre de la empresa"
          defaultValue="InterfazT"
          className="border border-gray-300 rounded-2xl px-5 py-4"
        />

        <input
          placeholder="Correo de contacto"
          defaultValue="interf4zt@gmail.com"
          className="border border-gray-300 rounded-2xl px-5 py-4"
        />

        <input
          placeholder="Teléfono"
          defaultValue="775 145 0957"
          className="border border-gray-300 rounded-2xl px-5 py-4"
        />

        <input
          placeholder="Color principal"
          defaultValue="#000D38"
          className="border border-gray-300 rounded-2xl px-5 py-4"
        />
      </div>

      <button className="mt-6 bg-[#000D38] hover:bg-[#6F7277] text-white px-8 py-4 rounded-2xl font-bold">
        Guardar configuración
      </button>
    </div>
  )
}
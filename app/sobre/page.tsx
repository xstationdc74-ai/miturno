export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-16 text-gray-800">

      {/* HERO */}
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-medium leading-snug">
          Kume es una forma de habitar los lugares
        </h1>

        <p className="text-gray-500">
          No es solo una app.
          <br />
          Es una invitación a conectar.
        </p>
      </div>

      {/* BLOQUE 1 */}
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          Kume nace en Villa La Angostura,
          entre montañas, bosque y silencio.
        </p>

        <p>
          Donde el tiempo se mueve distinto,
          y cada lugar tiene una historia que no se ve,
          pero se siente.
        </p>
      </div>

      {/* BLOQUE 2 */}
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          Creemos en los encuentros reales.
        </p>

        <p>
          En un café compartido,
          en una charla después de una clase,
          en una mesa que reúne más que comida.
        </p>

        <p>
          En el arte,
          en el hacer con las manos,
          en lo simple.
        </p>
      </div>

      {/* BLOQUE 3 */}
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          Kume es para quienes buscan algo más que un lugar.
        </p>

        <p>
          Y para quienes crean espacios con intención,
          y quieren compartirlos.
        </p>
      </div>

      {/* CIERRE */}
      <div className="text-center space-y-6 pt-6">

        <p className="text-gray-500">
          Descubrí. Conectá. Habitá.
        </p>

        <a
          href="/sumate"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-sm"
        >
          Sumate a Kume
        </a>

      </div>

    </div>
  )
}
/**
 * 🧠 BUSINESS CONFIG — SINGLE SOURCE OF TRUTH
 *
 * Este archivo define TODOS los negocios del sistema.
 *
 * Cada negocio (Cali, Ona, etc.) se representa como una configuración,
 * NO como lógica hardcodeada en componentes o rutas.
 *
 * 🎯 OBJETIVO
 * Evitar mezcla de lógica entre negocios y permitir escalabilidad.
 *
 * ⚙️ QUÉ CONTROLA
 * - slug → identificador único (usado en URLs)
 * - type → define qué tipo de admin y comportamiento usa
 * - features → habilita/deshabilita funcionalidades (gallery, booking, etc.)
 * - theme → personalización visual
 * - active → si el negocio está activo o no
 *
 * 🧱 REGLAS IMPORTANTES
 * - NO hardcodear lógica por slug en otros archivos
 * - SIEMPRE leer desde este config
 * - ESTE archivo NO ejecuta lógica, solo define datos
 *
 * 🚀 FUTURO
 * Este archivo puede migrar a base de datos (ej: Supabase),
 * pero la estructura debe mantenerse igual.
 *
 * 💡 FRASE CLAVE
 * "El negocio define la configuración, no el código"
 */


export type BusinessType = "cali" | "ona" | "generic"

export type BusinessFeatures = {
  gallery?: boolean
  workshops?: boolean
  events?: boolean
  booking?: boolean
  visit?: boolean
  stock?: boolean
}

export type BusinessConfig = {
  slug: string
  name: string
  type: BusinessType
  features: BusinessFeatures
  theme?: string
  active: boolean
}

export const businesses: Record<string, BusinessConfig> = {
  cali: {
    slug: "cali",
    name: "Cali",
    type: "cali",
    features: {
      gallery: true,
      workshops: true,
      events: true,
      booking: false,
      visit: true,
    },
    theme: "cali",
    active: true,
  },
}
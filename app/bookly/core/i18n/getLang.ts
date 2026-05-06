import { Lang } from './texts'

export const getLang = (): Lang => {
  if (typeof window === 'undefined') return 'es'

  const saved = localStorage.getItem('bookly_lang') as Lang
  if (saved) return saved

  return navigator.language.startsWith('es') ? 'es' : 'en'
}
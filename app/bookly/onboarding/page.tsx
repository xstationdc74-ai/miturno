'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/bookly/Layout'
import Button from '@/components/bookly/Button'
import SelectableCard from '@/components/bookly/SelectableCard'
import Progress from '@/components/bookly/Progress'
import { texts, Lang } from '@/app/bookly/core/i18n/texts'
type BusinessType = 'barber' | 'spa' | 'yoga'

export default function Onboarding() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('es')
  const [selected, setSelected] = useState<BusinessType | null>(null)

  useEffect(() => {
    const savedLang = localStorage.getItem('bookly_lang') as Lang
    if (savedLang) setLang(savedLang)
  }, [])

  const t = texts[lang]

  const handleContinue = () => {
    
  if (!selected) return

  localStorage.setItem('bookly_business', selected)

  router.push('/bookly/config')
  
}

  return (
    <Layout>
      <Progress step={1} total={3} />

      <div style={{ marginBottom: 24 }}>
  <h2 style={{ margin: 0, fontSize: 20 }}>
    Bienvenido a Bookly
  </h2>

  <p style={{ color: '#666', marginTop: 6, fontSize: 14 }}>
    {t.businessType}
  </p>
</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SelectableCard
          title={t.barber}
          subtitle="Para barberías y peluquerías"
          selected={selected === 'barber'}
          onClick={() => setSelected('barber')}
        />

        <SelectableCard
          title={t.spa}
          subtitle="Centros de bienestar y masajes"
          selected={selected === 'spa'}
          onClick={() => setSelected('spa')}
        />

        <SelectableCard
          title={t.yoga}
          subtitle="Estudios de yoga y bienestar"
          selected={selected === 'yoga'}
          onClick={() => setSelected('yoga')}
        />
      </div>

      <div style={{ marginTop: 24 }}>
        <Button onClick={handleContinue}>
          {t.continue}
        </Button>
      </div>
    </Layout>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/bookly/Layout'
import Button from '@/components/bookly/Button'
import Progress from '@/components/bookly/Progress'
import Palette from '@/components/bookly/Palette'

export default function StylePage() {
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()

  const palettes = [
  {
    title: 'Clásico',
    colors: ['#F5B942', '#000000', '#ffffff'],
  },
  {
    title: 'Relajado',
    colors: ['#7FBF9F', '#ffffff', '#2e2e2e'],
  },
  {
    title: 'Minimal',
    colors: ['#A78BFA', '#ffffff', '#2e2e2e'],
  },
  {
    title: 'Barber Pro',
    colors: ['#111111', '#D4AF37', '#ffffff'],
  },
]

 const handleContinue = () => {
  if (selected === null) return

  localStorage.setItem('bookly_style', String(selected))

  router.push('/bookly/home')
}

  return (
    <Layout>
      <Progress step={3} total={3} />

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>
          Elegí tu estilo
        </h2>

        <p style={{ color: '#666', marginTop: 6, fontSize: 14 }}>
          Seleccioná la paleta que mejor represente tu negocio
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {palettes.map((p, i) => (
  <Palette
    key={i}
    title={p.title}
    colors={p.colors}
    selected={selected === i}
    onClick={() => setSelected(i)}
  />
))}
    
      </div>

      <div style={{ marginTop: 24 }}>
        <Button onClick={handleContinue}>
          Finalizar
        </Button>
      </div>
    </Layout>
  )
}
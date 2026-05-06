'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/bookly/Button'
import { useRouter } from 'next/navigation'
import Layout from '@/components/bookly/Layout'
import Card from '@/components/bookly/Card'
import { themes } from '@/app/bookly/core/theme/themes'

export default function PublicPage() {
  const [business, setBusiness] = useState<any>(null)
  const [turns, setTurns] = useState<any[]>([])
  const [theme, setTheme] = useState(themes[0])
  const router = useRouter()

  useEffect(() => {
    const savedBusiness = localStorage.getItem('bookly_business_info')
    const businessType = localStorage.getItem('bookly_business') || 'default'
    const key = `bookly_turns_${businessType}`

    if (savedBusiness) {
      setBusiness(JSON.parse(savedBusiness))
    }

    const savedTurns = JSON.parse(localStorage.getItem(key) || '[]')

    const cleanTurns = savedTurns.map((t: any) => ({
      id: t.id,
      date: t.date,
      time: t.time,
    }))

    setTurns(cleanTurns)

    const savedStyle = localStorage.getItem('bookly_style')

    if (savedStyle !== null) {
      setTheme(themes[Number(savedStyle)])
    }
  }, [])

  if (!business) {
    return <div style={{ padding: 20 }}>Cargando...</div>
  }

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: '100vh',
        '--card-bg': theme.card,
      } as React.CSSProperties}
    >
      <Layout>
        <Card>
          <h1 style={{ marginBottom: 10 }}>
            {business.name}
          </h1>

          <p style={{ color: '#888' }}>
            {business.description}
          </p>

          <p style={{ marginTop: 10 }}>
            📍 {business.address}
          </p>
        </Card>

        <div style={{ marginTop: 20 }}>
          <Card>
            <h3 style={{ marginBottom: 10 }}>
              Horarios ocupados
            </h3>

            {turns.length === 0 ? (
              <p style={{ color: '#666' }}>
                No hay turnos todavía
              </p>
            ) : (
              turns.map((turn) => (
                <div
                  key={turn.id}
                  style={{
                    padding: 12,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  {turn.date} — {turn.time}
                </div>
              ))
            )}
          </Card>
          <div style={{ marginTop: 20 }}>
  <Button onClick={() => router.push('/bookly/new')}>
    Reservar turno
  </Button>
</div>
        </div>
      </Layout>
    </div>
  )
}
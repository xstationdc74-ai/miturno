'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Card from '@/components/bookly/Card'
import Button from '@/components/bookly/Button'

import { themes } from '@/app/bookly/core/theme/themes'

export default function OwnerHome() {
  const router = useRouter()

  const [theme, setTheme] = useState(themes[0])
  const [turns, setTurns] = useState<any[]>([])
  const [businessName, setBusinessName] = useState('Bookly')

  useEffect(() => {
    const savedStyle = localStorage.getItem('bookly_style')

    if (savedStyle !== null) {
      setTheme(themes[Number(savedStyle)])
    }

    const savedBusiness = localStorage.getItem('bookly_business_info')

    if (savedBusiness) {
      const parsed = JSON.parse(savedBusiness)

      setBusinessName(parsed.name || 'Bookly')
    }

    const business =
      localStorage.getItem('bookly_business') || 'default'

    const key = `bookly_turns_${business}`

    const savedTurns = JSON.parse(
      localStorage.getItem(key) || '[]'
    )

    setTurns(savedTurns)
  }, [])

  const handleDelete = (id: number) => {
    const business =
      localStorage.getItem('bookly_business') || 'default'

    const key = `bookly_turns_${business}`

    const updated = turns.filter((t) => t.id !== id)

    setTurns(updated)

    localStorage.setItem(
      key,
      JSON.stringify(updated)
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.background,
        color: theme.text,
        padding: 20,

        '--card-bg': theme.card,
        '--primary-color': theme.primary,
      } as React.CSSProperties}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            fontSize: 32,
            marginBottom: 6,
          }}
        >
          {businessName}
        </h1>

        <p
          style={{
            color: theme.secondaryText,
          }}
        >
          Panel de gestión de turnos
        </p>
      </div>

      {/* ACTIONS */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <Button
            onClick={() => router.push('/bookly/new')}
          >
            Nuevo turno
          </Button>
        </div>

        <div style={{ flex: 1 }}>
          <Button
            onClick={() => router.push('/bookly/public')}
          >
            Vista cliente
          </Button>
        </div>
      </div>

      {/* TURNS */}
      <Card>
        <h3
          style={{
            marginBottom: 18,
          }}
        >
          Próximos turnos
        </h3>

        {turns.length === 0 ? (
          <p
            style={{
              color: theme.secondaryText,
            }}
          >
            No hay turnos todavía
          </p>
        ) : (
          turns.map((turn) => (
            <div
              key={turn.id}
              style={{
                padding: 14,
                borderBottom: `1px solid ${theme.border}`,
                position: 'relative',
              }}
            >
              <button
                onClick={() => handleDelete(turn.id)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 10,
                  background: 'transparent',
                  border: 'none',
                  color: '#ff4d4d',
                  cursor: 'pointer',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                ✕
              </button>

              <strong
                style={{
                  display: 'block',
                  marginBottom: 4,
                }}
              >
                {turn.name}
              </strong>

              <div>
                {turn.date} — {turn.time}
              </div>

              <div
                style={{
                  color: theme.secondaryText,
                  marginTop: 4,
                }}
              >
                {turn.phone}
              </div>
            </div>
          ))
        )}
      </Card>

      {/* FOOTER */}
      <div
        style={{
          marginTop: 24,
        }}
      >
        <div
  style={{
    display: 'flex',
    gap: 10,
  }}
>
  <div style={{ flex: 1 }}>
    <Button
      onClick={() => router.push('/bookly/share')}
    >
      Compartir negocio
    </Button>
  </div>

  <div style={{ flex: 1 }}>
    <Button
      onClick={() => router.push('/bookly/help')}
    >
      Ayuda
    </Button>
  </div>
</div>
      </div>
    </div>
  )
}
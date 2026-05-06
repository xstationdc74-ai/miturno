'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Layout from '@/components/bookly/Layout'
import Card from '@/components/bookly/Card'
import Button from '@/components/bookly/Button'

import { themes } from '@/app/bookly/core/theme/themes'

export default function NewTurn() {
  const router = useRouter()

  const [theme, setTheme] = useState(themes[0])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const savedStyle = localStorage.getItem('bookly_style')

    if (savedStyle !== null) {
      setTheme(themes[Number(savedStyle)])
    }
  }, [])

  const handleSave = () => {
    const business =
      localStorage.getItem('bookly_business') || 'default'

    const key = `bookly_turns_${business}`

    const existing = JSON.parse(
      localStorage.getItem(key) || '[]'
    )

    const newTurn = {
      id: Date.now(),
      name,
      phone,
      date,
      time,
    }

    localStorage.setItem(
      key,
      JSON.stringify([...existing, newTurn])
    )

    router.push('/bookly/home')
  }

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: '100vh',

        '--card-bg': theme.card,
        '--primary-color': theme.primary,
      } as React.CSSProperties}
    >
      <Layout>
        <Card>
          <h1 style={{ marginBottom: 20 }}>
            Nuevo turno
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <input
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <Button onClick={handleSave}>
              Guardar turno
            </Button>
          </div>
        </Card>
      </Layout>
    </div>
  )
}

const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: '1px solid #ddd',
  fontSize: 14,
  width: '100%',
}
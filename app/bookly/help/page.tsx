'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Layout from '@/components/bookly/Layout'
import Card from '@/components/bookly/Card'
import Button from '@/components/bookly/Button'

import { themes } from '@/app/bookly/core/theme/themes'

export default function HelpPage() {
  const router = useRouter()

  const [theme, setTheme] = useState(themes[0])

  useEffect(() => {
    const savedStyle = localStorage.getItem('bookly_style')

    if (savedStyle !== null) {
      setTheme(themes[Number(savedStyle)])
    }
  }, [])

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
      <Layout>
        {/* HEADER */}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontSize: 32,
              marginBottom: 8,
            }}
          >
            Ayuda
          </h1>

          <p
            style={{
              color: '#666',
              lineHeight: 1.6,
            }}
          >
            Aprendé a usar Bookly en pocos pasos.
          </p>
        </div>

        {/* STEP 1 */}
        <Card>
          <h3 style={{ marginBottom: 10 }}>
            1️⃣ Configurá tu negocio
          </h3>

          <p
            style={{
              color: '#666',
              lineHeight: 1.6,
            }}
          >
            Elegí el tipo de negocio, agregá el nombre,
            descripción y dirección.
          </p>
        </Card>

        {/* STEP 2 */}
        <div style={{ marginTop: 16 }}>
          <Card>
            <h3 style={{ marginBottom: 10 }}>
              2️⃣ Elegí un estilo
            </h3>

            <p
              style={{
                color: '#666',
                lineHeight: 1.6,
              }}
            >
              Seleccioná la paleta de colores que mejor
              represente tu marca.
            </p>
          </Card>
        </div>

        {/* STEP 3 */}
        <div style={{ marginTop: 16 }}>
          <Card>
            <h3 style={{ marginBottom: 10 }}>
              3️⃣ Creá turnos
            </h3>

            <p
              style={{
                color: '#666',
                lineHeight: 1.6,
              }}
            >
              Agregá reservas manualmente desde el panel
              principal de Bookly.
            </p>
          </Card>
        </div>

        {/* STEP 4 */}
        <div style={{ marginTop: 16 }}>
          <Card>
            <h3 style={{ marginBottom: 10 }}>
              4️⃣ Compartí tu negocio
            </h3>

            <p
              style={{
                color: '#666',
                lineHeight: 1.6,
              }}
            >
              Compartí el link o código QR para que tus
              clientes puedan reservar turnos fácilmente.
            </p>
          </Card>
        </div>

        {/* STEP 5 */}
        <div style={{ marginTop: 16 }}>
          <Card>
            <h3 style={{ marginBottom: 10 }}>
              5️⃣ Recibí reservas
            </h3>

            <p
              style={{
                color: '#666',
                lineHeight: 1.6,
              }}
            >
              Tus clientes podrán entrar desde cualquier
              dispositivo y reservar horarios disponibles.
            </p>
          </Card>
        </div>

        {/* ACTIONS */}
        <div
          style={{
            marginTop: 24,
          }}
        >
          <Button onClick={() => router.push('/bookly/home')}>
            Volver al panel
          </Button>
        </div>
      </Layout>
    </div>
  )
}
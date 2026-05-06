'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Layout from '@/components/bookly/Layout'
import Card from '@/components/bookly/Card'
import Button from '@/components/bookly/Button'

import { themes } from '@/app/bookly/core/theme/themes'

export default function SharePage() {
  const router = useRouter()

  const [theme, setTheme] = useState(themes[0])

  useEffect(() => {
    const savedStyle = localStorage.getItem('bookly_style')

    if (savedStyle !== null) {
      setTheme(themes[Number(savedStyle)])
    }
  }, [])

  const publicUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/bookly/public`
      : ''

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
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
            Compartir negocio
          </h1>

          <p
            style={{
              color: '#666',
              lineHeight: 1.6,
            }}
          >
            Compartí tu link o código QR para que tus clientes puedan reservar turnos.
          </p>
        </div>

        {/* LINK */}
        <Card>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div>
              <h3
                style={{
                  marginBottom: 8,
                }}
              >
                🔗 Link de reservas
              </h3>

              <div
                style={{
                  padding: 14,
                  borderRadius: 12,
                  background: '#f5f5f5',
                  fontSize: 14,
                  wordBreak: 'break-all',
                  color: '#444',
                }}
              >
                {publicUrl}
              </div>
            </div>

            <Button onClick={handleCopy}>
              {copied ? '¡Link copiado!' : 'Copiar link'}
            </Button>
          </div>
        </Card>

        {/* QR */}
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Card>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  marginBottom: 20,
                }}
              >
                📱 Código QR
              </h3>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  publicUrl
                )}`}
                alt="QR Code"
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 20,
                  background: '#fff',
                  padding: 10,
                }}
              />

              <p
                style={{
                  marginTop: 16,
                  color: '#666',
                  lineHeight: 1.6,
                }}
              >
                Tus clientes pueden escanear este código para entrar directamente a tu página de reservas.
              </p>
            </div>
          </Card>
        </div>

        {/* ACTIONS */}
        <div
          style={{
            marginTop: 20,
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
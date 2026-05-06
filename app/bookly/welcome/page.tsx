'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Layout from '@/components/bookly/Layout'
import Card from '@/components/bookly/Card'
import Button from '@/components/bookly/Button'

export default function BooklyWelcome() {
  const router = useRouter()

  const [lang, setLang] = useState<'es' | 'en'>('es')

  const handleContinue = () => {
    localStorage.setItem('bookly_lang', lang)
    router.push('/bookly/onboarding')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff7ec',
        color: '#111',

        '--card-bg': '#fff',
        '--primary-color': '#F5B942',
      } as React.CSSProperties}
    >
      <Layout>
        <Card>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            {/* LOGO */}
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <img
                src="/bookly/logobookly.png"
                alt="Bookly"
                style={{
                  width: 180,
                  marginBottom: 18,
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />

              <p
                style={{
                  color: '#666',
                  lineHeight: 1.7,
                  fontSize: 16,
                  maxWidth: 320,
                  margin: '0 auto',
                }}
              >
                Gestioná reservas y turnos de forma simple, moderna y profesional.
              </p>
            </div>

            {/* FEATURES */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                fontSize: 15,
                color: '#333',
              }}
            >
              <div>✔️ Barberías</div>
              <div>✔️ Spa / Masajes</div>
              <div>✔️ Yoga / Bienestar</div>
            </div>

            {/* LANGUAGE */}
            <div>
              <p
                style={{
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                Seleccionar idioma
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                <button
                  onClick={() => setLang('es')}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    borderRadius: 12,
                    border:
                      lang === 'es'
                        ? '2px solid #F5B942'
                        : '1px solid #ddd',
                    background: '#fff',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: '0.2s',
                  }}
                >
                  Español
                </button>

                <button
                  onClick={() => setLang('en')}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    borderRadius: 12,
                    border:
                      lang === 'en'
                        ? '2px solid #F5B942'
                        : '1px solid #ddd',
                    background: '#fff',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: '0.2s',
                  }}
                >
                  English
                </button>
              </div>
            </div>

            <Button onClick={handleContinue}>
              Continuar
            </Button>
          </div>
        </Card>
      </Layout>
    </div>
  )
}
'use client'

import { useRouter } from 'next/navigation'

export default function SemillaLanding() {
  const router = useRouter()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/bookly/bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(5px)',
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* LOGO */}
        <img
          src="/bookly/logo.png"
          alt="Semilla Studio"
          style={{
            width: 210,
            marginBottom: 28,
            marginTop: -20,
          }}
        />

        {/* TEXT */}
        <div
          style={{
            padding: '12px 18px',
            borderRadius: 18,
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(10px)',
            marginBottom: 36,
          }}
        >
          <p
            style={{
              color: '#3f3f3f',
              lineHeight: 1.6,
              fontSize: 17,
              textAlign: 'center',
              margin: 0,
              fontWeight: 500,
            }}
          >
            Apps modernas y simples para negocios reales.
          </p>
        </div>

        {/* BOOKLY CARD */}
        <div
          style={{
            width: '100%',
            borderRadius: 28,
            padding: 30,
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid rgba(255,255,255,0.5)',
          }}
        >
          <div
            style={{
              fontSize: 34,
              textAlign: 'center',
              marginBottom: 14,
            }}
          >
            📅
          </div>

          <h2
            style={{
              textAlign: 'center',
              marginBottom: 16,
              color: '#111',
              fontSize: 36,
            }}
          >
            Bookly
          </h2>

          <p
            style={{
              color: '#555',
              lineHeight: 1.7,
              marginBottom: 28,
              textAlign: 'center',
              fontSize: 17,
            }}
          >
            Gestioná reservas, turnos y clientes de forma elegante y profesional.
          </p>

          <button
            onClick={() => router.push('/bookly/welcome')}
            style={{
              width: '100%',
              padding: 16,
              borderRadius: 16,
              border: 'none',
              background: '#F5B942',
              color: '#111',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 16,
              boxShadow: '0 6px 18px rgba(245,185,66,0.35)',
            }}
          >
            Entrar a Bookly
          </button>
        </div>

        {/* FOOTER */}
        <p
          style={{
            marginTop: 22,
            color: '#4f4f4f',
            fontSize: 13,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Desarrollado por Semilla Studio · 2026
        </p>
      </div>
    </div>
  )
}
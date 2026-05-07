'use client'

import Image from 'next/image'

import Layout from '@/components/bookly/Layout'
import Card from '@/components/bookly/Card'

export default function TermsPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: 20,
        color: '#111',
      }}
    >
      <Layout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
            paddingTop: 10,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '14px 26px',
              borderRadius: 22,
            }}
          >
            <Image
              src="/bookly/logobookly.png"
              alt="Bookly"
              width={150}
              height={42}
              priority
            />
          </div>
        </div>

        <Card>
          <h1
            style={{
              fontSize: 32,
              marginBottom: 20,
            }}
          >
            Terms & Conditions
          </h1>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            By using Bookly, you agree to use the app
            responsibly and in accordance with applicable
            laws.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Bookly is provided "as is" without warranties
            of any kind.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Semilla Studio is not responsible for data
            loss, missed appointments, business losses,
            or interruptions caused by device issues,
            browser storage deletion, or third-party
            services.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Users are responsible for maintaining backups
            of important information if necessary.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            All app branding, logos, and content related
            to Bookly remain the property of Semilla
            Studio.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              opacity: 0.8,
            }}
          >
            For questions or support, contact:
            <br />
            semillastudio@outlook.com
          </p>
        </Card>
      </Layout>
    </div>
  )
}
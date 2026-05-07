'use client'

import Image from 'next/image'

import Layout from '@/components/bookly/Layout'
import Card from '@/components/bookly/Card'

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Bookly respects your privacy.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            The app stores business information,
            appointments, and settings locally on your
            device using browser local storage.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Bookly does not require user accounts and
            does not collect personal identification
            information.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            Bookly does not sell, share, or transfer
            your data to third parties.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            No analytics or tracking tools are currently
            used in the app.
          </p>

          <p
            style={{
              lineHeight: 1.8,
              marginBottom: 20,
              opacity: 0.8,
            }}
          >
            If you uninstall the app or clear your
            browser storage, your saved data may be
            permanently removed.
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
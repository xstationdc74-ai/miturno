'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/bookly/Layout'
import Button from '@/components/bookly/Button'
import Input from '@/components/bookly/Input'
import Progress from '@/components/bookly/Progress'
import { texts, Lang } from '@/app/bookly/core/i18n/texts'

export default function ConfigBusiness() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('es')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    const savedLang = localStorage.getItem('bookly_lang') as Lang
    if (savedLang) setLang(savedLang)
  }, [])

  const t = texts[lang]

 const handleContinue = () => {
  localStorage.setItem(
    'bookly_business_info',
    JSON.stringify({
      name,
      description,
      address,
    })
  )

  router.push('/bookly/style')
}

  return (
    <Layout>
      {/* PROGRESS */}
      <Progress step={2} total={3} />

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>
          Tu negocio
        </h2>

        <p style={{ color: '#666', marginTop: 6, fontSize: 14 }}>
          Contanos sobre tu negocio
        </p>

        <p style={{ color: '#999', fontSize: 13 }}>
          Esta información se mostrará a tus clientes.
        </p>
      </div>

      {/* FORM */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        
        <div>
          <label style={{ fontSize: 13, color: '#555' }}>
            Nombre del negocio
          </label>
          <Input
            placeholder="The Barber Shop"
            value={name}
            onChange={setName}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#555' }}>
            Descripción (opcional)
          </label>
          <Input
            placeholder="Cortes modernos y clásicos"
            value={description}
            onChange={setDescription}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#555' }}>
            Dirección
          </label>
          <Input
            placeholder="Av. Siempre Viva 123"
            value={address}
            onChange={setAddress}
          />
        </div>

      </div>

      {/* BUTTON */}
      <div style={{ marginTop: 24 }}>
        <Button onClick={handleContinue}>
          Guardar y continuar
        </Button>
      </div>
    </Layout>
  )
}
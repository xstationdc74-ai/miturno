'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAppointments } from '@/hooks/useAppointments'

type Appointment = {
  id: string
  client_name: string
  start_time: string
  status: string
}

export default function Calendar({ businessId }: { businessId: string }) {

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { completeAppointment } = useAppointments()

  const loadAppointments = async () => {

    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('business_id', businessId)
      .order('start_time')

    setAppointments(data || [])
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  const handleComplete = async (id: string) => {

    await completeAppointment(id)

    loadAppointments()
  }

  return (

    <div className="space-y-4">

      {appointments.map((a) => (

        <div
          key={a.id}
          className="border p-3 rounded flex justify-between items-center"
        >

          <div>

            <div className="font-semibold">
              {a.client_name}
            </div>

            <div className="text-sm text-gray-500">
              {new Date(a.start_time).toLocaleTimeString()}
            </div>

            <div className="text-xs">
              {a.status}
            </div>

          </div>

          {a.status !== 'completed' && (

            <button
              onClick={() => handleComplete(a.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Finalizar
            </button>

          )}

        </div>

      ))}

    </div>
  )
}

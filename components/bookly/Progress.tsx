type Props = {
  step: number
  total: number
}

export default function Progress({ step, total }: Props) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 6,
            borderRadius: 6,
            background: i < step ? '#F5B942' : '#e5e5e5',
          }}
        />
      ))}
    </div>
  )
}
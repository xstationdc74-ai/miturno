type Props = {
  children: React.ReactNode
}

export default function Card({ children }: Props) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background: 'var(--card-bg)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  )
}
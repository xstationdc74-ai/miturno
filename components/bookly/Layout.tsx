type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f7f7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          borderRadius: 24,
          padding: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
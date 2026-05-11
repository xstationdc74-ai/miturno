type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f7f7',
        padding: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}
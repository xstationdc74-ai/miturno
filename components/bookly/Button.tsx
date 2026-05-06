type Props = {
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: 16,
        borderRadius: 16,
        border: 'none',
        background: 'var(--primary-color, #F5B942)',
        color: '#000',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
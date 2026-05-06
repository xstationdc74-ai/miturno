type Props = {
  title: string
  subtitle: string
  selected?: boolean
  onClick?: () => void
}

export default function SelectableCard({
  title,
  subtitle,
  selected,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 16,
        borderRadius: 16,
        border: selected ? '2px solid #F5B942' : '1px solid #e0e0e0',
        background: selected ? '#FFF6E0' : '#fff',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
        {subtitle}
      </div>
    </div>
  )
}
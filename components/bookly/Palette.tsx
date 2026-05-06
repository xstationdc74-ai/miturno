type Props = {
  title: string
  colors: string[]
  selected?: boolean
  onClick?: () => void
}

export default function Palette({
  title,
  colors,
  selected,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 14,
        borderRadius: 18,
        border: selected ? '2px solid #F5B942' : '1px solid #e0e0e0',
        background: selected ? '#FFF6E0' : '#fff',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* LEFT COLOR BAR */}
      <div
        style={{
          width: 6,
          height: 40,
          borderRadius: 6,
          background: colors[0],
          marginRight: 12,
        }}
      />

      {/* CONTENT */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
          {title}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: c,
                border: c === '#ffffff' ? '1px solid #ccc' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* CHECK */}
      {selected && (
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: '#F5B942',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          ✓
        </div>
      )}
    </div>
  )
}
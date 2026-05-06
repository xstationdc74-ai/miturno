type Props = {
  placeholder: string
  value: string
  onChange: (v: string) => void
}

export default function Input({ placeholder, value, onChange }: Props) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '14px 16px',
        borderRadius: 12,
        border: '1px solid #e0e0e0',
        fontSize: 14,
        outline: 'none',
      }}
    />
  )
}
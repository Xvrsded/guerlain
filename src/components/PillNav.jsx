export default function PillNav({ items, active, onSelect }) {
  return (
    <nav className="pill-nav" aria-label="Product category navigation">
      {items.map((item) => (
        <button
          key={item}
          className={`pill ${active === item ? 'active' : ''}`}
          onClick={() => onSelect(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </nav>
  )
}

export default function LogoLoop({ items = [] }) {
  const loopItems = [...items, ...items]

  return (
    <div className="brand-gallery-loop" aria-label="Guerlain product gallery loop">
      <div className="brand-gallery-track">
        {loopItems.map((item, index) => (
          <article key={`${item.id}-${index}`} className="brand-gallery-card">
            <div className="brand-gallery-image" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="brand-gallery-meta">
              <small>{item.category}</small>
              <p>{item.name}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

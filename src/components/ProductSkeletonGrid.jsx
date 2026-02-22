export default function ProductSkeletonGrid({ count = 4 }) {
  return (
    <div className="chroma-grid skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <article key={`skeleton-${index}`} className="product-card skeleton-card">
          <div className="product-thumb skeleton-block" />
          <div className="skeleton-line short" />
          <div className="skeleton-line medium" />
          <div className="skeleton-line tiny" />
        </article>
      ))}
    </div>
  )
}

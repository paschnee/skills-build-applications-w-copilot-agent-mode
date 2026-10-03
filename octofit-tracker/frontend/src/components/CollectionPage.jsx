export default function CollectionPage({ title, loading, error, items, children }) {
  return (
    <section aria-labelledby="page-title">
      <h1 id="page-title" className="h2 mb-4">{title}</h1>
      {loading && <p role="status">Loading {title.toLowerCase()}...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && items.length === 0 && <p>No {title.toLowerCase()} found.</p>}
      {!loading && !error && items.length > 0 && children}
    </section>
  )
}
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from './useApiCollection.js'

export default function Teams() {
  const state = useApiCollection('teams')

  return (
    <CollectionPage title="Teams" {...state}>
      <div className="row g-3">
        {state.items.map((team, index) => (
          <div className="col-md-6 col-lg-4" key={team._id ?? team.id ?? team.name ?? index}>
            <article className="border rounded p-3 h-100">
              <h2 className="h5">{team.name ?? 'Unnamed team'}</h2>
              <p className="mb-1">Members: {team.members ?? 0}</p>
              {team.goal && <p className="text-secondary mb-0">{team.goal}</p>}
            </article>
          </div>
        ))}
      </div>
    </CollectionPage>
  )
}
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from './useApiCollection.js'

export default function Users() {
  const state = useApiCollection('users')

  return (
    <CollectionPage title="Users" {...state}>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>Name</th><th>Team</th><th>Points</th></tr></thead>
          <tbody>
            {state.items.map((user, index) => (
              <tr key={user._id ?? user.id ?? user.email ?? index}>
                <td>{user.name ?? '—'}</td>
                <td>{user.team ?? '—'}</td>
                <td>{user.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}
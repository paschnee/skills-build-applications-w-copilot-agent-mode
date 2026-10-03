import CollectionPage from './CollectionPage.jsx'
import useApiCollection from './useApiCollection.js'

export default function Activities() {
  const state = useApiCollection('activities')

  return (
    <CollectionPage title="Activities" {...state}>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>Athlete</th><th>Activity</th><th>Minutes</th><th>Points</th></tr></thead>
          <tbody>
            {state.items.map((activity, index) => (
              <tr key={activity._id ?? activity.id ?? index}>
                <td>{activity.user ?? activity.userName ?? '—'}</td>
                <td>{activity.type ?? activity.name ?? '—'}</td>
                <td>{activity.minutes ?? '—'}</td>
                <td>{activity.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from './useApiCollection.js'

export default function Leaderboard() {
  const state = useApiCollection('/api/leaderboard/')

  return (
    <CollectionPage title="Leaderboard" {...state}>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Points</th></tr></thead>
          <tbody>
            {state.items.map((entry, index) => (
              <tr key={entry._id ?? entry.id ?? index}>
                <td>{entry.rank ?? index + 1}</td>
                <td>{entry.name ?? entry.user ?? '—'}</td>
                <td>{entry.team ?? '—'}</td>
                <td>{entry.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}
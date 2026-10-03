import CollectionPage from './CollectionPage.jsx'
import useApiCollection from './useApiCollection.js'

export default function Workouts() {
  const state = useApiCollection('workouts')

  return (
    <CollectionPage title="Workouts" {...state}>
      <div className="list-group">
        {state.items.map((workout, index) => {
          const label = typeof workout === 'string'
            ? workout
            : workout.name ?? workout.title ?? workout.description ?? 'Workout'
          return <div className="list-group-item" key={workout._id ?? workout.id ?? index}>{label}</div>
        })}
      </div>
    </CollectionPage>
  )
}
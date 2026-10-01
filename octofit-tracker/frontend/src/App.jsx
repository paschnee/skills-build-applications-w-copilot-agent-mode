import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const metrics = [
  { label: 'Active students', value: '128', accent: 'primary' },
  { label: 'Weekly miles', value: '864', accent: 'success' },
  { label: 'Team streak', value: '11 days', accent: 'warning' },
]

const teams = [
  { name: 'Storm Squad', members: 18, progress: '84%' },
  { name: 'Lightning', members: 15, progress: '76%' },
  { name: 'Trail Blazers', members: 13, progress: '69%' },
]

const suggestions = [
  'Add a 20-minute interval run to boost endurance.',
  'Stretch for 10 minutes after practice to improve recovery.',
  'Focus on one full-body strength session this week.',
]

function Dashboard() {
  return (
    <>
      <section className="hero-panel mb-4">
        <div>
          <p className="eyebrow text-uppercase mb-2">OctoFit Tracker</p>
          <h1 className="display-5 fw-bold mb-3">Fitness progress that keeps students moving.</h1>
          <p className="lead text-secondary mb-0">
            Track workouts, celebrate team wins, and keep every student engaged with healthy habits.
          </p>
        </div>
      </section>

      <div className="row g-4 mb-4">
        {metrics.map((metric) => (
          <div className="col-md-4" key={metric.label}>
            <div className={`card border-0 shadow-sm h-100 text-bg-${metric.accent}`}>
              <div className="card-body">
                <p className="text-uppercase small mb-2 opacity-75">{metric.label}</p>
                <h2 className="display-6 fw-bold mb-0">{metric.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">Leaderboard</h3>
              <div className="list-group list-group-flush">
                {teams.map((team, index) => (
                  <div key={team.name} className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <span className="badge bg-primary rounded-pill me-2">#{index + 1}</span>
                      <strong>{team.name}</strong>
                    </div>
                    <div className="text-end">
                      <div>{team.members} members</div>
                      <small className="text-muted">{team.progress}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">Workout suggestions</h3>
              <ul className="list-group list-group-flush">
                {suggestions.map((suggestion) => (
                  <li key={suggestion} className="list-group-item px-0">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TeamsPage() {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="mb-3">Teams</h2>
        <p className="text-secondary mb-4">Build friendly competition with balanced teams and shared goals.</p>
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team.name}>
              <div className="border rounded-4 p-3 h-100">
                <h4>{team.name}</h4>
                <p className="mb-1 text-muted">{team.members} athletes</p>
                <div className="progress mt-3" role="progressbar" aria-label={team.name}>
                  <div className="progress-bar" style={{ width: team.progress }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkoutsPage() {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="mb-3">Workout plans</h2>
        <div className="list-group">
          {suggestions.map((item) => (
            <div key={item} className="list-group-item list-group-item-action">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <span className="navbar-brand fw-bold">OctoFit</span>
            <div className="navbar-nav ms-auto flex-row gap-3">
              <NavLink className="nav-link" to="/">Dashboard</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

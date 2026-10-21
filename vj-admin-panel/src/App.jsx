import React from 'react'
import AdminDashboard from './components/AdminDashboard'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AdminDashboard />
    </ErrorBoundary>
  )
}

export default App

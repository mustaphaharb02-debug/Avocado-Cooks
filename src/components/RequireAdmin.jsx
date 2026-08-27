import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Wraps the dashboard: signed-out visitors get the login page. */
export default function RequireAdmin({ children }) {
  const { user, isAdmin, loading, logout } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="admin-splash">
        <span className="admin-splash__dot">🥑</span>
        <p>Checking your account…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (!isAdmin) {
    return (
      <div className="admin-splash">
        <h1>Not an admin account</h1>
        <p>
          <strong>{user.email}</strong> is signed in, but it is not on the admin list.
        </p>
        <p className="admin-splash__hint">
          Add this e-mail to <code>VITE_ADMIN_EMAILS</code> and to the <code>isAdmin()</code>{' '}
          list in <code>firestore.rules</code>, then publish the rules again.
        </p>
        <button className="admin-btn" onClick={logout}>
          Sign out
        </button>
      </div>
    )
  }

  return children
}

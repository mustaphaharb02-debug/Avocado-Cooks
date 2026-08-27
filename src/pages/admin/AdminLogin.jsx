import React, { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth, authErrorMessage } from '../../context/AuthContext'
import './Admin.css'

export default function AdminLogin() {
  const { user, isAdmin, loading, login, resetPassword } = useAuth()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  if (!loading && user && isAdmin) {
    return <Navigate to={location.state?.from || '/admin'} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await login(email, password)
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Type your e-mail first, then press “Forgot password”.')
      return
    }
    setError('')
    try {
      await resetPassword(email)
      setNotice('Password reset e-mail sent. Check your inbox.')
    } catch (err) {
      setError(authErrorMessage(err))
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <img src="/images/logo.jpg" alt="" className="admin-login__logo" />
        <h1 className="admin-login__title">Avo Cooks admin</h1>
        <p className="admin-login__sub">Sign in to manage recipes</p>

        {error && <p className="admin-alert admin-alert--error">{error}</p>}
        {notice && <p className="admin-alert admin-alert--ok">{notice}</p>}

        <label className="admin-field">
          <span className="admin-field__label">E-mail</span>
          <input
            type="email"
            className="admin-input"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="admin-field">
          <span className="admin-field__label">Password</span>
          <input
            type="password"
            className="admin-input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="admin-btn admin-btn--block" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <button type="button" className="admin-link" onClick={handleReset}>
          Forgot password?
        </button>

        <Link to="/" className="admin-link">
          ← Back to the website
        </Link>
      </form>
    </div>
  )
}

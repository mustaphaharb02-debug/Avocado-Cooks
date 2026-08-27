import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import RequireAdmin from '../../components/RequireAdmin'
import AdminDashboard from './AdminDashboard'
import AdminLogin from './AdminLogin'
import './Admin.css'

/**
 * Everything behind /admin, in one lazy-loaded chunk — visitors never
 * download the dashboard, Firebase Auth or Firebase Storage.
 */
export default function AdminArea() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="*"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

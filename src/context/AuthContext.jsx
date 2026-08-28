import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { app, isAdminEmail, usingEmulators } from '../firebase'

export const auth = getAuth(app)

if (usingEmulators) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
}

const AuthContext = createContext(null)

/** Turns Firebase error codes into something a human can act on. */
export function authErrorMessage(err) {
  switch (err?.code) {
    case 'auth/invalid-email':
      return 'That e-mail address does not look right.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Wrong e-mail or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a minute and try again.'
    case 'auth/network-request-failed':
      return 'No connection to Firebase. Check your internet.'
    case 'auth/operation-not-allowed':
      return 'E-mail/password sign-in is not enabled in the Firebase console yet.'
    default:
      return err?.message || 'Something went wrong. Try again.'
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: isAdminEmail(user?.email),
      login: (email, password) =>
        signInWithEmailAndPassword(auth, email.trim(), password),
      logout: () => signOut(auth),
      resetPassword: (email) => sendPasswordResetEmail(auth, email.trim()),
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

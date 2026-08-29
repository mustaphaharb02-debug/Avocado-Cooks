// Auth and Storage are imported by the admin code only, so visitors never
// download them — see src/context/AuthContext.jsx and src/features/recipes/recipesApi.js.
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Firebase web config is public by design — it only identifies the project.
// Real protection lives in firestore.rules / storage.rules.
// Values can still be overridden per environment with a .env file
// (see .env.example).
const env = import.meta.env

const firebaseConfig = {
  apiKey:            env.VITE_FIREBASE_API_KEY            || "AIzaSyATBPOYJgAAadue6-lalDlokkdJLxshq1w",
  authDomain:        env.VITE_FIREBASE_AUTH_DOMAIN        || "avo-cooks.firebaseapp.com",
  projectId:         env.VITE_FIREBASE_PROJECT_ID         || "avo-cooks",
  storageBucket:     env.VITE_FIREBASE_STORAGE_BUCKET     || "avo-cooks.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "916894603653",
  appId:             env.VITE_FIREBASE_APP_ID             || "1:916894603653:web:45cd79f4b913f80a9d8cec",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Local development against the Firebase emulators: `npm run dev:emulated`.
// The flag lives in .env.local, which is git-ignored and never set on a
// deployed build, so a real visitor can never end up pointed at localhost.
// Referenced directly (not through `env`) so Vite can replace it at build
// time and drop the whole branch from the production bundle.
export const usingEmulators = import.meta.env.VITE_USE_EMULATORS === '1'

if (usingEmulators) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
  console.info('[firebase] using local emulators')
}

// Who may open the admin dashboard. Keep this list in sync with the
// isAdmin() e-mail list inside firestore.rules and storage.rules —
// this one only hides the UI, the rules are what actually protect data.
export const ADMIN_EMAILS = (env.VITE_ADMIN_EMAILS || "mustapha.harb02@gmail.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email) {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

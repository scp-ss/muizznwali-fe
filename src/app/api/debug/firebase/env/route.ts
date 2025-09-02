// src/app/api/debug/firebase/env/route.ts

export async function GET() {
  const rawEnv = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }

  const firebaseEnv = Object.entries(rawEnv).reduce((acc, [key, value]) => {
    acc[key] = {
      value: value ?? null,
      accessible: Boolean(value),
    }
    return acc
  }, {} as Record<string, { value: string | null; accessible: boolean }>)

  const missing = Object.entries(firebaseEnv)
    .filter(([, meta]) => !meta.accessible)
    .map(([key]) => key)

  return new Response(
    JSON.stringify({
      status: 'ok',
      firebaseEnv,
      missing,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

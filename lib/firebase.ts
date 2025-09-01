// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";

// Validate required environment variables
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0 && typeof window !== 'undefined') {
  console.error('Missing Firebase environment variables:', missingVars);
  console.error('Please check your .env.local file and make sure all NEXT_PUBLIC_FIREBASE_* variables are set');
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey,
  authDomain: requiredEnvVars.authDomain,
  databaseURL: requiredEnvVars.databaseURL,
  projectId: requiredEnvVars.projectId,
  storageBucket: requiredEnvVars.storageBucket,
  messagingSenderId: requiredEnvVars.messagingSenderId,
  appId: requiredEnvVars.appId,
  measurementId: requiredEnvVars.measurementId
};

// Initialize Firebase app
let app: FirebaseApp | null = null;
let database: Database | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;

// Only initialize Firebase in browser environment and if config is valid
if (typeof window !== 'undefined') {
  try {
    // Check if we have the minimum required config
    if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
      throw new Error('Firebase configuration is incomplete. Missing projectId or apiKey.');
    }

    // Initialize Firebase app (avoid duplicate initialization)
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    
    // Initialize services with error handling
    if (firebaseConfig.databaseURL) {
      try {
        database = getDatabase(app);
        console.log('Firebase Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Firebase Database:', error);
      }
    } else {
      console.warn('Firebase Database URL not configured');
    }

    try {
      auth = getAuth(app);
      console.log('Firebase Auth initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Firebase Auth:', error);
    }

    // Initialize Analytics (optional)
    if (firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized successfully');
      } catch (error) {
        console.warn('Failed to initialize Firebase Analytics:', error);
      }
    }

  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    console.error('Firebase Config:', {
      ...firebaseConfig,
      apiKey: firebaseConfig.apiKey ? '[REDACTED]' : 'MISSING',
    });
  }
} else {
  console.log('Firebase initialization skipped (server-side rendering)');
}

export { database, auth, analytics, app };
export default app;

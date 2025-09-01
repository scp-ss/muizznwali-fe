'use client';

import { auth } from '../lib/firebase';

export default function FirebaseDebug() {
  const checkConfig = () => {
    console.log('Firebase Auth Instance:', auth);
    console.log('Auth App:', auth?.app || 'Not available');
    console.log('Environment Variables:', {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Present' : '❌ Missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Present' : '❌ Missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Present' : '❌ Missing',
    });
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <h3 className="font-medium text-yellow-800">Firebase Debug</h3>
      <button
        onClick={checkConfig}
        className="mt-2 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
      >
        Check Firebase Config (Check Console)
      </button>
      <div className="mt-2 text-sm text-yellow-700">
        <p>Environment Variables:</p>
        <ul className="list-disc list-inside mt-1">
          <li>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Present' : '❌ Missing'}</li>
          <li>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Present' : '❌ Missing'}</li>
          <li>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Present' : '❌ Missing'}</li>
        </ul>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { writeData, readData, addData, listenToData } from '../../../lib/database';

export default function TestFirebase() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [posts, setPosts] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  // Test writing data
  const handleWriteData = async () => {
    setLoading(true);
    const success = await writeData('test/message', {
      text: 'Hello from Next.js!',
      timestamp: new Date().toISOString(),
      random: Math.random()
    });
    if (success) {
      setMessage('Data written successfully!');
    } else {
      setMessage('Failed to write data');
    }
    setLoading(false);
  };

  // Test reading data
  const handleReadData = async () => {
    setLoading(true);
    const result = await readData('test/message');
    setData(result as Record<string, unknown>);
    if (result) {
      setMessage('Data read successfully!');
    } else {
      setMessage('No data found');
    }
    setLoading(false);
  };

  // Test adding a post
  const handleAddPost = async () => {
    setLoading(true);
    const postId = await addData('posts', {
      title: 'Test Post',
      content: 'This is a test post from Next.js',
      author: 'Test User',
      timestamp: new Date().toISOString()
    });
    if (postId) {
      setMessage(`Post added successfully with ID: ${postId}`);
    } else {
      setMessage('Failed to add post');
    }
    setLoading(false);
  };

  // Test real-time listening
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const dbRef = listenToData('posts', (data) => {
      setPosts(data as Record<string, unknown>);
    });

    return () => {
      // Cleanup listener when component unmounts
      if (dbRef) {
        // Import and use the cleanup function
        import('../../../lib/database').then(({ stopListening }) => {
          stopListening(dbRef);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Firebase Test Page
        </h1>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleWriteData}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Writing...' : 'Write Test Data'}
            </button>

            <button
              onClick={handleReadData}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Reading...' : 'Read Test Data'}
            </button>

            <button
              onClick={handleAddPost}
              disabled={loading}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Test Post'}
            </button>
          </div>

          {message && (
            <div className="p-4 bg-blue-100 text-blue-700 rounded">
              {message}
            </div>
          )}

          {data && (
            <div className="p-4 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">Read Data:</h3>
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

          {posts && (
            <div className="p-4 bg-yellow-100 rounded">
              <h3 className="font-semibold mb-2">Real-time Posts:</h3>
              <pre className="text-sm overflow-x-auto max-h-64">
                {JSON.stringify(posts, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p>This page tests your Firebase Realtime Database connection.</p>
            <p>Check your browser console for detailed logs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

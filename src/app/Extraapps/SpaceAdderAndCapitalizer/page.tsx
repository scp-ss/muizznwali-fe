'use client';

import { useState } from 'react';

export default function SpaceAdderAndCapitalizer() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<{
    original: string;
    transformed: string;
    length: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with text:', inputText);

    if (!inputText.trim()) {
      setError('Please enter some text');
      console.log('No text entered');
      return;
    }

    setLoading(true);
    setError('');
    console.log('Starting API call...');

    try {
      const response = await fetch('/api/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to transform text: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      setResult(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(`Error transforming text: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Space Adder & Capitalizer
          </h1>
          <p className="text-lg text-gray-600">
            Transform your text by capitalizing all letters and adding spaces
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>• All letters become uppercase</p>
            <p>• 2 spaces added after each character</p>
            <p>• Existing spaces get 4 additional spaces (5 total)</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your text:
              </label>
              <textarea
                id="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your text here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Transforming...
                </span>
              ) : (
                'Transform Text'
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transformation Result</h2>

            <div className="space-y-4">
              {/* Original Text */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Original Text:</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-800 font-mono break-all">{result.original}</p>
                </div>
              </div>

              {/* Transformed Text */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Transformed Text:</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-mono break-all whitespace-pre-wrap">{result.transformed}</p>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{result.original.length}</div>
                  <div className="text-sm text-gray-600">Original Length</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.length}</div>
                  <div className="text-sm text-gray-600">Transformed Length</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How it Works</h2>
          <div className="prose prose-sm text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Capitalization:</strong> All letters are converted to uppercase</li>
              <li><strong>Spacing:</strong> Each character gets 2 spaces added after it</li>
              <li><strong>Space Enhancement:</strong> Existing spaces get 4 additional spaces (making 5 total)</li>
              <li><strong>Preservation:</strong> Numbers and special characters are processed the same way</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Example: "hi there" → "H  I       T  H  E  R  E  "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
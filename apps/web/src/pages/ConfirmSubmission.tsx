import React, { useState, useEffect } from 'react';

export function ConfirmSubmission() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [submissionType, setSubmissionType] = useState<string>('');
  const [submissionTitle, setSubmissionTitle] = useState<string>('');

  useEffect(() => {
    const confirmSubmission = async () => {
      try {
        // Get token from URL
        const pathParts = window.location.pathname.split('/');
        const token = pathParts[pathParts.length - 1];
        
        if (!token) {
          throw new Error('No confirmation token provided');
        }

        const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
        const response = await fetch(`${apiUrl}/api/submissions/confirm/${token}`, {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage(data.message);
          setSubmissionType(data.type);
          setSubmissionTitle(data.title);
        } else {
          setStatus('error');
          setMessage(data.error || 'Confirmation failed');
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setMessage('Failed to confirm submission. Please try again.');
      }
    };

    confirmSubmission();
  }, []);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleViewTerms = () => {
    window.location.href = '/terms';
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <div className="text-xl text-neutral-600">Confirming your submission...</div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-md mx-auto text-center pt-16">
          <div className="bg-white rounded-2xl border p-8">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Confirmation Failed</h1>
            <p className="text-neutral-600 mb-6">{message}</p>
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-md mx-auto text-center pt-16">
        <div className="bg-white rounded-2xl border p-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-600 mb-4">Submission Confirmed!</h1>
          <p className="text-neutral-600 mb-4">{message}</p>
          
          {submissionType && submissionTitle && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>{submissionType === 'term' ? 'Corporate Term' : 'Wall Post'}:</strong> "{submissionTitle}"
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleBackToHome}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              Back to Home
            </button>
            
            {submissionType === 'term' && (
              <button
                onClick={handleViewTerms}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-base font-medium rounded-full shadow-sm text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                Browse Terms
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

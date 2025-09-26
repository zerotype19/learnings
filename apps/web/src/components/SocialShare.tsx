import React, { useState } from 'react';

interface SocialShareProps {
  term: {
    title: string;
    definition: string;
    examples?: string;
    slug: string;
  };
  className?: string;
}

export function SocialShare({ term, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const baseUrl = 'https://learnings.org';
  const termUrl = `${baseUrl}/term/${term.slug}`;
  
  // Create the share text
  const shareText = `BREAKING: Learnings have been communicated:

"${term.title}" - ${term.definition}

${term.examples ? `Example: ${term.examples}` : ''}

Discover more corporate wisdom at ${termUrl}`;

  const linkedInText = `BREAKING: Learnings have been communicated:

"${term.title}" - ${term.definition}

${term.examples ? `Example: ${term.examples}` : ''}

Discover more corporate wisdom at ${termUrl}`;

  const twitterText = `BREAKING: Learnings have been communicated:

"${term.title}" - ${term.definition}

${term.examples ? `Example: ${term.examples}` : ''}

Discover more at ${termUrl}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToLinkedIn = () => {
    // LinkedIn sharing with URL only - LinkedIn will fetch metadata
    // Unfortunately, LinkedIn doesn't support pre-populating text via URL parameters
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(termUrl)}`;
    console.log('LinkedIn URL:', linkedInUrl);
    console.log('Term URL:', termUrl);
    console.log('Note: LinkedIn will fetch page metadata automatically');
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    console.log('Twitter URL:', twitterUrl);
    console.log('Term URL in text:', termUrl);
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(termUrl)}&quote=${encodeURIComponent(shareText)}`;
    console.log('Facebook URL:', facebookUrl);
    console.log('Term URL:', termUrl);
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
      >
        📢 Share Learnings
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </button>

      {showShareOptions && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[300px]">
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700 mb-2">Share this learning:</div>
            
            {/* Copy to Clipboard */}
            <button
              onClick={() => copyToClipboard(shareText)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                📋
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Copy Text</div>
                <div className="text-xs text-gray-500">Copy formatted text to clipboard</div>
              </div>
              {copied && <span className="text-green-600 text-xs ml-auto">Copied!</span>}
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareToLinkedIn}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Share on LinkedIn</div>
                <div className="text-xs text-gray-500">Professional network</div>
              </div>
            </button>

            {/* Twitter */}
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Share on Twitter</div>
                <div className="text-xs text-gray-500">Quick thoughts</div>
              </div>
            </button>

            {/* Facebook */}
            <button
              onClick={shareToFacebook}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Share on Facebook</div>
                <div className="text-xs text-gray-500">Social network</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Buzzword Generator Share Component
export function BuzzwordGeneratorShare({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const baseUrl = 'https://learnings.org';
  const generatorUrl = `${baseUrl}/generators/buzzword`;
  
  const shareText = `🎯 BREAKING: New corporate buzzword generator discovered!

Turn any workplace chaos into satirical buzzwords with the Learnings.org Buzzword Generator.

Try it now: ${generatorUrl}

#CorporateBuzzwords #Learnings #BuzzwordGenerator`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToLinkedIn = () => {
    // LinkedIn sharing URL - just pass the URL, LinkedIn will fetch the page metadata
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generatorUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2"
      >
        🎯 Share Generator
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </button>

      {showShareOptions && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[300px]">
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700 mb-2">Share the Buzzword Generator:</div>
            
            {/* Copy to Clipboard */}
            <button
              onClick={() => copyToClipboard(shareText)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                📋
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Copy Text</div>
                <div className="text-xs text-gray-500">Copy formatted text to clipboard</div>
              </div>
              {copied && <span className="text-green-600 text-xs ml-auto">Copied!</span>}
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareToLinkedIn}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Share on LinkedIn</div>
                <div className="text-xs text-gray-500">Professional network</div>
              </div>
            </button>

            {/* Twitter */}
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Share on Twitter</div>
                <div className="text-xs text-gray-500">Quick thoughts</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

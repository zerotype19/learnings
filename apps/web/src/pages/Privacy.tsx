import React from 'react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-soft">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
              Privacy Policy
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
            <p className="text-slate-600 mt-4">Last updated: January 2025</p>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <p className="text-lg text-slate-700 font-medium">
                We take your privacy seriously. This policy explains how we collect, 
                use, and protect your information when you use Learnings.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Information You Provide</h3>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
              <li>Content you submit (buzzword definitions, wall posts, comments)</li>
              <li>Account information if you create an account (email, username)</li>
              <li>Communications with us (support requests, feedback)</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Information We Collect Automatically</h3>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and general location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
              <li>To provide and improve our services</li>
              <li>To moderate content and prevent abuse</li>
              <li>To communicate with you about our services</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Information Sharing</h2>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>With service providers who help us operate our platform (under strict confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 mb-6">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Cookies and Tracking</h2>
            <p className="text-slate-600 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze how you use our site</li>
              <li>Provide personalized content and features</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Opt out of certain communications</li>
              <li>Request a copy of your data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Children's Privacy</h2>
            <p className="text-slate-600 mb-6">
              Our service is not intended for children under 13. We do not knowingly 
              collect personal information from children under 13. If you believe we 
              have collected information from a child under 13, please contact us.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-slate-600 mb-6">
              We may update this privacy policy from time to time. We will notify you 
              of any changes by posting the new policy on this page and updating the 
              "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about this privacy policy or our data practices, 
              please contact us at:
            </p>
            <div className="bg-slate-50 rounded-xl p-6">
              <p className="text-slate-700">
                <strong>Email:</strong> privacy@learnings.org<br />
                <strong>Website:</strong> <a href="/contact" className="text-brand-600 hover:text-brand-700">learnings.org/contact</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

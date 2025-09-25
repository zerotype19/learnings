import React, { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Contact Us
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
          <p className="text-slate-600 mt-6 max-w-2xl mx-auto">
            Have a buzzword that needs defining? Found a particularly egregious example 
            of corporate speak? We want to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Send us a message</h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800">Thanks for reaching out! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl2 border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition-all duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl2 border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl2 border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-xl2 border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl2 bg-brand text-white px-6 py-3 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-600">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <p className="text-slate-600">hello@learnings.org</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-600">🐦</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Twitter</p>
                    <p className="text-slate-600">@learnings_org</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-600">💼</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">LinkedIn</p>
                    <p className="text-slate-600">linkedin.com/company/learnings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">What we love to hear</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 mt-1">•</span>
                  <span>New buzzwords that need defining</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 mt-1">•</span>
                  <span>Feedback on our definitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 mt-1">•</span>
                  <span>Suggestions for new features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 mt-1">•</span>
                  <span>Bug reports or technical issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 mt-1">•</span>
                  <span>Partnership or collaboration ideas</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-brand-50 to-accent-pink/10 rounded-2xl border border-brand-200 p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Response time</h3>
              <p className="text-slate-600">
                We typically respond within 24-48 hours. For urgent matters, 
                please mention "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

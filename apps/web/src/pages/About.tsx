import React from 'react';

export function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-soft">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
              About Learnings
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="text-lg text-slate-600 mb-8">
              <p className="text-xl font-medium text-slate-900 mb-4">
                This prestigious and totally necessary institution, Learnings Dot Org, was founded in the early 2000s when society finally admitted what we all knew deep down: people simply cannot stop saying "learnings." Despite heroic efforts to resist, the term wormed its way into daily vocabulary—sometimes twice before lunch. The founding team, veterans of the LOL/AIM era who once swore never to let internet slang infect their keyboards, surrendered to the inevitable. Thus, Learnings Dot Org was born—part shrine, part cry for help, and fully committed to documenting the glorious nonsense of corporate buzzwords ever since.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">🎯 Our Mission</h3>
                <p className="text-slate-600">
                  To make corporate communication less painful by exposing the absurdity 
                  of business buzzwords through witty, satirical definitions that everyone 
                  can understand and laugh at.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">🤖 AI-Powered</h3>
                <p className="text-slate-600">
                  Our definitions are crafted with AI assistance to ensure they're both 
                  hilarious and accurate. We use advanced language models to create 
                  the perfect blend of corporate authenticity and comedic timing.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">What We Do</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Define Buzzwords</h3>
                    <p className="text-slate-600">
                      We take corporate jargon and give it satirical, witty definitions that 
                      expose the truth behind the buzzwords. From "synergy" to "paradigm shift," 
                      we've got you covered.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Generate Content</h3>
                    <p className="text-slate-600">
                      Our AI generators help you create authentic corporate content, from 
                      LinkedIn posts to email templates. Perfect for when you need to sound 
                      professional but don't want to think too hard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-brand-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Share the Laughs</h3>
                    <p className="text-slate-600">
                      Submit your own buzzwords, vote on definitions, and share the best 
                      (or worst) corporate speak you've encountered. It's a community 
                      effort to make work a little more bearable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">The Team</h2>
              <p className="text-slate-600 mb-6">
                Learnings is built by people who've sat through one too many meetings 
                where "synergy" was used unironically. We believe that corporate 
                communication doesn't have to be painful, and sometimes the best way 
                to deal with jargon is to laugh at it.
              </p>
              <p className="text-slate-600">
                Have a buzzword that needs defining? A particularly egregious example 
                of corporate speak? We want to hear about it. 
                <a href="/contact" className="text-brand-600 hover:text-brand-700 font-medium">
                  Get in touch
                </a> and help us build the ultimate corporate jargon dictionary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

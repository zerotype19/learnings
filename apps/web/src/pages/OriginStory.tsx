import React from 'react';
import { SEO } from '../components/SEO';

export function OriginStory() {
  return (
    <>
      <SEO 
        title="The Origin Story of Learnings.org"
        description="The real story behind why Learnings.org exists - because 'learnings' is not a word, and someone needed to call out the corporate Mad Libs."
        keywords="learnings origin story, corporate buzzwords, business jargon, language"
        canonical="/origin-story"
      />
      
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => window.location.href = '/'}
              className="text-brand-600 hover:text-brand-700 text-sm mb-6"
            >
              ← Back to Home
            </button>
            
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              The Origin Story of Learnings.org
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                "Learnings" is not a word. Never was. Never will be. It's corporate Mad Libs dressed up as vocabulary. The fact that it has weaseled its way into boardrooms, pitch decks, and LinkedIn humble-brags says more about our current age than it does about language.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                Let's rewind.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                Socrates sat in the agora, cross-examining everything from justice to virtue. The man gave us the foundation of Western philosophy. If "learnings" existed, you don't think he would have said, "One of my key learnings today is that Plato needs to chill"? He didn't. He said, "I know that I know nothing." Clean. Sharp. Eternal.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                Newton literally invented calculus in his downtime, discovered gravity, and wrote Principia Mathematica. He had more to show for a summer than most of us do in a career. At no point did he scribble in the margins: Key learnings: apples fall down, not up. No—he wrote laws of motion that still send rockets into space.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                Darwin sailed on the Beagle, cataloging the natural world until he pieced together the theory of evolution. Imagine him pitching On the Origin of Species in 2025: "One of my big learnings is that finches are kind of like A/B testing." No. He built a framework that reshaped biology forever.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                Einstein bent time and space. The guy turned the universe into a thought experiment and gave us relativity. If "learnings" was a word, maybe he'd have published: Special Theory of Key Learnings (1905). He didn't. He used words that mattered, because the work actually mattered.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                And yet here we are, 2025. A time when grown adults post slide decks full of "learnings" as if they've invented new laws of physics. As if "learnings" is a badge of insight, instead of a linguistic participation trophy.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                That's why Learnings.org exists. Not as a shrine to the nonsense, but as a mirror. To show how absurd it is that the giants of human history built the world on clarity, precision, and courage—while we, with all their progress at our fingertips, call our recycled bullet points "learnings."
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-8 font-semibold">
                Because here's the real learning: when everyone's full of shit, the only honest thing to do is call it out.
              </p>

              {/* Link to Terms */}
              <div className="text-center pt-8 border-t border-slate-200">
                <a
                  href="/terms"
                  className="inline-flex items-center gap-2 rounded-xl2 bg-brand text-white px-6 py-3 text-sm font-medium hover:bg-brand-700 transition-all duration-200 shadow-soft hover:shadow-lg hover:-translate-y-0.5"
                >
                  Explore 2,000+ Buzzwords
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

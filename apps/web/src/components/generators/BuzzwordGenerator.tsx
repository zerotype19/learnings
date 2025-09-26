import React, { useState } from 'react';
import { getApiUrl } from '../../utils/getApiUrl';

interface BuzzwordGeneratorProps {
  className?: string;
}

interface BuzzwordRequest {
  scenario: string;
  tone: 'straight' | 'snarky';
  format: 'verb_noun' | 'noun_noun' | 'adj_noun' | 'surprise';
  edge: 'safe' | 'spicy';
}

interface BuzzwordResponse {
  buzzword: string;
  why?: string;
}

const helperPrompts = [
  "Managers renaming layoffs as talent mobility",
  "Meetings to plan the next meeting",
  "Old product rebranded as AI",
  "Dashboards refreshed weekly with no insights",
  "Executives reframing problems as opportunities",
  "Standups all day, zero shipping",
  "Renaming bugs as enhancements",
  "Reorg chaos sold as simplification",
  "Twenty people in 'alignment' meetings",
  "Every plan turned into a framework",
  "Interns titled Chief of Staff",
  "Pilots that never launch",
  "New logo instead of strategy",
  "Process added until nothing ships",
  "Rightsizing used to mask layoffs",
  "OKRs rewritten weekly",
  "New Slack channels instead of decisions",
  "Support rebranded as success with no change",
  "Roadmap changes every sprint",
  "Buying tools to avoid training",
  "Simple task becomes cross-functional saga",
  "Only positive metrics reported",
  "Press release posing as strategy",
  "Minor update sold as breakthrough",
  "Mandatory office sold as flexibility",
  "Renaming layoffs as redeployment",
  "Endless discovery, no delivery",
  "Brainstorm replaces commitment",
  "Vendor demo promises everything",
  "Spreadsheets treated as truth"
];

export function BuzzwordGenerator({ className = '' }: BuzzwordGeneratorProps) {
  const [scenario, setScenario] = useState('');
  const [tone, setTone] = useState<'straight' | 'snarky'>('straight');
  const [format, setFormat] = useState<'verb_noun' | 'noun_noun' | 'adj_noun' | 'surprise'>('surprise');
  const [edge, setEdge] = useState<'safe' | 'spicy'>('safe');
  const [buzzword, setBuzzword] = useState('');
  const [why, setWhy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleGenerate = async () => {
    if (!scenario.trim()) {
      setError('Please enter a scenario');
      return;
    }

    if (scenario.length > 280) {
      setError('Scenario must be 280 characters or less');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/buzzword/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: scenario.trim(),
          tone,
          format,
          edge
        } as BuzzwordRequest)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate buzzword');
      }

      const data: BuzzwordResponse = await response.json();
      setBuzzword(data.buzzword);
      setWhy(data.why || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buzzword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleHelperClick = (prompt: string) => {
    setScenario(prompt);
    setError('');
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-soft ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          🎯 Buzzword Generator
        </h2>
        <p className="text-slate-600">
          Turn corporate chaos into satirical buzzwords
        </p>
      </div>

      <div className="space-y-4">
        {/* Scenario Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Describe the corporate phenomenon
          </label>
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="e.g., Managers renaming layoffs as 'talent mobility'"
            className="w-full min-h-[120px] px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
            maxLength={280}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-slate-500">
              {scenario.length}/280 characters
            </span>
            {error && (
              <span className="text-xs text-red-600">{error}</span>
            )}
          </div>
        </div>

        {/* Helper Prompts */}
        <div>
          <p className="text-sm text-slate-600 mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {helperPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleHelperClick(prompt)}
                className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Style Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as 'straight' | 'snarky')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="straight">Straight</option>
              <option value="snarky">Snarky</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="surprise">Surprise Me</option>
              <option value="verb_noun">Verb Noun</option>
              <option value="noun_noun">Noun Noun</option>
              <option value="adj_noun">Adjective Noun</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Edge
            </label>
            <select
              value={edge}
              onChange={(e) => setEdge(e.target.value as 'safe' | 'spicy')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="safe">Safe</option>
              <option value="spicy">Spicy</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !scenario.trim()}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white font-medium py-3 px-4 rounded-xl transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Buzzword'}
        </button>

        {/* Result Display */}
        {buzzword && (
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2 select-all cursor-pointer" onClick={handleCopy}>
                {buzzword}
              </div>
              {why && (
                <div className="text-sm text-slate-600 mb-4" title={why}>
                  {why}
                </div>
              )}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleRegenerate}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                >
                  Regenerate
                </button>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Save to Terms
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Modal - We'll implement this next */}
      {showSaveModal && (
        <SaveToTermsModal
          buzzword={buzzword}
          scenario={scenario}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}

// Save to Terms Modal
function SaveToTermsModal({ buzzword, scenario, onClose }: { buzzword: string; scenario: string; onClose: () => void }) {
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [tags, setTags] = useState('buzzword,generator');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate definition and example when modal opens
  React.useEffect(() => {
    const generateContent = async () => {
      setLoading(true);
      try {
        const apiUrl = getApiUrl();
        
        // Generate definition
        const defResponse = await fetch(`${apiUrl}/api/buzzword/generate-definition`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ buzzword, scenario })
        });
        
        if (defResponse.ok) {
          const defData = await defResponse.json();
          setDefinition(defData.definition || '');
        }

        // Generate example
        const exResponse = await fetch(`${apiUrl}/api/buzzword/generate-example`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ buzzword, scenario })
        });
        
        if (exResponse.ok) {
          const exData = await exResponse.json();
          setExample(exData.example || '');
        }
      } catch (err) {
        console.error('Failed to generate content:', err);
        // Fallback definitions
        setDefinition(`A corporate buzzword that sounds important but usually means nothing.`);
        setExample(`"We need to ${buzzword.toLowerCase()} on this initiative."`);
      } finally {
        setLoading(false);
      }
    };

    generateContent();
  }, [buzzword, scenario]);

  const handleSave = async () => {
    if (!definition.trim()) {
      setError('Definition is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/buzzword/save-term`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buzzword,
          definition: definition.trim(),
          example: example.trim() || undefined,
          tags: tags.split(',').map(t => t.trim()).filter(t => t),
          scenario
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save term');
      }

      const data = await response.json();
      
      // Show success and close modal
      alert(`"${buzzword}" has been saved to the terms database!`);
      onClose();
      
      // Optionally redirect to the new term
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save term');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-4">Save "{buzzword}" to Terms</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Definition *
            </label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Enter a witty definition..."
              className="w-full min-h-[100px] px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Example (optional)
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Enter an example sentence..."
              className="w-full min-h-[80px] px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="buzzword,generator,corporate"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || loading || !definition.trim()}
              className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : loading ? 'Generating...' : 'Save to Terms'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

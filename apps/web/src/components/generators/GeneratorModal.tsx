import React, { useState } from 'react';

type Generator = {
  id: string;
  slug: string;
  name: string;
  description: string;
  options_schema: Record<string, any>;
};

type GeneratorModalProps = {
  generator: Generator;
  isOpen: boolean;
  onClose: () => void;
  initialInputs?: Record<string, string>;
};

export function GeneratorModal({ generator, isOpen, onClose, initialInputs = {} }: GeneratorModalProps) {
  const [inputs, setInputs] = useState<Record<string, string>>(initialInputs);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [madePublic, setMadePublic] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';

  const handleGenerate = async () => {
    if (loading) return;

    // Validate required inputs
    const schema = generator.options_schema || {};
    for (const [key, config] of Object.entries(schema)) {
      if (config.required && !inputs[key]?.trim()) {
        alert(`${config.label || key} is required`);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/generate/${generator.slug}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs,
          options,
          made_public: madePublic
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Generation failed');
      }

      const result = await response.json();
      
      // Handle different output formats
      if (generator.slug === 'professor') {
        try {
          const parsed = JSON.parse(result.output_text);
          setOutput(`Academic: ${parsed.academic_tone}\n\nPlain English: ${parsed.plain_translation}\n\nFramework: ${parsed.optional_framework}`);
        } catch {
          setOutput(result.output_text);
        }
      } else {
        setOutput(result.output_text);
      }

    } catch (error) {
      console.error('Generation failed:', error);
      setOutput(`Generation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    alert('Output copied to clipboard!');
  };

  const shareOutput = () => {
    if (navigator.share) {
      navigator.share({
        title: `${generator.name} Output`,
        text: output.substring(0, 200),
        url: window.location.href
      });
    } else {
      copyOutput();
    }
  };

  if (!isOpen) return null;

  const schema = generator.options_schema || {};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{generator.name}</h2>
              <p className="text-sm text-neutral-600 mt-1">{generator.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Input Fields */}
          <div className="space-y-4 mb-6">
            {Object.entries(schema).map(([key, config]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {config.label || key}
                  {config.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {config.type === 'textarea' ? (
                  <textarea
                    value={inputs[key] || ''}
                    onChange={(e) => setInputs(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={config.placeholder || ''}
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={inputs[key] || ''}
                    onChange={(e) => setInputs(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={config.placeholder || ''}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                  />
                )}
              </div>
            ))}

            {/* Public sharing option */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="made_public"
                checked={madePublic}
                onChange={(e) => setMadePublic(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="made_public" className="text-sm text-neutral-600">
                Share anonymously on home feed
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-4 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Generating...' : `Generate with ${generator.name}`}
          </button>

          {/* Output */}
          {output && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Output</h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyOutput}
                    className="px-3 py-1 text-xs border border-neutral-200 rounded-lg hover:bg-neutral-50"
                  >
                    Copy
                  </button>
                  <button
                    onClick={shareOutput}
                    className="px-3 py-1 text-xs border border-neutral-200 rounded-lg hover:bg-neutral-50"
                  >
                    Share
                  </button>
                </div>
              </div>
              <div className="bg-neutral-50 border rounded-xl p-4 whitespace-pre-wrap text-sm">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

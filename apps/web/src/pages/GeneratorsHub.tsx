import React, { useState, useEffect } from 'react';
import { getGenerators, runGenerator, trackEvent } from '../lib/api';
import { SEO, SEOConfigs } from '../components/SEO';

type Generator = {
  id: string;
  slug: string;
  name: string;
  description: string;
  options_schema: Record<string, any>;
};

type GeneratorRun = {
  id: string;
  generator_id: string;
  output_text: string;
  generator_name: string;
  cached: boolean;
  created_at?: string;
};

export function GeneratorsHub() {
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [activeGenerator, setActiveGenerator] = useState<string>('');
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [result, setResult] = useState<GeneratorRun | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatorsLoading, setGeneratorsLoading] = useState(true);

  // Load generators on mount
  useEffect(() => {
    const loadGenerators = async () => {
      try {
        const data = await getGenerators();
        setGenerators(data.items || []);
        if (data.items && data.items.length > 0) {
          setActiveGenerator(data.items[0].slug);
        }
      } catch (error) {
        console.error('Failed to load generators:', error);
      } finally {
        setGeneratorsLoading(false);
      }
    };

    loadGenerators();
  }, []);

  const handleGeneratorSelect = (generator: Generator) => {
    setActiveGenerator(generator.slug);
    setInputs({});
    setResult(null);
  };

  const handleInputChange = (key: string, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!activeGenerator || !inputs || Object.keys(inputs).length === 0) return;

    setLoading(true);
    try {
      const generator = generators.find(g => g.slug === activeGenerator);
      if (!generator) return;

      const run = await runGenerator(activeGenerator, {
        inputs,
        made_public: true
      });

      setResult(run);

      // Track usage
      trackEvent('generator_used', {
        generator_slug: activeGenerator,
        generator_name: generator.name,
        cached: run.cached || false
      });

    } catch (error) {
      console.error('Generation failed:', error);
      alert('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getInputComponent = (key: string, schema: any) => {
    const value = inputs[key] || '';
    
    if (schema.type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleInputChange(key, e.target.value)}
          placeholder={schema.placeholder || `Enter ${schema.label?.toLowerCase() || key}`}
          className="w-full p-3 border rounded-lg resize-none"
          rows={4}
        />
      );
    }
    
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(key, e.target.value)}
        placeholder={schema.placeholder || `Enter ${schema.label?.toLowerCase() || key}`}
        className="w-full p-3 border rounded-lg"
      />
    );
  };

  const currentGenerator = generators.find(g => g.slug === activeGenerator);

  if (generatorsLoading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO {...SEOConfigs.generators} />
      <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Generators Hub</h1>
        <p className="text-gray-600">AI-powered tools to create, analyze, and roast corporate content</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Generator Selection & Input */}
        <div className="space-y-6">
          {/* Generator Picker */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose Generator</h2>
            <div className="grid gap-3">
              {generators.map((generator) => (
                <button
                  key={generator.id}
                  onClick={() => handleGeneratorSelect(generator)}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    activeGenerator === generator.slug
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{generator.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{generator.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          {currentGenerator && (
            <div>
              <h3 className="text-lg font-medium mb-4">Configure {currentGenerator.name}</h3>
              <div className="space-y-4">
                {Object.entries(currentGenerator.options_schema).map(([key, schema]: [string, any]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-2">
                      {schema.label || key}
                      {schema.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {getInputComponent(key, schema)}
                  </div>
                ))}
                
                <button
                  onClick={handleGenerate}
                  disabled={loading || !inputs || Object.keys(inputs).length === 0}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  {loading ? 'Generating...' : `Generate ${currentGenerator.name}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          
          {result ? (
            <div className="space-y-4">
              {/* Generator Info */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{result.generator_name}</div>
                  <div className="text-sm text-gray-600">
                    {result.cached ? 'Cached result' : 'Fresh generation'}
                  </div>
                </div>
                {result.run_id && (
                  <div className="text-xs text-gray-500">
                    #{result.run_id.slice(-8)}
                  </div>
                )}
              </div>

              {/* Output Content */}
              <div className="border rounded-lg">
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Generated Content</span>
                    <button
                      onClick={() => copyToClipboard(result.output_text)}
                      className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {result.generator_name === 'Professor Translator' ? (
                    <ProfessorOutput output={result.output_text} />
                  ) : (
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {result.output_text}
                    </pre>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(result.output_text)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-gray-600">Generate content to see results here</div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

// Special component for Professor Translator output
function ProfessorOutput({ output }: { output: string }) {
  try {
    const parsed = JSON.parse(output);
    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-blue-600 mb-2">Academic Tone</h4>
          <p className="text-sm bg-blue-50 p-3 rounded">{parsed.academic_tone}</p>
        </div>
        <div>
          <h4 className="font-medium text-green-600 mb-2">Plain Translation</h4>
          <p className="text-sm bg-green-50 p-3 rounded">{parsed.plain_translation}</p>
        </div>
        {parsed.optional_framework && (
          <div>
            <h4 className="font-medium text-purple-600 mb-2">Framework</h4>
            <p className="text-sm bg-purple-50 p-3 rounded">{parsed.optional_framework}</p>
          </div>
        )}
      </div>
    );
  } catch {
    return (
      <pre className="whitespace-pre-wrap text-sm font-mono">
        {output}
      </pre>
    );
  }
}
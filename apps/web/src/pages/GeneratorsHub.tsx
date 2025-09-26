import React, { useState, useEffect } from 'react';
import { getGenerators, runGenerator, trackEvent } from '../lib/api';
import { SEO, SEOConfigs } from '../components/SEO';
import { BuzzwordGenerator } from '../components/generators/BuzzwordGenerator';
import { BuzzwordGeneratorShare } from '../components/SocialShare';

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

  const getGenerateButtonText = (generatorName: string) => {
    switch (generatorName) {
      case 'LinkedIn Post Generator':
        return 'Generate LinkedIn Post';
      case 'Buzzword Roast':
        return 'Roast Buzzword';
      case 'Professor Translator':
        return 'Translate';
      default:
        return `Generate ${generatorName}`;
    }
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
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
                Generators Hub
              </h1>
              <div className="mt-2 h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                AI-powered tools to create, analyze, and roast corporate content
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Buzzword Generator - Featured */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">Featured Generator</h2>
              <div className="flex items-center gap-4">
                <BuzzwordGeneratorShare />
                <a 
                  href="/generators/buzzword" 
                  className="text-brand-600 hover:text-brand-700 text-sm font-medium"
                >
                  View Full Page →
                </a>
              </div>
            </div>
            <BuzzwordGenerator />
          </div>

          {/* Other Generators */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Other Generators</h2>
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
                  {loading ? 'Generating...' : getGenerateButtonText(currentGenerator.name)}
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
                    <GeneratorOutput output={result.output_text} generatorName={result.generator_name} />
                  )}
                </div>
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
      </div>
    </>
  );
}

// Component for parsing and formatting generator output
function GeneratorOutput({ output, generatorName }: { output: string; generatorName: string }) {
  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(output);
    
    // Handle different generator types
    if (generatorName === 'LinkedIn Post Generator') {
      // LinkedIn posts are typically returned as an array of strings
      if (Array.isArray(parsed)) {
        return (
          <div className="space-y-4">
            {parsed.map((post, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Post {index + 1}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(post)}
                    className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-sm">{post}</p>
              </div>
            ))}
          </div>
        );
      }
    } else if (generatorName === 'Buzzword Roast') {
      // Buzzword roasts might be returned as an object or string
      if (typeof parsed === 'object' && parsed.roast) {
        return (
          <div className="space-y-4">
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h4 className="font-medium text-red-600 mb-2">🔥 Roast</h4>
              <p className="text-sm">{parsed.roast}</p>
            </div>
            {parsed.explanation && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-600 mb-2">Why it's funny</h4>
                <p className="text-sm">{parsed.explanation}</p>
              </div>
            )}
          </div>
        );
      } else if (typeof parsed === 'string') {
        return (
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <h4 className="font-medium text-red-600 mb-2">🔥 Roast</h4>
            <p className="text-sm">{parsed}</p>
          </div>
        );
      }
    }
    
    // Fallback: display as formatted JSON
    return (
      <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-3 rounded">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    );
  } catch {
    // If not JSON, display as plain text
    return (
      <div className="whitespace-pre-wrap text-sm">
        {output}
      </div>
    );
  }
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
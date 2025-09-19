import React, { useState, useEffect } from 'react';
import { GeneratorModal } from '../components/generators/GeneratorModal';

type Generator = {
  id: string;
  slug: string;
  name: string;
  description: string;
  options_schema: Record<string, any>;
};

export function GeneratorsHub() {
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenerator, setSelectedGenerator] = useState<Generator | null>(null);
  const [modalInputs, setModalInputs] = useState<Record<string, string>>({});

  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';

  useEffect(() => {
    loadGenerators();
    
    // Listen for generator prefill events
    const handleGeneratorPrefill = (e: CustomEvent) => {
      const { generator, inputs } = e.detail;
      const gen = generators.find(g => g.slug === generator);
      if (gen) {
        setSelectedGenerator(gen);
        setModalInputs(inputs || {});
      }
    };

    window.addEventListener('generator:open', handleGeneratorPrefill as EventListener);
    return () => window.removeEventListener('generator:open', handleGeneratorPrefill as EventListener);
  }, [generators]);

  const loadGenerators = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/generators`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setGenerators(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load generators:', error);
    } finally {
      setLoading(false);
    }
  };

  const openGenerator = (generator: Generator, initialInputs: Record<string, string> = {}) => {
    setSelectedGenerator(generator);
    setModalInputs(initialInputs);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-neutral-600">Loading generators...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">🤖 AI Generators</h1>
          <p className="text-neutral-600">
            Professional corporate content tools powered by AI. Transform jargon, generate posts, and roast buzzwords.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => {
                const gen = generators.find(g => g.slug === 'professor');
                if (gen) openGenerator(gen);
              }}
              className="p-4 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow text-left"
            >
              <div className="font-medium mb-1">🎓 Translate Jargon</div>
              <div className="text-sm text-neutral-600">Get plain English translations</div>
            </button>
            
            <button
              onClick={() => window.location.hash = '/bingo'}
              className="p-4 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow text-left"
            >
              <div className="font-medium mb-1">🎯 Buzzword Bingo</div>
              <div className="text-sm text-neutral-600">Generate bingo cards</div>
            </button>

            <button
              onClick={() => {
                const gen = generators.find(g => g.slug === 'roast');
                if (gen) openGenerator(gen);
              }}
              className="p-4 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow text-left"
            >
              <div className="font-medium mb-1">🔥 Roast Buzzwords</div>
              <div className="text-sm text-neutral-600">Satirical takes on corporate speak</div>
            </button>
          </div>
        </div>

        {/* All Generators */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">All Generators</h2>
          {generators.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              No generators available
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generators.map(generator => (
                <GeneratorCard
                  key={generator.id}
                  generator={generator}
                  onRun={(inputs) => openGenerator(generator, inputs)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Legacy Generators */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Classic Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.location.hash = '/linkedin'}
              className="p-4 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow text-left"
            >
              <div className="font-medium mb-1">📝 LinkedIn Generators</div>
              <div className="text-sm text-neutral-600">Posts, comments, and emails</div>
            </button>
            
            <button
              onClick={() => window.location.hash = '/challenges'}
              className="p-4 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow text-left"
            >
              <div className="font-medium mb-1">🏆 Weekly Challenges</div>
              <div className="text-sm text-neutral-600">Community competitions</div>
            </button>
          </div>
        </div>
      </div>

      {/* Generator Modal */}
      {selectedGenerator && (
        <GeneratorModal
          generator={selectedGenerator}
          isOpen={!!selectedGenerator}
          onClose={() => setSelectedGenerator(null)}
          initialInputs={modalInputs}
        />
      )}
    </div>
  );
}

type GeneratorCardProps = {
  generator: Generator;
  onRun: (inputs: Record<string, string>) => void;
};

function GeneratorCard({ generator, onRun }: GeneratorCardProps) {
  const handleQuickRun = () => {
    // For simple generators, open with empty inputs
    onRun({});
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg mb-2">{generator.name}</h3>
      <p className="text-sm text-neutral-600 mb-4">{generator.description}</p>
      
      <button
        onClick={handleQuickRun}
        className="w-full px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
      >
        Run Generator
      </button>
    </div>
  );
}

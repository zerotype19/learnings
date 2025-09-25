import React, { useState, useEffect } from 'react';
import { SEO, SEOConfigs } from '../components/SEO';
import { getApiUrl } from '../utils/getApiUrl';

type BingoSquare = { title: string; slug: string; isFree: boolean };

export function Bingo() {
  const [board, setBoard] = useState<BingoSquare[]>([]);
  const [boardId, setBoardId] = useState<string>('');
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const apiUrl = getApiUrl();
  
  // Auto-generate board on component mount
  useEffect(() => {
    generateBoard();
  }, []);
  
  const generateBoard = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl + '/v1/bingo/generate');
      const data = await response.json();
      setBoard(data.board);
      setBoardId(data.boardId);
      setMarked(new Set([12])); // Mark the FREE space
    } catch (error) {
      console.error('Failed to generate bingo board:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleSquare = (index: number) => {
    const newMarked = new Set(marked);
    if (newMarked.has(index)) {
      newMarked.delete(index);
    } else {
      newMarked.add(index);
    }
    setMarked(newMarked);
  };
  
  const shareBoard = () => {
    const url = `${location.origin}/bingo/${boardId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Corporate Buzzword Bingo',
        text: 'Test your corporate jargon knowledge!',
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Bingo board link copied to clipboard!');
    }
  };
  
  const checkWin = () => {
    if (marked.size < 5) return false;
    
    // Check rows
    for (let row = 0; row < 5; row++) {
      let rowComplete = true;
      for (let col = 0; col < 5; col++) {
        if (!marked.has(row * 5 + col)) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) return true;
    }
    
    // Check columns
    for (let col = 0; col < 5; col++) {
      let colComplete = true;
      for (let row = 0; row < 5; row++) {
        if (!marked.has(row * 5 + col)) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) return true;
    }
    
    // Check diagonals
    let diag1 = true, diag2 = true;
    for (let i = 0; i < 5; i++) {
      if (!marked.has(i * 5 + i)) diag1 = false;
      if (!marked.has(i * 5 + (4 - i))) diag2 = false;
    }
    
    return diag1 || diag2;
  };
  
  const hasWon = checkWin();
  
  return (
    <>
      <SEO {...SEOConfigs.bingo} />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
                🎯 Corporate Buzzword Bingo
              </h1>
              <div className="mt-2 h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                Mark off buzzwords as you hear them in meetings. First to get 5 in a row wins!
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {!board.length && loading ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-white">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating your bingo board...
              </div>
            </div>
          ) : !board.length ? (
            <div className="text-center">
              <button 
                onClick={generateBoard}
                disabled={loading}
                className="rounded-xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate New Board'}
              </button>
            </div>
          ) : (
        <>
          {hasWon && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
              <div className="text-lg font-bold text-green-700">🎉 BINGO!</div>
              <div className="text-sm text-green-600">You've achieved peak corporate awareness!</div>
            </div>
          )}
          
          <div className="grid grid-cols-5 gap-2 mb-6 max-w-lg mx-auto">
            {board.map((square, index) => (
              <button
                key={index}
                onClick={() => toggleSquare(index)}
                className={`
                  aspect-square p-2 text-xs font-medium rounded-lg border-2 transition-all
                  ${marked.has(index) 
                    ? 'bg-brand-100 border-brand-300 text-brand-700' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }
                  ${square.isFree ? 'bg-neutral-100 border-neutral-300' : ''}
                `}
              >
                {square.title}
              </button>
            ))}
          </div>
          
          <div className="text-center space-x-4">
            <button 
              onClick={generateBoard}
              className="rounded-xl border px-4 py-2 hover:bg-neutral-50 transition-colors"
            >
              🎲 New Board
            </button>
            <button 
              onClick={shareBoard}
              className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 transition-colors"
            >
              📤 Share Board
            </button>
          </div>
        </>
      )}
        </div>
      </div>
    </>
  );
}

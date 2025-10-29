
import React, { useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ScriptOutputProps {
  script: string;
  isLoading: boolean;
  error: string | null;
}

const ScriptOutput: React.FC<ScriptOutputProps> = ({ script, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (script) {
      navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <svg className="animate-spin h-10 w-10 text-purple-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold text-gray-300">La IA está escribiendo tu guión...</p>
            <p className="text-gray-400">Esto puede tardar unos segundos.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center p-8 h-full text-center bg-red-900/20 border border-red-500/50 rounded-lg">
          <div>
            <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      );
    }

    if (!script) {
      return (
        <div className="flex items-center justify-center text-center p-8 h-full">
          <div>
            <h3 className="text-xl font-bold text-gray-400">Tu guión aparecerá aquí</h3>
            <p className="text-gray-500">Completa los campos y haz clic en "Generar Guión con IA" para empezar.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-purple-300 prose-strong:text-white max-w-none p-6">
        {script.split('\n').map((line, index) => (
          <p key={index} className="mb-4">{line}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 min-h-[500px] lg:min-h-0 flex flex-col relative">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-gray-200">Guión Generado</h2>
        {script && !isLoading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
          >
            <ClipboardIcon className="w-4 h-4" />
            {copied ? '¡Copiado!' : 'Copiar Guión'}
          </button>
        )}
      </div>
      <div className="overflow-y-auto flex-grow">
        {renderContent()}
      </div>
    </div>
  );
};

export default ScriptOutput;

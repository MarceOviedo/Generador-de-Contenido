
import React, { useState, useCallback } from 'react';
import { ScriptInput } from './types';
import { generateScript } from './services/geminiService';
import ScriptInputForm from './components/ScriptInputForm';
import ScriptOutput from './components/ScriptOutput';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [scriptInput, setScriptInput] = useState<ScriptInput>({
    problem: '',
    credential: '',
    method: '',
    example: '',
    nextStep: '',
  });
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setScriptInput(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleGenerateScript = async () => {
    // Basic validation
    // FIX: Added a type guard to ensure 'value' is a string before calling 'trim'.
    if (Object.values(scriptInput).some(value => typeof value === 'string' && value.trim() === '')) {
      setError('Por favor, completa todos los campos para generar el guión.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedScript('');

    try {
      const script = await generateScript(scriptInput);
      setGeneratedScript(script);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado al contactar al servicio de IA. Por favor, revisa la consola para más detalles.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <SparklesIcon className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Generador de Guiones AI
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Crea guiones para tus videos de Canva usando la poderosa plantilla de 5 bloques.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScriptInputForm
            scriptInput={scriptInput}
            onInputChange={handleInputChange}
            onGenerate={handleGenerateScript}
            isLoading={isLoading}
          />
          <ScriptOutput
            script={generatedScript}
            isLoading={isLoading}
            error={error}
          />
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Canva Script Generator. Potenciado por IA.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

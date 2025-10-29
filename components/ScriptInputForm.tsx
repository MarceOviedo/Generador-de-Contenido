
import React from 'react';
import { ScriptInput } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface ScriptInputFormProps {
  scriptInput: ScriptInput;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

interface BlockConfig {
  key: keyof ScriptInput;
  label: string;
  placeholder: string;
  description: string;
}

const blocks: BlockConfig[] = [
  { key: 'problem', label: '1. El Problema que vas a Resolver', placeholder: 'Ej: "¿No sabes por dónde empezar tu canal sin gastar en equipo caro?"', description: 'Nombra el dolor de tu audiencia en una sola frase.' },
  { key: 'credential', label: '2. Tu Credencial (¿Por qué tú?)', placeholder: 'Ej: "Llevo 7 años creando contenido y empecé con solo mi teléfono."', description: 'Presenta tu experiencia de forma breve y concreta.' },
  { key: 'method', label: '3. Método Claro (Máximo 3 Pasos)', placeholder: 'Ej: "1. Define tu nicho. 2. Crea un calendario. 3. Graba con lo que tienes."', description: 'Explica tu solución en 3 pasos accionables.' },
  { key: 'example', label: '4. Un Ejemplo Rápido', placeholder: 'Ej: "Grabaré un clip de 30 segundos ahora mismo para mostrarte."', description: 'Ofrece una demostración rápida de tu método.' },
  { key: 'nextStep', label: '5. El Próximo Paso (Llamado a la acción)', placeholder: 'Ej: "Graba tu propia introducción de 60 segundos y compártela."', description: 'Indica a tu audiencia qué hacer a continuación.' },
];

const ScriptInputForm: React.FC<ScriptInputFormProps> = ({ scriptInput, onInputChange, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Completa los 5 Bloques</h2>
      <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} className="space-y-6">
        {blocks.map(block => (
          <div key={block.key}>
            <label htmlFor={block.key} className="block text-md font-semibold text-purple-300 mb-1">{block.label}</label>
            <p className="text-sm text-gray-400 mb-2">{block.description}</p>
            <textarea
              id={block.key}
              name={block.key}
              value={scriptInput[block.key]}
              onChange={onInputChange}
              placeholder={block.placeholder}
              rows={3}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-y"
              disabled={isLoading}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando Guión...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generar Guión con IA
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ScriptInputForm;


import { GoogleGenAI } from "@google/genai";
import { ScriptInput } from '../types';

export const generateScript = async (input: ScriptInput): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Actúa como un guionista experto para un canal de YouTube enfocado en diseño con Canva. Tu tarea es tomar la siguiente estructura de 5 bloques y expandirla en un guión de video completo, atractivo y profesional.

    El guión debe ser conversacional, fácil de seguir y visualmente descriptivo. Incluye sugerencias para el creador, como [B-ROLL: ...], [TEXTO EN PANTALLA: ...], [MÚSICA: ...], y cambios de tono o énfasis. El formato de salida debe ser Markdown para facilitar la lectura.

    Aquí está la información proporcionada por el usuario en la plantilla de 5 bloques:

    ---

    **Bloque 1: El Problema (El Gancho)**
    *   Problema a resolver: "${input.problem}"
    *   *Tu tarea:* Expande esto en una introducción de 15-20 segundos que enganche al espectador. Usa una pregunta directa y lenguaje que resuene con la audiencia.

    **Bloque 2: Tu Credencial (¿Por qué tú?)**
    *   Credencial: "${input.credential}"
    *   *Tu tarea:* Integra esta credencial de forma natural y breve después del gancho. Haz que suene humilde pero con autoridad. Por ejemplo: "Y sé lo que se siente, porque yo..." o "Después de [X años/proyectos]...".

    **Bloque 3: El Método (La Solución en 3 Pasos)**
    *   Método: "${input.method}"
    *   *Tu tarea:* Desarrolla esta sección. Presenta cada paso claramente. Explica brevemente por qué cada paso es importante. Usa frases como "El primer paso es...", "Luego, lo que harás es...", "Y finalmente...". Sugiere elementos visuales de Canva para mostrar en pantalla para cada paso.

    **Bloque 4: El Ejemplo Rápido (La Demostración)**
    *   Ejemplo: "${input.example}"
    *   *Tu tarea:* Crea un segmento donde el creador demuestra el método. Escribe las acciones que el creador debe realizar en Canva. Por ejemplo: "Ok, mira qué fácil es. Voy a abrir Canva y te mostraré exactamente cómo lo hago... [acción 1], [acción 2]... y ¡listo!".

    **Bloque 5: El Próximo Paso (El Llamado a la Acción)**
    *   Próximo paso: "${input.nextStep}"
    *   *Tu tarea:* Escribe una conclusión poderosa. Resume el valor entregado y presenta el llamado a la acción de forma clara y convincente. Si es para vender algo, haz que la transición sea suave. Termina con una frase de cierre característica para el canal.

    ---

    Genera el guión completo en español, siguiendo esta estructura y añadiendo los detalles profesionales mencionados. El tono debe ser inspirador, práctico y amigable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating script with Gemini:", error);
    throw new Error("Failed to generate script. Please check your API key and network connection.");
  }
};

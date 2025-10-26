
import { GoogleGenAI } from "@google/genai";
import type { FormData, Country, CalculationResult } from '../types';
import { INDUSTRY_OPTIONS } from '../constants';

const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * This function NO LONGER calculates costs. It receives pre-calculated, deterministic results
 * and uses the AI solely to generate the qualitative, persuasive text content based on those fixed numbers.
 * The AI's role is now that of a "consultant writer," not a "calculator."
 */
export async function generateQualitativeAnalysis(formData: FormData, country: Country, calculatedData: CalculationResult): Promise<CalculationResult> {
    const industryLabel = INDUSTRY_OPTIONS.find(opt => opt.value === formData.industry)?.label || formData.industry;
    
    const industryName = formData.industry === 'other' && formData.otherIndustry
        ? formData.otherIndustry
        : industryLabel;
    
    const sectorName = formData.sector === 'other' && formData.otherSector
        ? formData.otherSector
        : formData.sector;
        
    const infoLocationText = formData.infoLocation === 'personal_pc' ? 'PCs personales (alta descentralización)' : 'Sistema corporativo (centralizado)';

    const prompt = `
        Actúa como un consultor de estrategia de negocio senior, especializado en la optimización de procesos para empresas de manufactura mediante sistemas PLM (Product Lifecycle Management).
        Tu tarea es tomar los datos y los resultados de costos ya calculados que te proporciono, y generar un análisis escrito persuasivo y profesional en formato JSON.

        Datos de la Empresa y Contexto:
        - Nombre de la Empresa: ${formData.companyName}
        - Industria: ${industryName}
        ${sectorName ? `- Sector Específico: ${sectorName}` : ''}
        - País: ${country.name}
        - Moneda: ${country.code}
        - Estructura: ${formData.engineers} ingenieros en ${formData.numSites} sitios y ${formData.numCountries} países.
        - Gestión de Información: ${infoLocationText}.

        Resultados Numéricos (YA CALCULADOS - NO LOS CAMBIES):
        - Pérdida Anual Total Estimada: ${calculatedData.totalCost.toLocaleString('es-ES', { style: 'currency', currency: country.code })}
        - Desglose de Costos:
        ${calculatedData.costBreakdown.map(item => `  - ${item.category}: ${item.cost.toLocaleString('es-ES', { style: 'currency', currency: country.code })}`).join('\n')}

        Instrucciones para la Generación de Contenido (Tu Tarea - DEBES DEVOLVER ÚNICAMENTE EL JSON):
        Basado en los números y el contexto, completa los siguientes campos de texto:

        1.  **summary (Resumen Ejecutivo)**: Escribe un párrafo de nivel ejecutivo. Enmarca el 'totalCost' (${calculatedData.totalCost.toLocaleString()}) como un riesgo estratégico para una empresa con una estructura distribuida (${formData.numSites} sitios). Define este costo como una 'fuga de capital' que inhibe la innovación. Posiciona un PLM como la inversión crítica para unificar la información, optimizar la colaboración multi-sitio y fortalecer la competitividad.

        2.  **costBreakdown (Solo las 'explanation')**: Para cada uno de los 4 ítems en el desglose, escribe una "Reflexión del Consultor" ('explanation'). Conecta el costo numérico con una debilidad de proceso, considerando la estructura de la empresa y su gestión de datos.
            - Para "${calculatedData.costBreakdown[0].category}" (${calculatedData.costBreakdown[0].cost.toLocaleString()}): Explica cómo la complejidad de tener ${formData.numSites} sitios y ${formData.numCountries} países crea una sobrecarga de comunicación y búsqueda de datos que un PLM centralizado elimina.
            - Para "${calculatedData.costBreakdown[1].category}" (${calculatedData.costBreakdown[1].cost.toLocaleString()}): Vincula los retrabajos con la falta de una "única fuente de verdad", un problema exacerbado por equipos distribuidos y datos no centralizados.
            - Para "${calculatedData.costBreakdown[2].category}" (${calculatedData.costBreakdown[2].cost.toLocaleString()}): Argumenta que los retrasos son una consecuencia directa de la fricción operativa (comunicación ineficiente y retrabajos), impidiendo la agilidad necesaria para competir.
            - Para "${calculatedData.costBreakdown[3].category}" (${calculatedData.costBreakdown[3].cost.toLocaleString()}): ${formData.infoLocation === 'personal_pc' ? `Enfatiza que almacenar datos en PCs es el mayor riesgo operativo, creando 'silos' que garantizan el uso de información obsoleta. Explica que el costo calculado es una prima de riesgo que la empresa paga por no tener control sobre sus activos intelectuales.` : `Felicita la decisión de usar un sistema corporativo, pero advierte que sin una estructura PLM formal, incluso los sistemas centralizados pueden volverse desorganizados y generar costos ocultos. Menciona que el costo de riesgo es cero gracias a esta buena práctica inicial.`}

        3.  **methodologyNotes**: Escribe un breve resumen de los supuestos. Menciona que los cálculos se basan en métricas que modelan la complejidad de la colaboración en equipos distribuidos y los riesgos de la gestión de datos descentralizada, ofreciendo una estimación realista.

        4.  **chartInterpretations**: Escribe una interpretación para cada tipo de gráfico, contextualizada a los desafíos de una empresa con ${formData.numSites} sitios.
            - **bar**: Explica qué revela la comparación de las barras. ¿El mayor costo proviene de la complejidad estructural (colaboración), de la ejecución (retrabajos/retrasos) o del riesgo (silos)?
            - **pie**: Analiza la distribución porcentual. ¿Muestra un problema concentrado o varios problemas contribuyentes? ¿Cómo ayuda esto a priorizar una inversión en PLM?
            - **radar**: Describe el "perfil de ineficiencia". Un valor alto en 'Nº Sitios' y 'Nº Países' sugiere problemas de escala y complejidad. Un valor alto en 'Retrabajos' o 'Retrasos' sugiere problemas de calidad de proceso. ¿Qué perfil emerge?

        Formato de Salida JSON (completa los campos 'explanation', 'summary', etc.):
        {
            "summary": "...",
            "explanations": [
                {"explanation": "..."},
                {"explanation": "..."},
                {"explanation": "..."},
                {"explanation": "..."}
            ],
            "methodologyNotes": "...",
            "chartInterpretations": {
                "bar": "...",
                "pie": "...",
                "radar": "..."
            }
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                temperature: 0.1,
                responseMimeType: "application/json",
            },
        });

        const jsonText = response.text.trim();
        const qualitativeData = JSON.parse(jsonText);

        // Integrate the generated text back into the original data structure
        const finalResult: CalculationResult = {
            ...calculatedData,
            summary: qualitativeData.summary,
            methodologyNotes: qualitativeData.methodologyNotes,
            chartInterpretations: qualitativeData.chartInterpretations,
            costBreakdown: calculatedData.costBreakdown.map((item, index) => ({
                ...item,
                explanation: qualitativeData.explanations[index]?.explanation || "Análisis no disponible.",
            })),
        };

        return finalResult;

    } catch (error) {
        console.error("Error calling Gemini API for qualitative analysis:", error);
        throw new Error("Failed to get a valid analysis from the AI model.");
    }
}

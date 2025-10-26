import React from 'react';
import { INDUSTRY_METRICS, INDUSTRY_OPTIONS } from '../constants';
import type { Country, FormData, MetricOverrides, IndustryMetrics } from '../types';

interface MethodologyExplanationProps {
  formData: FormData;
  country: Country;
  metricOverrides: MetricOverrides;
}

const formatCurrency = (value: number, currencySymbol: string, locale: string) => {
    return `${currencySymbol}${value.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const JustificationText: React.FC<{ overrideCount: number }> = ({ overrideCount }) => {
    const allOverridden = overrideCount === 3;
    const someOverridden = overrideCount > 0 && overrideCount < 3;

    return (
        <div className="space-y-3 text-xs">
            {allOverridden ? (
                <>
                    <p><strong>Fuente de Datos:</strong> Todos los cálculos se basan en los valores reales proporcionados por usted. Esto convierte el análisis en un reflejo financiero preciso de las ineficiencias operativas específicas de su empresa, eliminando las estimaciones de mercado.</p>
                    <p><strong>Propósito del Valor:</strong> Al utilizar sus propios datos, la calculadora ofrece un resultado completamente personalizado que refleja la realidad de sus operaciones y costos.</p>
                    <p><strong>Precisión del Cálculo:</strong> El resultado es un reflejo directo de la información que ha proporcionado, lo que resulta en el análisis más preciso posible de su situación actual.</p>
                </>
            ) : someOverridden ? (
                <>
                    <p><strong>Fuente de Datos:</strong> Este análisis combina estimaciones conservadoras de la industria con datos reales proporcionados por usted. Esta aproximación mixta aumenta significativamente la precisión del cálculo, adaptándolo mejor a la realidad financiera de su empresa mientras se mantiene un benchmark de mercado para las demás variables.</p>
                    <p><strong>Propósito del Valor:</strong> Los valores de la industria actúan como un punto de referencia creíble para las variables que no fueron modificadas, mientras que los datos que usted proporcionó aseguran que las áreas clave del cálculo sean lo más precisas posible.</p>
                    <p><strong>Valores Conservadores y Reales:</strong> Las estimaciones de la aplicación son deliberadamente conservadoras para proporcionar un "piso" creíble. La combinación con sus datos reales da como resultado un análisis híbrido y robusto.</p>
                </>
            ) : (
                 <>
                    <p><strong>Fuente de Datos:</strong> Los valores se basan en un análisis de métricas económicas para cada país y sector, utilizando fuentes de dominio público como encuestas salariales y reportes de costos industriales. Representan un consenso estadístico para una empresa de tamaño mediano, sirviendo como un benchmark localizado y robusto.</p>
                    <p><strong>Propósito del Valor:</strong> El objetivo no es adivinar el costo exacto de un error particular en su empresa, sino usar un promedio de mercado creíble y defendible para que el cálculo sea representativo a nivel estratégico.</p>
                    <p><strong>Son Conservadores a Propósito:</strong> Se eligieron deliberadamente para ser conservadores. En muchos casos, los costos reales pueden ser mucho más altos. Esto asegura que la estimación de pérdida sea un "piso" creíble y difícil de refutar, en lugar de una exageración.</p>
                </>
            )}
        </div>
    );
};


export const MethodologyExplanation: React.FC<MethodologyExplanationProps> = ({ formData, country, metricOverrides }) => {
    const { industry, sector, countryCode } = formData;
    const industryKey = industry === 'other' ? 'manufactura-discreta-general' : industry;
    const industryData = INDUSTRY_METRICS[industryKey] || INDUSTRY_METRICS['manufactura-discreta-general'];
    
    const isSpecificSector = sector && sector !== 'other' && industryData.sectors?.[sector];
    const metrics = isSpecificSector
                    ? industryData.sectors![sector]
                    : industryData.baseMetrics;
    
    const industryLabel = industry === 'other' && formData.otherIndustry 
        ? formData.otherIndustry
        : INDUSTRY_OPTIONS.find(opt => opt.value === industry)?.label || 'Industria General';
    
    const sectorLabel = sector === 'other' && formData.otherSector
        ? formData.otherSector
        : sector;
        
    const displaySector = sectorLabel ? `/ ${sectorLabel}` : (sector === '' ? '/ General' : '');

    const overrideCount = Object.keys(metricOverrides).length;
    
    const isOverridden = (key: string) => metricOverrides.hasOwnProperty(key);

    const getMetricValue = (key: keyof MetricOverrides, metricSet: IndustryMetrics) => {
        const localValue = (metricSet[key as keyof IndustryMetrics] as Record<string, number>)[countryCode];
        return metricOverrides[key] ?? localValue;
    };
    
    const getUsdEquivalent = (localValue: number) => {
        return localValue / country.usdRate;
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mt-6 text-sm text-slate-700 animate-fadeIn space-y-6">
            <h3 className="text-xl font-bold text-slate-800 text-center">Justificación de Métricas y Supuestos</h3>

            <div className="space-y-2">
                <h4 className="font-semibold text-lg text-slate-800">1. Las Variables Financieras Base (Editables)</h4>
                <p>
                    Para garantizar consistencia y fiabilidad, la calculadora utiliza tres métricas de costo financiero base. Estos valores son estimaciones de mercado localizadas para su país y sector. La herramienta le permite <span className="font-bold">editar estos valores</span> en el desglose de costos para reflejar con mayor precisión la realidad de su empresa.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2 bg-slate-50 p-4 rounded-md">
                    <li>
                        <strong>Salario Anual de Ingeniero:</strong>
                        {isOverridden('averageEngineerSalary') && <span className="text-green-600 font-semibold text-xs ml-2">(Valor Personalizado)</span>}
                        <span className="block pl-4">
                            {formatCurrency(getMetricValue('averageEngineerSalary', metrics), country.currencySymbol, country.locale)}
                            {country.code !== 'USD' && ` (${formatCurrency(getUsdEquivalent(getMetricValue('averageEngineerSalary', metrics)), '$', 'en-US')})`}
                        </span>
                    </li>
                    <li>
                        <strong>Costo por Retrabajo:</strong>
                        {isOverridden('reworkCost') && <span className="text-green-600 font-semibold text-xs ml-2">(Valor Personalizado)</span>}
                        <span className="block pl-4">
                            {formatCurrency(getMetricValue('reworkCost', metrics), country.currencySymbol, country.locale)}
                            {country.code !== 'USD' && ` (${formatCurrency(getUsdEquivalent(getMetricValue('reworkCost', metrics)), '$', 'en-US')})`}
                        </span>
                    </li>
                    <li>
                        <strong>Ingreso Anual por Producto:</strong>
                        {isOverridden('newProductRevenue') && <span className="text-green-600 font-semibold text-xs ml-2">(Valor Personalizado)</span>}
                        <span className="block pl-4">
                            {formatCurrency(getMetricValue('newProductRevenue', metrics), country.currencySymbol, country.locale)}
                            {country.code !== 'USD' && ` (${formatCurrency(getUsdEquivalent(getMetricValue('newProductRevenue', metrics)), '$', 'en-US')})`}
                        </span>
                    </li>
                </ul>
            </div>

            <div className="space-y-2">
                <h4 className="font-semibold text-lg text-slate-800">2. Las Variables Operativas Base (No Editables)</h4>
                <p>
                    Los costos de Colaboración y Riesgo por Silos se derivan de métricas operativas estándar de la industria. Estas modelan la complejidad inherente a equipos distribuidos y la gestión de información descentralizada.
                </p>
                 <ul className="list-disc list-inside pl-4 space-y-2 bg-slate-50 p-4 rounded-md">
                    <li>
                        <strong>Horas Base de Ineficiencia Semanal:</strong>
                        <span className="block pl-4">{metrics.baseWastedHours} horas por ingeniero</span>
                    </li>
                     <li>
                        <strong>Ineficiencia Adicional por Sitio:</strong>
                        <span className="block pl-4">{metrics.hoursPerSite} horas por cada sitio adicional</span>
                    </li>
                     <li>
                        <strong>Ineficiencia Adicional por País:</strong>
                        <span className="block pl-4">{metrics.hoursPerCountry} horas por cada país adicional</span>
                    </li>
                     <li>
                        <strong>Multiplicador de Riesgo por Silos:</strong>
                        <span className="block pl-4">{metrics.siloCostMultiplier * 100}% (aplicado a costos de retrabajo y retraso)</span>
                    </li>
                </ul>
            </div>
            
            <div className="space-y-2">
                <h4 className="font-semibold text-lg text-slate-800">3. Justificación: ¿Son Reales estos Valores?</h4>
                <JustificationText overrideCount={overrideCount} />
            </div>
        </div>
    );
};
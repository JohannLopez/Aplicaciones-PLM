
import type { Country, IndustryData, LocalizedMetrics } from './types';

export const COUNTRIES: Country[] = [
    { name: 'Estados Unidos (USD)', code: 'USD', currencySymbol: '$', usdRate: 1, locale: 'en-US' },
    { name: 'Europa (EUR)', code: 'EUR', currencySymbol: '€', usdRate: 0.92, locale: 'de-DE' },
    { name: 'Colombia (COP)', code: 'COP', currencySymbol: '$', usdRate: 4000, locale: 'es-CO' },
    { name: 'México (MXN)', code: 'MXN', currencySymbol: '$', usdRate: 18, locale: 'de-DE' },
    { name: 'España (EUR)', code: 'EUR', currencySymbol: '€', usdRate: 0.92, locale: 'es-ES' },
    { name: 'Argentina (ARS)', code: 'ARS', currencySymbol: '$', usdRate: 900, locale: 'es-AR' },
    { name: 'Chile (CLP)', code: 'CLP', currencySymbol: '$', usdRate: 950, locale: 'es-CL' },
    { name: 'Perú (PEN)', code: 'PEN', currencySymbol: 'S/', usdRate: 3.75, locale: 'es-PE' },
    { name: 'Guatemala (GTQ)', code: 'GTQ', currencySymbol: 'Q', usdRate: 7.8, locale: 'es-GT' },
    { name: 'República Dominicana (DOP)', code: 'DOP', currencySymbol: 'RD$', usdRate: 59, locale: 'es-DO' },
    { name: 'Brasil (BRL)', code: 'BRL', currencySymbol: 'R$', usdRate: 5.1, locale: 'pt-BR' },
];

export const INDUSTRY_OPTIONS = [
    { value: 'automotriz', label: 'Automotriz' },
    { value: 'electronica-y-alta-tecnologia', label: 'Electrónica y Alta Tecnología' },
    { value: 'electrodomesticos-y-electronica-consumo', label: 'Electrodomésticos y Electrónica de Consumo' },
    { value: 'maquinaria-industrial', label: 'Maquinaria Industrial' },
    { value: 'semiconductores', label: 'Semiconductores' },
    { value: 'equipos-de-construccion', label: 'Equipos de Construcción' },
    { value: 'fabricacion-de-plasticos-moldeo', label: 'Fabricación de Plásticos (Moldeo)' },
    { value: 'aeroespacial-y-defensa', label: 'Aeroespacial y Defensa' },
    { value: 'dispositivos-medicos', label: 'Dispositivos Médicos' },
    { value: 'ingenieria-electrica', label: 'Ingeniería Eléctrica' },
    { value: 'ingenieria-mecanica', label: 'Ingeniería Mecánica' },
    { value: 'robotica-y-automatizacion', label: 'Robótica y Automatización' },
    { value: 'telecomunicaciones', label: 'Equipos de Telecomunicaciones' },
    { value: 'bienes-de-consumo-y-juguetes', label: 'Bienes de Consumo y Juguetes' },
    { value: 'hvac', label: 'HVAC (Calefacción, Ventilación y A/A)' },
    { value: 'iluminacion', label: 'Iluminación Comercial y Residencial' },
    { value: 'instrumentacion-cientifica', label: 'Instrumentación Científica y de Medición' },
    { value: 'muebles-y-accesorios', label: 'Muebles y Accesorios' },
    { value: 'equipamiento-deportivo', label: 'Equipamiento Deportivo' },
    { value: 'herramientas-y-troqueles', label: 'Herramientas y Troqueles' },
];

const createLocalizedMetrics = (usd: number, cop: number, mxn: number, eur: number, ars: number, clp: number, pen: number, gtq: number, dop: number, brl: number): LocalizedMetrics => ({
    USD: usd, COP: cop, MXN: mxn, EUR: eur, ARS: ars, CLP: clp, PEN: pen, GTQ: gtq, DOP: dop, BRL: brl,
});


export const SECTORS: Record<string, string[]> = {
    'maquinaria-industrial': [
        'Equipos CNC', 'Robots industriales', 'Sistemas de transporte y manipulación', 'Maquinaria de envasado', 'Maquinaria de embalaje', 'Bombas y compresores', 'Sistemas hidráulicos', 'Sistemas neumáticos', 'Prensas mecánicas', 'Equipos de soldadura', 'Maquinaria agrícola', 'Maquinaria para procesamiento de alimentos', 'Maquinaria minera', 'Sistemas de elevación', 'Maquinaria de construcción ligera', 'Sistemas de control industrial', 'Maquinaria de impresión', 'Maquinaria para reciclaje', 'Maquinaria de medición', 'Equipos de mantenimiento industrial'
    ],
    'ingenieria-mecanica': [
        'Transmisiones', 'Actuadores', 'Engranajes', 'Bombas centrífugas', 'Compresores', 'Válvulas de control', 'Ejes y acoplamientos', 'Cojinetes y soportes', 'Sistemas de refrigeración industrial', 'Mecanismos de precisión', 'Unidades de potencia', 'Sistemas de lubricación', 'Estructuras metálicas', 'Convertidores térmicos', 'Sistemas de vibración', 'Convertidores mecánicos', 'Mecanismos de leva', 'Sistemas de control de movimiento', 'Convertidores de par', 'Ensamblajes mecánicos modulares'
    ],
    'ingenieria-electrica': [
        'Motores eléctricos', 'Tableros eléctricos', 'Fuentes de poder', 'Transformadores', 'Generadores', 'Inversores', 'Convertidores de frecuencia', 'Paneles de control', 'Disyuntores', 'Contactores', 'Relés', 'Unidades de respaldo UPS', 'Sistemas de distribución', 'Módulos de protección eléctrica', 'Reguladores de voltaje', 'Arrancadores suaves', 'Sensores eléctricos', 'Conectores industriales', 'Sistemas de control de energía', 'Cables de alta tensión'
    ],
    'automotriz': [
        'Carrocerías', 'Chasis', 'Motores', 'Transmisiones', 'Sistemas eléctricos', 'Módulos electrónicos', 'Interiores', 'Sistemas de frenos', 'Suspensiones', 'Ejes motrices', 'Sistemas de escape', 'Sistemas de climatización', 'Sistemas de seguridad', 'Sistemas de iluminación', 'Módulos de batería', 'Trenes de rodaje', 'Paneles de instrumentos', 'Sistemas de infoentretenimiento', 'Direcciones asistidas', 'Puertas y techos modulares'
    ],
    'electronica-y-alta-tecnologia': [
        'Microprocesadores', 'Tarjetas madre', 'Placas electrónicas', 'Módulos de potencia', 'Fuentes de alimentación', 'Sensores', 'Módulos IoT', 'Unidades de procesamiento', 'Baterías', 'Pantallas', 'Cámaras', 'Dispositivos de comunicación', 'Routers', 'Módulos de conectividad', 'Dispositivos portátiles', 'Convertidores', 'Sistemas de refrigeración', 'Módulos ópticos', 'Paneles de visualización', 'Ensamblajes SMT'
    ],
    'aeroespacial-y-defensa': [
        'Fuselajes', 'Alas', 'Motores turbofan', 'Aviónica', 'Sistemas de control de vuelo', 'Cabinas', 'Estructuras compuestas', 'Sistemas eléctricos', 'Trenes de aterrizaje', 'Góndolas', 'Sistemas hidráulicos', 'Sistemas de combustible', 'Sistemas de comunicación', 'Sistemas de radar', 'Módulos de navegación', 'Estabilizadores', 'Puertas', 'Asientos', 'Sistemas de oxigenación', 'Tanques presurizados'
    ],
    'dispositivos-medicos': [
        'Equipos de diagnóstico', 'Monitores multiparámetro', 'Analizadores clínicos', 'Ventiladores', 'Bombas de infusión', 'Desfibriladores', 'Módulos de cirugía asistida', 'Equipos laparoscópicos', 'Sistemas de esterilización', 'Marcapasos', 'Prótesis', 'Camas hospitalarias', 'Incubadoras', 'Sistemas dentales', 'Respiradores portátiles', 'Equipos de rehabilitación', 'Sillas de ruedas eléctricas', 'Unidades de succión', 'Equipos de laboratorio', 'Módulos de telemetría médica'
    ],
    'robotica-y-automatizacion': [
        'Brazos robóticos', 'Controladores', 'Servomotores', 'Sistemas de visión', 'Actuadores lineales', 'Sensores de fuerza', 'Pinzas', 'Reductores', 'Módulos de IA', 'Estaciones de trabajo robotizadas', 'Transportadores', 'Módulos electrónicos', 'Tarjetas de control', 'Estructuras mecánicas', 'Paneles de control', 'Convertidores de frecuencia', 'Módulos de calibración', 'Sistemas de seguridad', 'Conectores industriales', 'Unidades de comunicación'
    ],
    'equipos-de-construccion': [
        'Excavadoras', 'Cargadores', 'Grúas', 'Retroexcavadoras', 'Motoniveladoras', 'Compactadores', 'Motores diésel', 'Sistemas hidráulicos', 'Transmisiones pesadas', 'Chasis', 'Cabinas de operación', 'Brazos articulados', 'Trenes de rodaje', 'Pavimentadoras', 'Perforadoras', 'Torretas giratorias', 'Módulos de enfriamiento', 'Sistemas de control', 'Ejes de tracción'
    ],
    'herramientas-y-troqueles': [
        'Moldes de precisión', 'Matrices de corte', 'Prensas de troquelado', 'Sistemas de punzonado', 'Herramientas de mecanizado', 'Dispositivos de sujeción', 'Matrices progresivas', 'Prensas hidráulicas', 'Cabezales de fresado', 'Portamoldes', 'Calibradores', 'Herramientas de torque', 'Portaherramientas', 'Dispositivos de alineación', 'Sistemas de ajuste', 'Herramientas neumáticas', 'Dispositivos de control dimensional', 'Sistemas de guiado', 'Dispositivos de montaje', 'Estaciones de prueba'
    ],
    'hvac': [
        'Aires acondicionados', 'Chillers', 'Bombas de calor', 'Unidades condensadoras', 'Evaporadores', 'Compresores', 'Ventiladores', 'Intercambiadores de calor', 'Sistemas de control', 'Torres de enfriamiento', 'Ductos modulares', 'Válvulas de expansión', 'Termostatos', 'Sensores térmicos', 'Filtros', 'Paneles eléctricos', 'Estructuras metálicas', 'Unidades de refrigeración', 'Módulos de climatización', 'Sistemas de bombeo', 'Controladores electrónicos'
    ],
    'muebles-y-accesorios': [
        'Estructuras metálicas', 'Herrajes', 'Mecanismos reclinables', 'Sistemas de deslizamiento', 'Bisagras', 'Marcos de sillas', 'Unidades de almacenamiento', 'Módulos de ensamblaje', 'Bases giratorias', 'Rieles', 'Patas ajustables', 'Soportes', 'Anclajes', 'Sistemas de iluminación integrada', 'Mecanismos hidráulicos', 'Perfiles de aluminio', 'Uniones modulares', 'Cierres magnéticos', 'Sistemas de amortiguación', 'Accesorios ergonómicos'
    ],
    'bienes-de-consumo-y-juguetes': [
        'Electrodomésticos portátiles', 'Aspiradoras', 'Juguetes electrónicos', 'Consolas de juego', 'Relojes inteligentes', 'Scooters eléctricos', 'Bicicletas', 'Drones recreativos', 'Sistemas de audio portátiles', 'Robots interactivos', 'Máquinas de café', 'Patinetas eléctricas', 'Purificadores', 'Lámparas inteligentes', 'Ventiladores', 'Herramientas domésticas', 'Cepillos eléctricos', 'Dispensadores automáticos', 'Dispositivos de cocina', 'Cargadores portátiles'
    ],
    'electrodomesticos-y-electronica-consumo': [
        'Refrigeradores', 'Lavadoras', 'Televisores LED', 'Televisores OLED', 'Hornos microondas', 'Aspiradoras', 'Aires acondicionados', 'Lavavajillas', 'Secadoras', 'Hornos eléctricos', 'Cocinas de inducción', 'Sistemas de sonido envolvente', 'Barras de sonido', 'Consolas de videojuegos', 'Robots aspiradores', 'Licuadoras', 'Batidoras', 'Procesadores de alimentos', 'Cafeteras', 'Freidoras de aire', 'Congeladores', 'Cocinas de gas', 'Campanas extractoras', 'Purificadores de aire', 'Calefactores eléctricos', 'Deshumidificadores', 'Ventiladores', 'Planchas eléctricas', 'Tostadoras', 'Hervidores eléctricos', 'Dispensadores de agua', 'Proyectores domésticos', 'Parlantes Bluetooth', 'Equipos de audio de alta fidelidad', 'Reproductores multimedia', 'Monitores domésticos', 'Routers Wi-Fi', 'Cámaras de seguridad para el hogar', 'Timbres inteligentes'
    ],
    'equipamiento-deportivo': [
        'Bicicletas', 'Equipos de gimnasio', 'Caminadoras', 'Máquinas elípticas', 'Pesas ajustables', 'Bancos de entrenamiento', 'Máquinas multifuncionales', 'Bicicletas estáticas', 'Scooters deportivos', 'Patinetas eléctricas', 'Rodillos', 'Remos', 'Estructuras metálicas', 'Sistemas de resistencia', 'Dispositivos electrónicos de control', 'Sensores de rendimiento', 'Módulos de amortiguación', 'Soportes', 'Estructuras de entrenamiento', 'Simuladores deportivos'
    ],
    'fabricacion-de-plasticos-moldeo': [
        'Componentes automotrices', 'Carcasas', 'Envases industriales', 'Piezas de electrodomésticos', 'Componentes médicos', 'Gabinetes electrónicos', 'Módulos de ensamblaje plástico', 'Partes estructurales', 'Cubiertas protectoras', 'Conectores', 'Bandejas', 'Piezas de iluminación', 'Herramientas plásticas', 'Accesorios de consumo', 'Paneles frontales', 'Interruptores', 'Carcasas de sensores', 'Cajas modulares', 'Marcos', 'Componentes de mobiliario'
    ],
    'iluminacion': [
        'Luminarias LED', 'Paneles de luz', 'Tiras LED', 'Proyectores', 'Lámparas colgantes', 'Sistemas de iluminación empotrada', 'Luminarias industriales', 'Fuentes de alimentación', 'Controladores', 'Disipadores térmicos', 'Módulos ópticos', 'Balastros', 'Sensores de movimiento', 'Reflectores', 'Estructuras metálicas', 'Difusores', 'Conectores', 'Carcasas', 'Sistemas de montaje', 'Módulos de emergencia'
    ],
    'telecomunicaciones': [
        'Estaciones base', 'Antenas', 'Routers', 'Módulos de transmisión', 'Tarjetas electrónicas', 'Gabinetes', 'Cables de fibra óptica', 'Amplificadores de señal', 'Módulos de potencia', 'Convertidores', 'Sistemas de refrigeración', 'Racks', 'Paneles de conexión', 'Módulos ópticos', 'Fuentes redundantes', 'Unidades de control', 'Dispositivos de comunicación', 'Conectores', 'Repetidores', 'Módulos de interfaz'
    ],
    'semiconductores': [
        'Procesadores', 'Chips integrados', 'Módulos de memoria', 'Obleas de silicio', 'Encapsulados', 'Sensores CMOS', 'Circuitos integrados', 'Módulos de potencia', 'Convertidores', 'Transistores', 'Diodos', 'Resistencias', 'Condensadores', 'Módulos de comunicación', 'Unidades de almacenamiento', 'Controladores', 'Tarjetas electrónicas', 'Disipadores', 'Módulos de prueba', 'Paquetes multichip'
    ],
    'instrumentacion-cientifica': [
        'Sensores de presión', 'Transmisores de flujo', 'Analizadores de gases', 'Espectrómetros', 'Módulos de adquisición de datos', 'Controladores PID', 'Transductores', 'Indicadores digitales', 'Válvulas motorizadas', 'Actuadores', 'Termorresistencias', 'Módulos de calibración', 'Convertidores de señal', 'Fuentes de poder', 'Sistemas de registro', 'Controladores distribuidos', 'Módulos ópticos', 'Unidades de monitoreo', 'Gabinetes de instrumentación', 'Terminales de operación'
    ]
};

export const INDUSTRY_METRICS: Record<string, IndustryData> = {
    'automotriz': {
        baseMetrics: { 
            averageEngineerSalary: createLocalizedMetrics(85000, 95000000, 750000, 60000, 45000000, 50000000, 100000, 180000, 900000, 200000),
            reworkCost: createLocalizedMetrics(7500, 30000000, 135000, 6900, 6750000, 7125000, 28125, 58500, 442500, 38250),
            newProductRevenue: createLocalizedMetrics(5000000, 20000000000, 90000000, 4600000, 4500000000, 4750000000, 18750000, 39000000, 295000000, 25500000),
            baseWastedHours: 2.5,
            hoursPerSite: 0.75,
            hoursPerCountry: 1.25,
            siloCostMultiplier: 0.30,
        },
        sectors: {
            'Motores': { 
                averageEngineerSalary: createLocalizedMetrics(95000, 110000000, 850000, 68000, 51000000, 57000000, 115000, 200000, 1000000, 230000),
                reworkCost: createLocalizedMetrics(9000, 36000000, 162000, 8200, 8100000, 8550000, 33750, 69000, 530000, 45000),
                newProductRevenue: createLocalizedMetrics(6000000, 24000000000, 108000000, 5500000, 5400000000, 5700000000, 22500000, 46800000, 354000000, 30600000),
                baseWastedHours: 3.0,
                hoursPerSite: 1.0,
                hoursPerCountry: 1.5,
                siloCostMultiplier: 0.35,
            },
        }
    },
    'electronica-y-alta-tecnologia': {
        baseMetrics: { 
            averageEngineerSalary: createLocalizedMetrics(90000, 100000000, 800000, 65000, 48000000, 54000000, 110000, 190000, 950000, 220000),
            reworkCost: createLocalizedMetrics(4500, 18000000, 81000, 4100, 4050000, 4275000, 16875, 35100, 265500, 22950),
            newProductRevenue: createLocalizedMetrics(3000000, 12000000000, 54000000, 2750000, 2700000000, 2850000000, 11250000, 23400000, 177000000, 15300000),
            baseWastedHours: 3.0,
            hoursPerSite: 1.0,
            hoursPerCountry: 1.5,
            siloCostMultiplier: 0.25,
        }
    },
    // Add more industries with localized data...
    'manufactura-discreta-general': {
        baseMetrics: {
            averageEngineerSalary: createLocalizedMetrics(70000, 80000000, 600000, 50000, 35000000, 40000000, 80000, 150000, 750000, 160000),
            reworkCost: createLocalizedMetrics(5000, 20000000, 90000, 4600, 4500000, 4750000, 18750, 39000, 295000, 25500),
            newProductRevenue: createLocalizedMetrics(2000000, 8000000000, 36000000, 1840000, 1800000000, 1900000000, 7500000, 15600000, 118000000, 10200000),
            baseWastedHours: 2.0,
            hoursPerSite: 0.5,
            hoursPerCountry: 1.0,
            siloCostMultiplier: 0.20,
        }
    },
};

// Populate the rest of the industries by copying the general manufacturing data
const generalMetrics = INDUSTRY_METRICS['manufactura-discreta-general'];
INDUSTRY_OPTIONS.forEach(opt => {
    if (!INDUSTRY_METRICS[opt.value]) {
        INDUSTRY_METRICS[opt.value] = generalMetrics;
    }
});

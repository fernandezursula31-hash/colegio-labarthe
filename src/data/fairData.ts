export type WorkshopType = 'todos' | 'ebanisteria' | 'mecanica' | 'electricidad' | 'construccion' | 'reposteria';

export interface ExhibitionItem {
  id: string;
  code: string;
  workshop: 'ebanisteria' | 'mecanica' | 'electricidad' | 'construccion' | 'reposteria';
  workshopLabel: string;
  title: string;
  subtitle: string;
  category: string;
  imageSrc: string;
  badgeText: string;
  shortDescription: string;
  materials: string;
  specs: string[];
  studentTeam: string;
  date: string;
  aspectRatio: string;
}

export interface WorkshopCatalogMeta {
  id: 'ebanisteria' | 'mecanica' | 'electricidad' | 'construccion' | 'reposteria';
  name: string;
  code: string;
  description: string;
  itemCount: number;
}

export const WORKSHOP_CATALOGS: WorkshopCatalogMeta[] = [
  {
    id: 'ebanisteria',
    name: 'Taller de Ebanistería',
    code: 'CAT-EB',
    description: 'Muebles utilitarios, calado artístico y acabados finos en madera.',
    itemCount: 2
  },
  {
    id: 'mecanica',
    name: 'Taller de Mecánica Automotriz',
    code: 'CAT-MA',
    description: 'Bancos didácticos, sistemas eléctricos y circuitos de frenos vehiculares.',
    itemCount: 2
  },
  {
    id: 'electricidad',
    name: 'Taller de Electricidad y Electrónica',
    code: 'CAT-EL',
    description: 'Instrumentación, microcontroladores Arduino, sensores y circuitos de control.',
    itemCount: 2
  },
  {
    id: 'construccion',
    name: 'Taller de Construcción Civil',
    code: 'CAT-CC',
    description: 'Estructuras reticuladas, maquetas arquitectónicas y elementos hidráulicos.',
    itemCount: 2
  },
  {
    id: 'reposteria',
    name: 'Taller de Repostería y Pastelería',
    code: 'CAT-RP',
    description: 'Pastelería artesanal, envasado individual y Buenas Prácticas de Manufactura.',
    itemCount: 2
  }
];

export const EXHIBITION_ITEMS: ExhibitionItem[] = [
  // --- CATÁLOGO 01: EBANISTERÍA (2 ITEMS) ---
  {
    id: 'labarthe-ebanisteria-estudiante',
    code: 'EB-01',
    workshop: 'ebanisteria',
    workshopLabel: 'Ebanistería',
    title: 'Mobiliario y Tablas Listonadas',
    subtitle: 'Exhibición del Stand de Ebanistería',
    category: 'Muebles & Artesanía',
    imageSrc: '/assets/aistudio/image_ae890724.png',
    badgeText: 'Catálogo Ebanistería',
    shortDescription: 'Línea de mobiliario menor y tablas de cocina con ensamble de precisión y acabado lustrado.',
    materials: 'Maderas de pino y tornillo, sellador y laca transparente',
    specs: [
      'Tablas de picar con vetas contrastadas',
      'Sillas plegables y mini butacas',
      'Botellero rústico con soporte para copas'
    ],
    studentTeam: 'Estudiante Lalangui',
    date: 'Feria Labarthe 2026',
    aspectRatio: '3:4'
  },
  {
    id: 'labarthe-ebanisteria-proyectos',
    code: 'EB-02',
    workshop: 'ebanisteria',
    workshopLabel: 'Ebanistería',
    title: 'Artículos de Menaje y Tornería',
    subtitle: 'Colección Utilitaria y Decorativa',
    category: 'Diseño en Madera',
    imageSrc: '/assets/aistudio/image_a82a8157.png',
    badgeText: 'Catálogo Ebanistería',
    shortDescription: 'Accesorios para el hogar elaborados con técnicas de calado en sierra y uniones articuladas.',
    materials: 'Madera maciza lustrada, pernos de pivote y barniz caoba',
    specs: [
      'Portahuevos calado con silueta de gallina',
      'Portarrollos de cocina con perno central',
      'Figura articulada tipo robot'
    ],
    studentTeam: 'Módulo de Ebanistería Artística',
    date: 'Feria Labarthe 2026',
    aspectRatio: '4:3'
  },

  // --- CATÁLOGO 02: MECÁNICA AUTOMOTRIZ (2 ITEMS) ---
  {
    id: 'labarthe-mecanica-arranque',
    code: 'MA-01',
    workshop: 'mecanica',
    workshopLabel: 'Mecánica Automotriz',
    title: 'Módulo Didáctico de Arranque',
    subtitle: 'Circuito de Encendido Operativo 12V',
    category: 'Electricidad Vehicular',
    imageSrc: '/assets/aistudio/image_47cca945.png',
    badgeText: 'Catálogo Mecánica',
    shortDescription: 'Banco demostrativo para pruebas de arranque automotriz con chapa de contacto y solenoide.',
    materials: 'Motor de partida, solenoide, batería AGM 12V y bastidor de soporte',
    specs: [
      'Circuito eléctrico de potencia y mando',
      'Activación con llave de encendido',
      'Monitoreo de consumo y torque inicial'
    ],
    studentTeam: 'Estudiante Campos Jossue',
    date: 'Feria Labarthe 2026',
    aspectRatio: '3:4'
  },
  {
    id: 'labarthe-mecanica-frenos-hidraulicos',
    code: 'MA-02',
    workshop: 'mecanica',
    workshopLabel: 'Mecánica Automotriz',
    title: 'Simulador de Frenos Hidráulicos',
    subtitle: 'Freno de Disco con Principio de Pascal',
    category: 'Sistemas Hidráulicos',
    imageSrc: '/assets/aistudio/image_2b928e75.png',
    badgeText: 'Catálogo Mecánica',
    shortDescription: 'Simulador de mordaza hidráulica para evidenciar el principio de Pascal y la detención por fricción.',
    materials: 'Émbolos de presión, motor eléctrico, disco giratorio y mangueras',
    specs: [
      'Circuito cerrado de fluido incompresible',
      'Accionamiento de cáliper sobre disco',
      'Prueba de detención en tiempo real'
    ],
    studentTeam: 'Módulo de Frenos y Dinámica',
    date: 'Feria Labarthe 2026',
    aspectRatio: '4:3'
  },

  // --- CATÁLOGO 03: ELECTRICIDAD & ELECTRÓNICA (2 ITEMS) ---
  {
    id: 'labarthe-electricidad-estudiantes',
    code: 'EL-01',
    workshop: 'electricidad',
    workshopLabel: 'Electricidad',
    title: 'Estación de Medición y Control Arduino',
    subtitle: 'Demostración de Instrumentación y Microcontrolador',
    category: 'Automatización & Medición',
    imageSrc: '/assets/aistudio/image_b9b31b9e.png',
    badgeText: 'Catálogo Electricidad',
    shortDescription: 'Estudiantes operando estación didáctica con multímetros digitales, cascos de protección y módulo Arduino.',
    materials: 'Placa Arduino Uno, multímetro digital, cableado UTP, tablero y EPP de seguridad',
    specs: [
      'Medición de voltaje y continuidad en tiempo real',
      'Programación de pulsos para actuadores',
      'Implementación con protocolo de seguridad eléctrica'
    ],
    studentTeam: 'Estudiantes del Taller de Electricidad',
    date: 'Feria Labarthe 2026',
    aspectRatio: '3:4'
  },
  {
    id: 'labarthe-electricidad-sensores-alarma',
    code: 'EL-02',
    workshop: 'electricidad',
    workshopLabel: 'Electricidad',
    title: 'Módulo de Sensores, Alarma y Señalización',
    subtitle: 'Circuito Prototipo con Protoboard y Microcontrolador',
    category: 'Circuitos & Robótica',
    imageSrc: '/assets/aistudio/image_6e08f042.png',
    badgeText: 'Catálogo Electricidad',
    shortDescription: 'Prototipo didáctico con sensor sonoro buzzer, batería 9V, interruptor y regleta LED de señalización.',
    materials: 'Protoboards, buzzer sonoro, batería 9V, módulo de luces LED y microcontrolador',
    specs: [
      'Activación de alarma sonora por señal de control',
      'Matriz lineal de LEDs de alta luminosidad',
      'Alimentación regulada conmutada y batería portátil'
    ],
    studentTeam: 'Módulo de Electrónica y Control',
    date: 'Feria Labarthe 2026',
    aspectRatio: '3:4'
  },

  // --- CATÁLOGO 04: CONSTRUCCIÓN CIVIL (2 ITEMS) ---
  {
    id: 'labarthe-construccion-estudiantes',
    code: 'CC-01',
    workshop: 'construccion',
    workshopLabel: 'Construcción Civil',
    title: 'Equipo Técnico y Maquetas Estructurales',
    subtitle: 'Promoción Técnica con Chalecos de Obra',
    category: 'Topografía & Estructuras',
    imageSrc: '/assets/aistudio/image_46e923a7.png',
    badgeText: 'Catálogo Construcción',
    shortDescription: 'Estudiantes del taller con indumentaria técnica exhibiendo puentes reticulados de madera y distribución arquitectónica.',
    materials: 'Madera balsa, varillas estructurales, cartón maqueta y chalecos de campo',
    specs: [
      'Modelado de puente reticulado tipo Warren y Pratt',
      'Distribución modular de ambientes a escala',
      'Trabajo colaborativo con indumentaria de seguridad técnica'
    ],
    studentTeam: 'Estudiantes de Construcción Civil',
    date: 'Feria Labarthe 2026',
    aspectRatio: '4:3'
  },
  {
    id: 'labarthe-construccion-maquetas-puentes',
    code: 'CC-02',
    workshop: 'construccion',
    workshopLabel: 'Construcción Civil',
    title: 'Maquetas de Puentes y Módulo Hidráulico',
    subtitle: 'Semana Técnica 2026 · Formación Técnica',
    category: 'Ingeniería & Maquetería',
    imageSrc: '/assets/aistudio/image_b2c25cfc.png',
    badgeText: 'Catálogo Construcción',
    shortDescription: 'Conjunto de puentes con armaduras de celosía, módulos habitacionales a escala y cascada hidráulica funcional.',
    materials: 'Palillos de madera ensartada, adhesivo vinílico, yeso y sistema de bombeo en miniatura',
    specs: [
      'Ensayos de rigidez sobre vigas y arcos de celosía',
      'Simulación de corriente de agua en circuito cerrado',
      'Plano de corte y acabados interiores en viviendas'
    ],
    studentTeam: 'Módulo de Diseño Estructural y Edificaciones',
    date: 'Feria Labarthe 2026',
    aspectRatio: '4:3'
  },

  // --- CATÁLOGO 05: REPOSTERÍA & PASTELERÍA (2 ITEMS) ---
  {
    id: 'labarthe-stand-produccion',
    code: 'RP-01',
    workshop: 'reposteria',
    workshopLabel: 'Repostería y Pastelería',
    title: 'Línea de Queques Individuales',
    subtitle: 'Empaque Triangular Hermético',
    category: 'Buenas Prácticas BPM',
    imageSrc: '/assets/aistudio/repos_0ff52f51.jpeg',
    badgeText: 'Catálogo Repostería',
    shortDescription: 'Porciones estandarizadas de bizcochuelo en domo plástico con etiquetado de producción escolar.',
    materials: 'Harina pastelera, cacao puro, domos plásticos y rotulado BPM',
    specs: [
      'Porcionado en domos triangulares termo-protegidos',
      'Control de higiene: tocas, barbijos y guantes',
      'Etiquetado y presentación comercial en stand'
    ],
    studentTeam: 'Promoción Técnica · Taller QIA',
    date: 'Feria Labarthe 2026',
    aspectRatio: '4:3'
  },
  {
    id: 'labarthe-estudiantes-feria',
    code: 'RP-02',
    workshop: 'reposteria',
    workshopLabel: 'Repostería y Pastelería',
    title: 'Bandeja de Degustación en Feria',
    subtitle: 'Exhibición y Venta al Público',
    category: 'Pastelería Fina',
    imageSrc: '/assets/aistudio/repost_340362f1.jpeg',
    badgeText: 'Catálogo Repostería',
    shortDescription: 'Porciones decoradas con coberturas de colores para degustación de los visitantes en la feria.',
    materials: 'Torta húmeda de chocolate, cremas texturizadas y bandejas de servicio',
    specs: [
      'Montaje de bandeja para muestra gastronómica',
      'Coberturas vivas y grajeas decorativas',
      'Atención y explicación del proceso al público'
    ],
    studentTeam: 'Alumnas del Taller de Pastelería',
    date: 'Feria Labarthe 2026',
    aspectRatio: '3:4'
  }
];

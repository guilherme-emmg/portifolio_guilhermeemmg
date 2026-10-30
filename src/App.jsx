import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Database,
  Code2,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  Check,
  Menu,
  X,
  ArrowUp,
  Layers,
  FileCode,
  CheckCircle2,
} from 'lucide-react';

/* =========================================================================
   ESTRUTURA DE DADOS DO PORTFÓLIO (Centralizada para fácil manutenção)
   ========================================================================= */

const PROFILE_DATA = {
  fullName: 'Guilherme Emanuel Martins Moreira Gonçalves',
  shortName: 'Guilherme Emanuel',
  monogram: 'GE',
  roleTitle: 'Analista de Tecnologia | QA & Data Analytics',
  location: 'Belo Horizonte, MG',
  academicStatus: 'Bacharelado em Sistemas de Informação · COTEMIG',
  presentation:
    'Profissional de Tecnologia da Informação com experiência em implantação e suporte de sistemas corporativos, qualidade de software, testes de API e integração de dados. Atualmente, curso Bacharelado em Sistemas de Informação e direciono minha carreira para Quality Assurance e Análise de Dados.',
  highlightQuote: 'Transformando dados em informação e qualidade em confiança.',
  photoUrl: null, // Deixe null para exibir o monograma arquitetural, ou informe a URL de uma foto
  targetRoles: [
    'Analista de QA Júnior',
    'Analista de Testes',
    'Analista de Dados Júnior',
    'Sistemas & Integração',
  ],
  links: {
    email: 'guilherme.emmg@gmail.com',
    linkedin: 'https://www.linkedin.com/in/guilherme-emanuel24',
    github: 'https://github.com/guilherme-emmg',
  },
};

const NAV_LINKS = [
  { id: 'sobre', label: 'Sobre', href: '#sobre' },
  { id: 'competencias', label: 'Competências', href: '#competencias' },
  { id: 'experiencia', label: 'Experiência', href: '#experiencia' },
  { id: 'projetos', label: 'Projetos', href: '#projetos' },
  { id: 'formacao', label: 'Formação', href: '#formacao' },
];

const ABOUT_METRICS = [
  {
    value: '2 anos e 5 meses',
    label: 'de experiência profissional',
    detail: 'Suporte técnico e implantação de sistemas ERP corporativos',
  },
  {
    value: '~10 projetos',
    label: 'de implantação concluídos',
    detail: 'Implantação, homologação e integração entre sistemas',
  },
  {
    value: '+25 clientes',
    label: 'corporativos atendidos',
    detail: 'Atendimento especializado com foco na qualidade das entregas',
  },
  {
    value: 'Inglês avançado',
    label: 'leitura e comunicação técnica',
    detail: 'Documentações, APIs REST e ferramentas corporativas globais',
  },
];

const SKILLS_GROUPS = [
  {
    id: 'qa',
    title: 'Quality Assurance (QA)',
    subtitle: 'Validação funcional, rastreabilidade de defeitos e confiabilidade em entregas',
    icon: ShieldCheck,
    featured: true,
    items: [
      'Testes funcionais',
      'Cenários de teste',
      'Testes de API/REST',
      'Postman',
      'Documentação de bugs',
      'Homologação de sistemas',
      'Jira',
      'Metodologias ágeis e SCRUM',
    ],
  },
  {
    id: 'dados',
    title: 'Análise de Dados',
    subtitle: 'Consultas estruturadas, integração entre bases e organização analítica',
    icon: Database,
    featured: true,
    items: [
      'SQL',
      'Consultas e manipulação de dados',
      'Integração de dados',
      'Excel avançado',
      'Power BI',
      'Modelagem de banco de dados',
      'Análise e organização de informações',
    ],
  },
  {
    id: 'desenvolvimento',
    title: 'Desenvolvimento e Tecnologias',
    subtitle: 'Base sólida de engenharia de software, arquitetura REST e versionamento',
    icon: Code2,
    featured: false,
    items: [
      'Java',
      'Spring Boot',
      'JavaScript',
      'React',
      'Node.js',
      'C#',
      'MySQL',
      'Git e GitHub',
      'Oracle SQL',
    ],
  },
];

const EXPERIENCE_ROLES = [
  {
    id: 'implantacao-jr',
    role: 'Analista de Implantação Júnior',
    period: 'Julho de 2024 a Abril de 2026',
    focus: 'Implantação ERP · Homologação & QA · Integração SQL & API REST',
    responsibilities: [
      'Participação em aproximadamente 10 projetos de implantação e integração de sistemas ERP.',
      'Atuação com TOTVS RM, TOTVS Protheus e Philips Tasy.',
      'Elaboração de cenários de teste e validação de funcionalidades.',
      'Execução de testes de API/REST utilizando Postman.',
      'Estruturação de consultas SQL para integração de dados.',
      'Documentação e testes de defeitos utilizando Jira e Notion.',
      'Atendimento a mais de 25 clientes corporativos, com foco na qualidade das entregas.',
    ],
  },
  {
    id: 'suporte-jr',
    role: 'Analista de Suporte Júnior',
    period: 'Dezembro de 2023 a Julho de 2024',
    focus: 'Gestão de Incidentes Críticos · Monitoramento de SLA · Diagnóstico Técnico',
    responsibilities: [
      'Tratamento e acompanhamento de incidentes críticos de software.',
      'Monitoramento de chamados conforme critérios de SLA.',
      'Atendimento técnico especializado a usuários corporativos.',
      'Configuração e suporte de sistemas.',
    ],
  },
];

const PROJECTS = [
  {
    id: 'amigos-do-sertao',
    number: '01',
    name: 'Amigos do Sertão',
    category: 'Desenvolvimento Web | Landing Page',
    filterGroup: 'web',
    repoUrl: 'https://github.com/guilherme-emmg/SiteAmigosDoSertao',
    description:
      'Desenvolvimento de uma landing page para o projeto Amigos do Sertão, com foco na apresentação institucional, organização das informações e experiência de navegação.',
    highlightsTitle: 'Aspectos técnicos trabalhados',
    highlights: [
      'Estruturação semântica para apresentação institucional clara',
      'Arquitetura de informação voltada à leitura e navegação fluida',
      'Estilização responsiva para diferentes resoluções de tela',
      'Organização modular de ativos visuais, estilos e interações',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Design Responsivo'],
    artTheme: 'sertao',
  },
  {
    id: 'leo-andaimes',
    number: '02',
    name: 'Léo Andaimes',
    category: 'Desenvolvimento Web | Landing Page',
    filterGroup: 'web',
    repoUrl: 'https://github.com/guilherme-emmg/SiteLeoAndaimes',
    description:
      'Desenvolvimento de uma landing page institucional para apresentação de serviços, com foco em organização visual, responsividade e experiência do usuário.',
    highlightsTitle: 'Aspectos técnicos trabalhados',
    highlights: [
      'Apresentação objetiva de portfólio de serviços corporativos',
      'Hierarquia visual orientada à clareza e conversão de contato',
      'Layout adaptável mobile-first com navegação direta por seções',
      'Boas práticas de estruturação HTML, CSS moderno e scripts leves',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Design Responsivo'],
    artTheme: 'andaimes',
  },
  {
    id: 'api-carros',
    number: '03',
    featured: true,
    name: 'Testes de API de Carros',
    category: 'Quality Assurance | API Testing',
    filterGroup: 'qa-dados',
    repoUrl: 'https://github.com/guilherme-emmg/Projeto_API_Carros',
    description:
      'Projeto envolvendo integração e consumo de dados de uma API relacionada a veículos, permitindo trabalhar com requisições, respostas estruturadas e manipulação de informações.',
    highlightsTitle: 'Conhecimentos aplicados',
    highlights: [
      'Testes e validação de APIs',
      'Requisições HTTP',
      'Análise de respostas',
      'Manipulação de dados JSON',
      'Validação do comportamento dos serviços',
    ],
    technologies: ['JavaScript', 'React', 'React Router', 'JSON', 'API REST', 'Vite'],
    artTheme: 'carros',
  },
  {
    id: 'cote-smart-balance',
    number: '04',
    featured: true,
    name: 'Cote Smart Balance',
    category: 'Backend | Engenharia de Software | API REST',
    filterGroup: 'qa-dados',
    repoUrl: 'https://github.com/guilherme-emmg/CoteSmartBalance_Grupo05',
    description:
      'Projeto acadêmico desenvolvido em equipe com o objetivo de converter uma aplicação legada chamada Cote Smart Balance em uma aplicação baseada em arquitetura REST. A solução utiliza Spring Boot para desenvolvimento do backend, MySQL para persistência de dados e serviços REST para comunicação e organização da aplicação.',
    highlightsTitle: 'Competências demonstradas',
    highlights: [
      'Desenvolvimento backend com Java',
      'Construção de APIs REST',
      'Utilização do framework Spring Boot',
      'Integração com banco de dados MySQL',
      'Organização de aplicações e arquitetura de software',
      'Modernização de sistemas legados',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security (JWT)',
      'Spring Data JPA',
      'MySQL',
      'REST',
    ],
    artTheme: 'balance',
  },
];

const EDUCATION = [
  {
    id: 'bacharelado-si',
    degree: 'Bacharelado em Sistemas de Informação',
    institution: 'Faculdade COTEMIG',
    period: 'Fevereiro de 2024 — Julho de 2027 (previsão de conclusão)',
    status: 'Em andamento',
    topics: [
      'Engenharia de Software',
      'Metodologias Ágeis e SCRUM',
      'Banco de Dados e SQL',
      'Programação Orientada a Objetos',
      'Algoritmos e Estruturas de Dados',
    ],
  },
  {
    id: 'tecnico-informatica',
    degree: 'Curso Técnico em Informática',
    institution: 'Colégio COTEMIG',
    period: 'Fevereiro de 2021 — Dezembro de 2023',
    status: 'Concluído',
    topics: [
      'Lógica de Programação',
      'Banco de Dados Oracle e SQL',
      'Desenvolvimento Web e Mobile',
      'Gerenciamento de Projetos (PMBOK)',
    ],
  },
];

const LANGUAGES = [
  {
    language: 'Português',
    proficiency: 'Nativo',
    description: 'Comunicação corporativa, elaboração de documentos e atendimento técnico',
  },
  {
    language: 'Inglês',
    proficiency: 'Avançado',
    description: 'Leitura de documentação técnica, APIs, ferramentas de QA/Dados e comunicação',
  },
];

/* =========================================================================
   COMPOSIÇÃO VISUAL VETORIAL (Capas Modernas e Confiáveis em SVG Puro)
   ========================================================================= */

function ProjectVisualArt({ theme, number, title }) {
  if (theme === 'carros') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-900 p-6 text-slate-100">
        <svg
          viewBox="0 0 400 300"
          className="h-full w-full max-h-56 opacity-90 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="carGrad" x1="50" y1="120" x2="350" y2="180">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <pattern id="gridCar" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="#0f172a" />
          <rect width="400" height="300" fill="url(#gridCar)" opacity="0.4" />
          {/* Automotive Aerodynamic Silhouette */}
          <path
            d="M60 190 Q120 185 150 145 Q190 100 260 105 Q300 110 340 160 L345 190 L60 190 Z"
            fill="url(#carGrad)"
            opacity="0.25"
          />
          <path
            d="M60 190 Q120 185 150 145 Q190 100 260 105 Q300 110 340 160 L345 190"
            stroke="url(#carGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="120" cy="190" r="22" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="280" cy="190" r="22" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="120" cy="190" r="8" fill="#38bdf8" />
          <circle cx="280" cy="190" r="8" fill="#38bdf8" />
          {/* API HTTP Verification Points */}
          <path d="M170 145 H250" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="210" cy="145" r="4" fill="#38bdf8" />
          <text x="210" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            GET /api/vehicles · 200 OK
          </text>
        </svg>
        <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-sky-400">
          PROJETO {number}
        </span>
        <span className="absolute bottom-4 left-4 text-xs font-medium text-slate-300">
          Validação Funcional de Endpoints &amp; JSON
        </span>
      </div>
    );
  }

  if (theme === 'balance') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-900 p-6 text-slate-100">
        <svg
          viewBox="0 0 400 300"
          className="h-full w-full max-h-56 opacity-90 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="restGrad" x1="100" y1="80" x2="300" y2="220">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <pattern id="gridRest" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="#0b1120" />
          <rect width="400" height="300" fill="url(#gridRest)" opacity="0.6" />
          {/* Balanced Interlocking Architectural Blocks */}
          <rect x="140" y="70" width="120" height="42" rx="4" fill="url(#restGrad)" opacity="0.8" />
          <rect x="110" y="125" width="180" height="42" rx="4" stroke="#60a5fa" strokeWidth="2" fill="#1e293b" />
          <rect x="80" y="180" width="240" height="42" rx="4" fill="url(#restGrad)" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="200" cy="91" r="5" fill="#ffffff" />
          <circle cx="200" cy="146" r="5" fill="#60a5fa" />
          <circle cx="200" cy="201" r="5" fill="#93c5fd" />
          <line x1="200" y1="96" x2="200" y2="196" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="200" y="245" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
            Spring Boot + MySQL · JWT REST
          </text>
        </svg>
        <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-blue-400">
          PROJETO {number}
        </span>
        <span className="absolute bottom-4 left-4 text-xs font-medium text-slate-300">
          Modernização REST &amp; Arquitetura Backend
        </span>
      </div>
    );
  }

  if (theme === 'sertao') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-stone-900 p-6 text-stone-100">
        <svg
          viewBox="0 0 400 300"
          className="h-full w-full max-h-56 opacity-90 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="warmGrad" x1="50" y1="50" x2="350" y2="250">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="#1c1917" />
          {/* Sun & Minimalist Architectural Earth Planes */}
          <circle cx="200" cy="110" r="48" stroke="url(#warmGrad)" strokeWidth="2" opacity="0.6" />
          <circle cx="200" cy="110" r="40" fill="url(#warmGrad)" opacity="0.2" />
          <path d="M40 230 L160 140 L280 230 Z" fill="#292524" stroke="#78716c" strokeWidth="1.5" />
          <path d="M180 230 L270 160 L360 230 Z" fill="#44403c" stroke="url(#warmGrad)" strokeWidth="1.5" />
          <line x1="40" y1="230" x2="360" y2="230" stroke="#78716c" strokeWidth="1.5" />
          <text x="200" y="260" textAnchor="middle" fill="#d6d3d1" fontSize="11" fontFamily="sans-serif">
            Artesanato &amp; Cultura · Identidade Web
          </text>
        </svg>
        <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-amber-400">
          PROJETO {number}
        </span>
        <span className="absolute bottom-4 left-4 text-xs font-medium text-stone-300">
          Apresentação Institucional &amp; Experiência Visual
        </span>
      </div>
    );
  }

  // Léo Andaimes
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-900 p-6 text-slate-100">
      <svg
        viewBox="0 0 400 300"
        className="h-full w-full max-h-56 opacity-90 transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="300" fill="#0f172a" />
        {/* Structural Framework Lines */}
        <line x1="100" y1="50" x2="100" y2="250" stroke="#cbd5e1" strokeWidth="2.5" />
        <line x1="200" y1="50" x2="200" y2="250" stroke="#cbd5e1" strokeWidth="2.5" />
        <line x1="300" y1="50" x2="300" y2="250" stroke="#cbd5e1" strokeWidth="2.5" />
        <line x1="100" y1="80" x2="300" y2="80" stroke="#94a3b8" strokeWidth="2" />
        <line x1="100" y1="150" x2="300" y2="150" stroke="#94a3b8" strokeWidth="2" />
        <line x1="100" y1="220" x2="300" y2="220" stroke="#94a3b8" strokeWidth="2" />
        {/* Diagonal X-bracing */}
        <line x1="100" y1="80" x2="200" y2="150" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="200" y1="80" x2="100" y2="150" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="200" y1="150" x2="300" y2="220" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="300" y1="150" x2="200" y2="220" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Node joints */}
        <circle cx="100" cy="80" r="4" fill="#38bdf8" />
        <circle cx="200" cy="80" r="4" fill="#38bdf8" />
        <circle cx="300" cy="80" r="4" fill="#38bdf8" />
        <circle cx="100" cy="150" r="4" fill="#38bdf8" />
        <circle cx="200" cy="150" r="4" fill="#38bdf8" />
        <circle cx="300" cy="150" r="4" fill="#38bdf8" />
        <text x="200" y="260" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
          Engenharia de Estruturas · Presença Digital
        </text>
      </svg>
      <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-cyan-400">
        PROJETO {number}
      </span>
      <span className="absolute bottom-4 left-4 text-xs font-medium text-slate-300">
        Apresentação de Serviços &amp; Responsividade
      </span>
    </div>
  );
}

/* =========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================= */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(PROFILE_DATA.links.email);
      } else {
        const temp = document.createElement('textarea');
        temp.value = PROFILE_DATA.links.email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const filteredProjects =
    activeFilter === 'todos'
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterGroup === activeFilter);

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Link de Acessibilidade */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo principal
      </a>

      {/* =====================================================================
          1. HEADER / NAVEGAÇÃO
          ===================================================================== */}
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80'
            : 'bg-[#FAFAFB]/90 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-8 px-5 sm:px-8">
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-base font-bold tracking-tight text-slate-950 whitespace-nowrap shrink-0 hover:text-blue-700 transition-colors"
          >
            {PROFILE_DATA.shortName}
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="py-1 whitespace-nowrap shrink-0 hover:text-slate-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contato"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-700"
            >
              Contato
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-950 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menu móvel"
            className="border-b border-slate-200 bg-white px-5 pb-6 pt-3 md:hidden"
          >
            <ul className="flex flex-col divide-y divide-slate-100">
              {NAV_LINKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-11 items-center justify-between py-2.5 text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-2">
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Entre em contato
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="conteudo-principal">
        {/* ===================================================================
            SEÇÃO 1 — HERO / APRESENTAÇÃO
            =================================================================== */}
        <section
          id="inicio"
          aria-labelledby="hero-title"
          className="border-b border-slate-200/80 bg-[#FAFAFB] pt-10 pb-16 sm:pt-16 sm:pb-24 lg:py-24"
        >
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
              {/* Coluna Esquerda: Apresentação Tipográfica */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                    <span>{PROFILE_DATA.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{PROFILE_DATA.academicStatus}</span>
                  </div>

                  <h1
                    id="hero-title"
                    className="mt-4 font-display text-[clamp(2.1rem,4vw,3.4rem)] font-bold leading-[1.12] tracking-tight text-slate-950"
                  >
                    {PROFILE_DATA.fullName}
                  </h1>

                  <p className="mt-3.5 font-display text-lg font-semibold tracking-tight text-blue-700 sm:text-xl">
                    {PROFILE_DATA.roleTitle}
                  </p>

                  <p className="mt-6 max-w-[64ch] text-base leading-[1.7] text-slate-600">
                    {PROFILE_DATA.presentation}
                  </p>

                  <figure className="mt-7 border-y border-slate-200/90 py-4">
                    <blockquote className="font-display text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
                      “{PROFILE_DATA.highlightQuote}”
                    </blockquote>
                  </figure>
                </div>

                <div className="mt-8 pt-2">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <a
                      href="#projetos"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800"
                    >
                      <span>Conheça meus projetos</span>
                      <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <a
                      href="#contato"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:border-slate-400 hover:bg-slate-50"
                    >
                      <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span>Entre em contato</span>
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
                    <a
                      href={PROFILE_DATA.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap shrink-0 hover:text-blue-700 transition-colors"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-700"
                        aria-hidden="true"
                      />
                    </a>

                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>

                    <a
                      href={PROFILE_DATA.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap shrink-0 hover:text-blue-700 transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-700"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Composição Tipográfica e Arquitetural */}
              <div className="lg:col-span-5">
                <div className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-xs">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.3]"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
                      backgroundSize: '36px 36px',
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-5 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Perfil Técnico</span>
                    <span className="font-mono tabular-nums text-slate-400">QA · SQL · API REST</span>
                  </div>

                  <div className="relative z-10 my-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-7xl font-bold tracking-tighter text-slate-900 sm:text-8xl select-none">
                        {PROFILE_DATA.monogram}
                        <span className="text-blue-600">.</span>
                      </span>
                      <div className="text-right font-mono text-[11px] leading-relaxed text-slate-400 tabular-nums">
                        <div>ERP · Implantação</div>
                        <div>Testes &amp; Validação</div>
                        <div>Análise de Dados</div>
                      </div>
                    </div>
                    <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-600">
                      Atuação orientada à confiabilidade de sistemas corporativos, validação estruturada
                      de serviços REST e integridade de dados.
                    </p>
                  </div>

                  <div className="relative z-10 border-t border-slate-200/80 pt-5">
                    <div className="mb-2 text-xs font-medium text-slate-400">
                      Áreas de direcionamento profissional
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-medium text-slate-800">
                      {PROFILE_DATA.targetRoles.map((role) => (
                        <div key={role} className="border-b border-slate-100 py-1 truncate">
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEÇÃO 2 — SOBRE MIM
            =================================================================== */}
        <section
          id="sobre"
          aria-labelledby="about-title"
          className="border-b border-slate-200/80 bg-white py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                  01. Trajetória &amp; Contexto
                </p>
                <h2
                  id="about-title"
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
                >
                  Sobre mim
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  Base prática construída no dia a dia de operações críticas, homologações e dados
                  corporativos.
                </p>
              </div>

              <div className="space-y-4 text-base leading-[1.72] text-slate-600 lg:col-span-8">
                <p>
                  Sou profissional de Tecnologia da Informação, com experiência de aproximadamente 2
                  anos e 5 meses em suporte técnico e implantação de sistemas ERP em ambientes
                  corporativos.
                </p>
                <p>
                  Durante minha trajetória na Ábax Sistemas, participei de projetos de implantação,
                  integração entre sistemas, elaboração de cenários de teste, validação de APIs REST,
                  consultas SQL e documentação de defeitos.
                </p>
                <p>
                  Essa experiência me proporcionou uma visão prática sobre funcionamento de sistemas,
                  processos de negócio, qualidade de software e tratamento de dados.
                </p>
                <p>
                  Atualmente, curso Bacharelado em Sistemas de Informação na Faculdade COTEMIG e busco
                  ampliar minha atuação nas áreas de Quality Assurance e Análise de Dados.
                </p>
              </div>
            </div>

            {/* Faixa com os 4 Indicadores Visuais */}
            <div className="mt-14 border-t border-slate-200 pt-10">
              <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
                {ABOUT_METRICS.map((metric, idx) => (
                  <div
                    key={metric.value}
                    className={idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'}
                  >
                    <dt className="font-display text-2xl font-bold tracking-tight text-slate-950 tabular-nums sm:text-[1.65rem]">
                      {metric.value}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-800">{metric.label}</dd>
                    <dd className="mt-1.5 text-xs leading-relaxed text-slate-500">{metric.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEÇÃO 3 — COMPETÊNCIAS TÉCNICAS
            =================================================================== */}
        <section
          id="competencias"
          aria-labelledby="skills-title"
          className="border-b border-slate-200/80 bg-[#FAFAFB] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                02. Domínio Técnico
              </p>
              <h2
                id="skills-title"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
              >
                Competências técnicas
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Conhecimentos estruturados entre validação de qualidade de software, manipulação
                analítica de dados e engenharia de aplicações.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {SKILLS_GROUPS.map((group) => {
                const IconComponent = group.icon;
                return (
                  <article
                    key={group.id}
                    className={`flex flex-col justify-between rounded-2xl border bg-white p-7 transition-colors ${
                      group.featured
                        ? 'border-slate-300 hover:border-blue-600/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/90 text-slate-900">
                          <IconComponent
                            className={`h-5 w-5 ${group.featured ? 'text-blue-700' : 'text-slate-700'}`}
                            aria-hidden="true"
                          />
                        </div>

                        {group.featured && (
                          <span className="text-xs font-medium text-blue-700">Foco Principal</span>
                        )}
                      </div>

                      <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-slate-950">
                        {group.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        {group.subtitle}
                      </p>

                      <ul className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
                        {group.items.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center justify-between py-2.5 text-sm font-medium text-slate-700"
                          >
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEÇÃO 4 — EXPERIÊNCIA PROFISSIONAL
            =================================================================== */}
        <section
          id="experiencia"
          aria-labelledby="experience-title"
          className="border-b border-slate-200/80 bg-white py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                  03. Trajetória Corporativa
                </p>
                <h2
                  id="experience-title"
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
                >
                  Experiência profissional
                </h2>

                <div className="mt-5 border-t border-slate-200 pt-5">
                  <p className="font-display text-base font-bold text-slate-900">Ábax Sistemas</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">Belo Horizonte/MG</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    Evolução profissional contínua em ambiente corporativo, progredindo do suporte
                    crítico de sistemas para a condução técnica de implantações ERP, homologações,
                    validações de APIs REST e integrações via SQL.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <ol className="relative border-l border-slate-200 pl-6 sm:pl-9 space-y-12">
                  {EXPERIENCE_ROLES.map((role, idx) => (
                    <li key={role.id} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[29px] sm:-left-[41px] top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 ${
                          idx === 0 ? 'border-blue-700 bg-white' : 'border-slate-400 bg-white'
                        }`}
                      />

                      <div className="rounded-2xl border border-slate-200/90 bg-[#FAFAFB] p-6 sm:p-8">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <h3 className="font-display text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                            {role.role}
                          </h3>
                          <span className="font-mono text-xs font-medium text-slate-500 tabular-nums shrink-0">
                            {role.period}
                          </span>
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-medium text-slate-700">Ábax Sistemas</span>
                          <span aria-hidden="true">·</span>
                          <span>{role.focus}</span>
                        </div>

                        <ul className="mt-6 space-y-2.5 border-t border-slate-200/80 pt-5 text-sm leading-relaxed text-slate-600">
                          {role.responsibilities.map((resp) => (
                            <li key={resp} className="flex items-start gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400"
                              />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEÇÃO 5 — PROJETOS EM DESTAQUE
            =================================================================== */}
        <section
          id="projetos"
          aria-labelledby="projects-title"
          className="border-b border-slate-200/80 bg-[#FAFAFB] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                  04. Portfólio Prático
                </p>
                <h2
                  id="projects-title"
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
                >
                  Projetos em destaque
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Projetos acadêmicos e pessoais nos quais aplico conhecimentos de desenvolvimento,
                  qualidade de software, integração de sistemas e manipulação de dados.
                </p>
              </div>

              {/* Filtro Funcional */}
              <div
                role="group"
                aria-label="Filtrar projetos"
                className="inline-flex flex-wrap items-center gap-1 self-start rounded-xl border border-slate-200/90 bg-slate-100/90 p-1 lg:self-auto"
              >
                <button
                  type="button"
                  onClick={() => setActiveFilter('todos')}
                  className={`min-h-9 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'todos'
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Todos os projetos
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('qa-dados')}
                  className={`min-h-9 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'qa-dados'
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  QA, APIs &amp; Backend
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('web')}
                  className={`min-h-9 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeFilter === 'web'
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Desenvolvimento Web
                </button>
              </div>
            </div>

            {/* Grid de 2 Colunas no Desktop e 1 Coluna no Mobile */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-colors hover:border-slate-300"
                >
                  <div>
                    {/* Capa Visual Vetorial Confiável e Leve */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Abrir detalhes do projeto ${project.name}`}
                      className="block aspect-[4/3] w-full overflow-hidden border-b border-slate-100 text-left focus:outline-none"
                    >
                      <ProjectVisualArt
                        theme={project.artTheme}
                        number={project.number}
                        title={project.name}
                      />
                    </button>

                    <div className="p-6 sm:p-7">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="font-mono text-slate-400 tabular-nums">
                          {project.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className={project.featured ? 'text-blue-700 font-semibold' : ''}>
                          {project.category}
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-slate-950">
                        {project.name}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {project.description}
                      </p>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <p className="text-xs font-semibold text-slate-800">
                          {project.highlightsTitle}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
                          {project.highlights.slice(0, 4).map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 bg-[#FAFAFB]/60 px-6 py-4 sm:px-7">
                    <div className="text-[11px] font-medium text-slate-400">
                      Principais tecnologias
                    </div>
                    <p className="mt-1 font-mono text-xs text-slate-700">
                      {project.technologies.join(' · ')}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-700"
                      >
                        <span>Ver no GitHub</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex min-h-10 items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-200/60 hover:text-slate-950"
                      >
                        Ficha técnica
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEÇÃO 6 — FORMAÇÃO ACADÊMICA & SEÇÃO 7 — IDIOMAS
            =================================================================== */}
        <section
          id="formacao"
          aria-labelledby="education-title"
          className="border-b border-slate-200/80 bg-white py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                05. Base Acadêmica
              </p>
              <h2
                id="education-title"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
              >
                Formação acadêmica
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Formação técnica e superior voltada à engenharia de software, banco de dados e
                metodologias de desenvolvimento.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {EDUCATION.map((edu) => (
                <article
                  key={edu.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#FAFAFB] p-6 sm:p-8"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="text-blue-700 font-semibold">{edu.institution}</span>
                      <span aria-hidden="true">·</span>
                      <span>{edu.status}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                      {edu.degree}
                    </h3>

                    <p className="mt-1.5 font-mono text-xs text-slate-500 tabular-nums">
                      {edu.period}
                    </p>

                    <div className="mt-6 border-t border-slate-200/80 pt-5">
                      <p className="text-xs font-semibold text-slate-800">Conhecimentos relevantes</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {edu.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400"
                            />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* SEÇÃO 7 — IDIOMAS */}
            <div
              id="idiomas"
              aria-labelledby="languages-title"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h3
                    id="languages-title"
                    className="font-display text-lg font-bold tracking-tight text-slate-950"
                  >
                    Idiomas
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Comunicação profissional e leitura técnica no cotidiano de projetos.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8 lg:divide-x lg:divide-slate-200 lg:gap-0">
                  {LANGUAGES.map((lang, idx) => (
                    <div key={lang.language} className={idx === 0 ? 'lg:pr-8' : 'lg:pl-8'}>
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-display text-base font-bold text-slate-950">
                          {lang.language}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">
                          ·
                        </span>
                        <span className="text-sm font-semibold text-blue-700">
                          {lang.proficiency}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        {lang.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEÇÃO 8 — CONTATO
            =================================================================== */}
        <section
          id="contato"
          aria-labelledby="contact-title"
          className="bg-[#FAFAFB] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                    06. Contato Profissional
                  </p>
                  <h2
                    id="contact-title"
                    className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                  >
                    Vamos conversar?
                  </h2>
                  <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-slate-600">
                    Estou aberto a oportunidades profissionais, desafios na área de tecnologia e
                    conexões com profissionais do setor.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <a
                      href={`mailto:${PROFILE_DATA.links.email}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Enviar e-mail</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:border-slate-400 hover:bg-slate-50"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                          <span className="text-emerald-800">E-mail copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-slate-500" aria-hidden="true" />
                          <span>Copiar endereço</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  <dl className="divide-y divide-slate-100">
                    <div className="pb-4">
                      <dt className="text-xs font-medium text-slate-400">E-mail direto</dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${PROFILE_DATA.links.email}`}
                          className="font-mono text-sm font-medium text-slate-900 hover:text-blue-700 transition-colors"
                        >
                          {PROFILE_DATA.links.email}
                        </a>
                      </dd>
                    </div>

                    <div className="py-4">
                      <dt className="text-xs font-medium text-slate-400">LinkedIn</dt>
                      <dd className="mt-1">
                        <a
                          href={PROFILE_DATA.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors"
                        >
                          <span>linkedin.com/in/guilherme-emanuel24</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-700"
                            aria-hidden="true"
                          />
                        </a>
                      </dd>
                    </div>

                    <div className="pt-4">
                      <dt className="text-xs font-medium text-slate-400">GitHub</dt>
                      <dd className="mt-1">
                        <a
                          href={PROFILE_DATA.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors"
                        >
                          <span>github.com/guilherme-emmg</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-700"
                            aria-hidden="true"
                          />
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ MINIMALISTA */}
      <footer className="border-t border-slate-200/90 bg-white py-8">
        <div className="mx-auto flex max-w-[1160px] flex-col justify-between gap-4 px-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-xs font-semibold text-slate-800">
              © {currentYear} {PROFILE_DATA.fullName}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Qualidade de software, precisão analítica e tecnologia orientada a resultados.
            </p>
          </div>

          <a
            href="#inicio"
            aria-label="Voltar ao topo"
            className="inline-flex min-h-10 items-center gap-1.5 self-start text-xs font-medium text-slate-500 whitespace-nowrap shrink-0 hover:text-slate-950 sm:self-auto transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </footer>

      {/* ===================================================================
          MODAL DE FICHA TÉCNICA DO PROJETO
          =================================================================== */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={() => setSelectedProject(null)}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
              <div className="text-xs font-medium text-slate-500">
                <span className="font-mono tabular-nums text-slate-400">
                  Projeto {selectedProject.number}
                </span>
                <span aria-hidden="true" className="mx-2">
                  ·
                </span>
                <span>{selectedProject.category}</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Fechar ficha técnica"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
                <ProjectVisualArt
                  theme={selectedProject.artTheme}
                  number={selectedProject.number}
                  title={selectedProject.name}
                />
              </div>

              <h3
                id="modal-title"
                className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-950"
              >
                {selectedProject.name}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {selectedProject.description}
              </p>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <h4 className="font-display text-sm font-bold text-slate-900">
                  {selectedProject.highlightsTitle}
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {selectedProject.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="text-xs font-medium text-slate-400">
                  Tecnologias identificadas no repositório
                </div>
                <p className="mt-1.5 font-mono text-xs text-slate-800">
                  {selectedProject.technologies.join(' · ')}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Fechar
                </button>

                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  <span>Ver no GitHub</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

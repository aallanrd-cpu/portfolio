// Centralized project data for the portfolio
import { 
  ProjectDetail, 
  WorkProject, 
  GitHubProject, 
  ProjectCategory, 
  CategoryInfo,
  ProjectNavigation
} from '@/lib/types/project'

// Work Projects Data
const workProjects: WorkProject[] = [
  {
    id: 'enterprise-event-hub',
    slug: 'enterprise-event-hub',
    title: 'Microservices Event Hub',
    category: 'enterprise',
    description: 'Scalable event-driven architecture processing 500K+ daily real-time events',
    longDescription: 'Built a comprehensive event-driven architecture platform that revolutionized how our microservices communicate. The system handles massive throughput while maintaining reliability and providing comprehensive monitoring and alerting capabilities. The platform serves as the backbone for real-time data processing across multiple business domains.',
    technologies: ['Kafka', 'Node.js', 'Python', 'Docker', 'Kubernetes', 'AWS', 'Redis', 'PostgreSQL'],
    highlights: [
      'Reduced system coupling by 70% through event-driven design',
      'Implemented fault-tolerant message processing with dead letter queues',
      'Built comprehensive monitoring and alerting dashboard',
      'Achieved 99.95% uptime across all event processing pipelines',
      'Decreased message processing latency from 200ms to under 50ms',
      'Enabled seamless scaling from 50K to 500K+ daily events'
    ],
    metrics: {
      performance: '99.95% uptime',
      scale: '500K+ events/day',
      latency: '<50ms processing time',
      reliability: 'Zero message loss'
    },
    timeframe: '2022-2024',
    company: 'Wind River (Kaptyn)',
    status: 'ongoing',
    featured: true,
    links: {
      documentation: 'https://docs.internal.windriver.com/event-hub',
      github: 'https://github.com/windriver/event-hub-internal'
    },
    gallery: {
      screenshots: [
        {
          src: '/images/projects/event-hub/dashboard.jpg',
          alt: 'Event Hub Monitoring Dashboard',
          caption: 'Real-time monitoring dashboard showing event throughput and system health',
          category: 'screenshot'
        },
        {
          src: '/images/projects/event-hub/architecture.jpg',
          alt: 'Event Hub Architecture Diagram',
          caption: 'High-level architecture showing microservices communication flow',
          category: 'diagram'
        }
      ],
      diagrams: [
        {
          src: '/images/projects/event-hub/data-flow.jpg',
          alt: 'Data Flow Diagram',
          caption: 'Event processing pipeline and data transformation flow',
          category: 'diagram'
        }
      ],
      videos: []
    },
    architecture: {
      overview: 'The Event Hub follows a distributed microservices architecture with Kafka as the central message broker. The system is designed for horizontal scaling and fault tolerance.',
      diagrams: [
        {
          src: '/images/projects/event-hub/system-architecture.jpg',
          alt: 'System Architecture Overview',
          category: 'diagram'
        }
      ],
      components: [
        {
          name: 'Kafka Cluster',
          type: 'infrastructure',
          description: 'Multi-broker Kafka cluster handling event streaming',
          technologies: ['Apache Kafka', 'Zookeeper', 'Kafka Connect']
        },
        {
          name: 'Event Processors',
          type: 'service',
          description: 'Microservices that consume and process events',
          technologies: ['Node.js', 'Python', 'Docker']
        },
        {
          name: 'Monitoring Dashboard',
          type: 'frontend',
          description: 'Real-time monitoring and alerting interface',
          technologies: ['React', 'D3.js', 'WebSocket']
        }
      ],
      dataFlow: [
        { step: 1, description: 'Event producers publish messages to Kafka topics', component: 'Event Producers' },
        { step: 2, description: 'Kafka brokers distribute messages to partitions', component: 'Kafka Cluster' },
        { step: 3, description: 'Event processors consume messages in real-time', component: 'Event Processors' },
        { step: 4, description: 'Processed data is stored or forwarded to downstream systems', component: 'Data Stores' }
      ]
    },
    timeline: [
      {
        phase: 'Architecture & Design',
        duration: '2 months',
        milestones: ['System architecture design', 'Technology stack selection', 'Infrastructure planning'],
        deliverables: ['Architecture documentation', 'Technology evaluation', 'Infrastructure design']
      },
      {
        phase: 'Core Development',
        duration: '6 months',
        milestones: ['Kafka cluster setup', 'Event processing services', 'Monitoring system'],
        deliverables: ['Event processing pipeline', 'Monitoring dashboard', 'API documentation']
      },
      {
        phase: 'Production & Optimization',
        duration: 'Ongoing',
        milestones: ['Production deployment', 'Performance optimization', 'Feature enhancements'],
        deliverables: ['Production system', 'Performance reports', 'Feature updates']
      }
    ],
    testimonial: {
      text: "Allan's event-driven architecture transformed how our microservices communicate. The system's reliability and performance have exceeded our expectations.",
      author: "Sarah Chen",
      role: "Principal Software Architect",
      company: "Wind River"
    },
    relatedProjects: ['graphql-api-gateway', 'multi-cloud-infrastructure']
  },
  {
    id: 'multi-cloud-infrastructure',
    slug: 'multi-cloud-infrastructure',
    title: 'Terraform Cloud Orchestrator',
    category: 'cloud-infrastructure',
    description: 'Infrastructure as Code solution managing AWS, GCP, and Azure environments',
    longDescription: 'Designed and implemented a comprehensive multi-cloud infrastructure automation platform using Terraform. The solution standardizes deployments across cloud providers while enabling blue-green deployment strategies and self-healing infrastructure. This platform reduced infrastructure provisioning time by 80% and eliminated configuration drift.',
    technologies: ['Terraform', 'AWS', 'GCP', 'Azure', 'GitLab CI/CD', 'Ansible', 'Vault', 'Prometheus'],
    highlights: [
      'Standardized infrastructure patterns across cloud providers',
      'Implemented blue-green deployment strategies',
      'Created self-healing infrastructure with auto-scaling',
      'Reduced infrastructure provisioning time by 80%',
      'Eliminated configuration drift with state management',
      'Built disaster recovery automation across multiple clouds'
    ],
    metrics: {
      performance: '60% faster deployments',
      scale: '100+ environment configs',
      reliability: 'Zero-downtime deployments',
      efficiency: '80% reduction in provisioning time'
    },
    timeframe: '2023-2024',
    company: 'Wind River (Kaptyn)',
    status: 'maintained',
    links: {
      documentation: 'https://github.com/allanrojasd/cloud-infrastructure-terraform',
      github: 'https://github.com/allanrojasd/cloud-infrastructure-terraform'
    },
    gallery: {
      screenshots: [
        {
          src: '/images/projects/terraform/console.jpg',
          alt: 'Terraform Cloud Console',
          caption: 'Multi-cloud infrastructure management console',
          category: 'screenshot'
        }
      ],
      diagrams: [
        {
          src: '/images/projects/terraform/multi-cloud.jpg',
          alt: 'Multi-Cloud Architecture',
          caption: 'Infrastructure deployment across AWS, GCP, and Azure',
          category: 'diagram'
        }
      ],
      videos: []
    },
    relatedProjects: ['enterprise-event-hub', 'medical-manufacturing-analytics']
  },
  {
    id: 'graphql-api-gateway',
    slug: 'graphql-api-gateway',
    title: 'Unified API Gateway',
    category: 'api-development',
    description: 'High-performance GraphQL gateway with real-time analytics and monitoring',
    longDescription: 'Built a sophisticated GraphQL API gateway that federates schemas across 15+ microservices. The platform includes intelligent caching, comprehensive analytics, and real-time monitoring capabilities that significantly improved API performance and developer experience. The gateway handles over 1M requests daily with sub-100ms response times.',
    technologies: ['GraphQL', 'Apollo Server', 'Node.js', 'PostgreSQL', 'Redis', 'DataDog', 'Express', 'JWT'],
    highlights: [
      'Built type-safe schema federation across 15+ microservices',
      'Implemented intelligent caching strategies reducing response times by 60%',
      'Created comprehensive API analytics dashboard',
      'Achieved 40% reduction in bandwidth usage through query optimization',
      'Built real-time subscription system for live data',
      'Implemented rate limiting and security middleware'
    ],
    metrics: {
      performance: '10x faster than REST equivalent',
      scale: '1M+ requests/day',
      efficiency: '40% reduced bandwidth usage',
      latency: '<100ms response time'
    },
    timeframe: '2023-Present',
    company: 'Wind River (Kaptyn)',
    status: 'ongoing',
    links: {
      demo: 'https://api-gateway-demo.windriver.com',
      documentation: 'https://docs.windriver.com/api-gateway'
    },
    gallery: {
      screenshots: [
        {
          src: '/images/projects/graphql/playground.jpg',
          alt: 'GraphQL Playground',
          caption: 'Interactive GraphQL query interface and schema explorer',
          category: 'screenshot'
        }
      ],
      diagrams: [],
      videos: []
    },
    relatedProjects: ['enterprise-event-hub', 'luxury-ride-hailing']
  },
  {
    id: 'luxury-ride-hailing',
    slug: 'luxury-ride-hailing',
    title: 'Premium Transport Platform',
    category: 'full-stack',
    description: 'Real-time ride-hailing application with advanced booking and tracking features',
    longDescription: 'Developed a comprehensive luxury ride-hailing mobile application featuring real-time GPS tracking, sophisticated driver-passenger matching algorithms, and integrated payment processing. The platform serves high-end clients with premium transportation needs and includes features like pre-booking, route optimization, and luxury vehicle fleet management.',
    technologies: ['React Native', 'Node.js', 'WebSockets', 'PostgreSQL', 'Google Maps API', 'Stripe', 'Redis', 'AWS'],
    highlights: [
      'Implemented real-time GPS tracking with WebSocket communication',
      'Built sophisticated matching algorithm for drivers and passengers',
      'Integrated payment processing with fraud detection',
      'Achieved 99.9% location accuracy for all rides',
      'Created dynamic pricing algorithm based on demand',
      'Built comprehensive admin dashboard for fleet management'
    ],
    metrics: {
      performance: 'Sub-2s booking confirmation',
      scale: '10K+ active users',
      reliability: '99.9% location accuracy',
      adoption: '95% user satisfaction rate'
    },
    timeframe: '2021-2022',
    company: 'Costa Rica Software Services',
    status: 'completed',
    links: {
      demo: 'https://luxury-rides-demo.com'
    },
    gallery: {
      screenshots: [
        {
          src: '/images/projects/ride-hailing/app-interface.jpg',
          alt: 'Mobile App Interface',
          caption: 'Luxury ride-hailing mobile application user interface',
          category: 'screenshot'
        }
      ],
      diagrams: [],
      videos: []
    },
    relatedProjects: ['graphql-api-gateway']
  },
  {
    id: 'medical-manufacturing-analytics',
    slug: 'medical-manufacturing-analytics',
    title: 'Manufacturing Intelligence Platform',
    category: 'devops',
    description: 'Real-time production analytics and quality assurance system for medical devices',
    longDescription: 'Architected and built a comprehensive manufacturing intelligence platform for medical device production. The system provides real-time quality monitoring, regulatory compliance tracking, and predictive maintenance capabilities that significantly improved production efficiency. The platform processes data from 100+ production lines and ensures FDA compliance.',
    technologies: ['Java', 'Spring Boot', 'Python', 'Apache Spark', 'InfluxDB', 'Grafana', 'Docker', 'Kubernetes'],
    highlights: [
      'Built real-time quality monitoring preventing 95% of defects',
      'Implemented traceability system for regulatory compliance',
      'Created predictive maintenance algorithms reducing downtime by 30%',
      'Achieved FDA 21 CFR Part 11 compliance for all data systems',
      'Integrated with legacy manufacturing equipment',
      'Built automated reporting system for regulatory audits'
    ],
    metrics: {
      performance: 'Real-time data processing',
      scale: '100+ production lines',
      compliance: 'FDA 21 CFR Part 11 compliant',
      efficiency: '30% reduction in downtime'
    },
    timeframe: '2018-2020',
    company: 'MicroVention-Terumo',
    status: 'completed',
    links: {
      documentation: 'https://internal-docs.microvention.com/manufacturing-intelligence'
    },
    gallery: {
      screenshots: [
        {
          src: '/images/projects/manufacturing/dashboard.jpg',
          alt: 'Manufacturing Analytics Dashboard',
          caption: 'Real-time production monitoring and quality control dashboard',
          category: 'screenshot'
        }
      ],
      diagrams: [],
      videos: []
    },
    relatedProjects: ['multi-cloud-infrastructure']
  }
]

// GitHub Projects Data
const githubProjects: GitHubProject[] = [
  {
    id: 'cloud-infrastructure-terraform',
    slug: 'cloud-infrastructure-terraform',
    title: 'Cloud Infrastructure Terraform',
    category: 'open-source',
    description: 'Scalable cloud infrastructure automation using Terraform across AWS, GCP, and Azure with best practices for production environments.',
    longDescription: 'A comprehensive collection of Terraform modules and configurations for deploying scalable infrastructure across multiple cloud providers. This repository includes best practices, security configurations, and production-ready setups for various scenarios including microservices, data pipelines, and web applications.',
    technologies: ['Terraform', 'AWS', 'GCP', 'Azure', 'GitHub Actions', 'Vault'],
    language: 'HCL',
    stars: 24,
    topics: ['terraform', 'aws', 'gcp', 'azure', 'infrastructure', 'devops'],
    githubUrl: 'https://github.com/allanrojasd/cloud-infrastructure-terraform',
    highlights: [
      'Modular Terraform configurations for multiple cloud providers',
      'Automated security scanning and compliance checks',
      'Production-ready infrastructure templates',
      'Comprehensive documentation and examples',
      'CI/CD integration with GitHub Actions',
      'Cost optimization strategies implemented'
    ],
    timeframe: '2023-Present',
    status: 'maintained',
    featured: true,
    links: {
      github: 'https://github.com/allanrojasd/cloud-infrastructure-terraform',
      documentation: 'https://github.com/allanrojasd/cloud-infrastructure-terraform/wiki'
    },
    gallery: {
      screenshots: [
        {
          src: '/images/projects/terraform-oss/repository.jpg',
          alt: 'GitHub Repository Overview',
          caption: 'Open source Terraform infrastructure repository',
          category: 'screenshot'
        }
      ],
      diagrams: [],
      videos: []
    },
    relatedProjects: ['multi-cloud-infrastructure']
  },
  {
    id: 'react-microservices-dashboard',
    slug: 'react-microservices-dashboard',
    title: 'React Microservices Dashboard',
    category: 'open-source',
    description: 'Event-driven microservices dashboard built with React and Node.js, featuring real-time monitoring and analytics.',
    longDescription: 'An open-source monitoring dashboard specifically designed for microservices architectures. Built with React and Node.js, it provides real-time insights into service health, performance metrics, and communication patterns. The dashboard supports multiple data sources and is highly customizable.',
    technologies: ['React', 'Node.js', 'TypeScript', 'D3.js', 'WebSocket', 'Docker'],
    language: 'TypeScript',
    stars: 18,
    topics: ['react', 'microservices', 'dashboard', 'real-time', 'monitoring'],
    githubUrl: 'https://github.com/allanrojasd/react-microservices-dashboard',
    highlights: [
      'Real-time service health monitoring',
      'Interactive data visualizations with D3.js',
      'Customizable dashboard layouts',
      'Multi-datasource support',
      'Docker containerization for easy deployment',
      'Comprehensive test coverage'
    ],
    timeframe: '2022-2023',
    status: 'maintained',
    links: {
      github: 'https://github.com/allanrojasd/react-microservices-dashboard',
      demo: 'https://microservices-dashboard-demo.vercel.app'
    },
    gallery: {
      screenshots: [],
      diagrams: [],
      videos: []
    },
    relatedProjects: ['enterprise-event-hub']
  },
  {
    id: 'kafka-event-processor',
    slug: 'kafka-event-processor',
    title: 'Kafka Event Processor',
    category: 'open-source',
    description: 'High-throughput event processing system handling 500k+ daily events with fault tolerance and monitoring.',
    longDescription: 'A robust event processing framework built on Apache Kafka for handling high-throughput event streams. The system includes fault tolerance mechanisms, automatic scaling, and comprehensive monitoring. Designed for production environments requiring reliable event processing.',
    technologies: ['Python', 'Apache Kafka', 'Docker', 'Prometheus', 'Kubernetes'],
    language: 'Python',
    stars: 31,
    topics: ['kafka', 'event-processing', 'python', 'scalability', 'streaming'],
    githubUrl: 'https://github.com/allanrojasd/kafka-event-processor',
    highlights: [
      'High-throughput event processing (500K+ events/day)',
      'Fault-tolerant architecture with automatic recovery',
      'Horizontal scaling capabilities',
      'Built-in monitoring and alerting',
      'Production-ready Docker containers',
      'Comprehensive error handling and dead letter queues'
    ],
    timeframe: '2022-Present',
    status: 'ongoing',
    links: {
      github: 'https://github.com/allanrojasd/kafka-event-processor',
      documentation: 'https://kafka-event-processor.readthedocs.io'
    },
    gallery: {
      screenshots: [],
      diagrams: [],
      videos: []
    },
    relatedProjects: ['enterprise-event-hub']
  },
  {
    id: 'graphql-apollo-api',
    slug: 'graphql-apollo-api',
    title: 'GraphQL Apollo API',
    category: 'open-source',
    description: 'Production-ready GraphQL API with Apollo Server, comprehensive testing, and performance optimization.',
    longDescription: 'A fully-featured GraphQL API implementation using Apollo Server with best practices for production deployment. Includes authentication, authorization, caching, rate limiting, and comprehensive testing. Serves as a template for building scalable GraphQL APIs.',
    technologies: ['GraphQL', 'Apollo Server', 'Node.js', 'Jest', 'PostgreSQL'],
    language: 'JavaScript',
    stars: 15,
    topics: ['graphql', 'apollo', 'api', 'testing', 'nodejs'],
    githubUrl: 'https://github.com/allanrojasd/graphql-apollo-api',
    highlights: [
      'Production-ready GraphQL API template',
      'Comprehensive authentication and authorization',
      'Performance optimization with caching',
      'Extensive test coverage with Jest',
      'Rate limiting and security middleware',
      'Docker deployment configuration'
    ],
    timeframe: '2021-2022',
    status: 'completed',
    links: {
      github: 'https://github.com/allanrojasd/graphql-apollo-api',
      demo: 'https://graphql-apollo-demo.herokuapp.com'
    },
    gallery: {
      screenshots: [],
      diagrams: [],
      videos: []
    },
    relatedProjects: ['graphql-api-gateway']
  }
]

// Combine all projects
export const allProjects: ProjectDetail[] = [...workProjects, ...githubProjects]

// Utility functions
export function getAllProjects(): ProjectDetail[] {
  return allProjects
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
  return allProjects.find(project => project.slug === slug) || null
}

export function getWorkProjects(): WorkProject[] {
  return workProjects
}

export function getGitHubProjects(): GitHubProject[] {
  return githubProjects
}

export function getFeaturedProjects(): ProjectDetail[] {
  return allProjects.filter(project => project.featured)
}

export function getProjectsByCategory(category: ProjectCategory): ProjectDetail[] {
  return allProjects.filter(project => project.category === category)
}

export function getRelatedProjects(projectSlug: string, limit: number = 3): ProjectDetail[] {
  const currentProject = getProjectBySlug(projectSlug)
  if (!currentProject) return []
  
  // Get related projects based on relatedProjects array first
  const relatedByIds = currentProject.relatedProjects
    ?.map(id => getProjectBySlug(id))
    .filter(Boolean) as ProjectDetail[] || []
  
  // If we need more, add projects from same category
  if (relatedByIds.length < limit) {
    const sameCategoryProjects = getProjectsByCategory(currentProject.category)
      .filter(p => p.slug !== projectSlug && !relatedByIds.some(r => r.slug === p.slug))
      .slice(0, limit - relatedByIds.length)
    
    relatedByIds.push(...sameCategoryProjects)
  }
  
  return relatedByIds.slice(0, limit)
}

export function getProjectNavigation(projectSlug: string): ProjectNavigation {
  const currentIndex = allProjects.findIndex(p => p.slug === projectSlug)
  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : undefined
  const related = getRelatedProjects(projectSlug, 3)
  
  return {
    previous: previous ? { slug: previous.slug, title: previous.title } : undefined,
    next: next ? { slug: next.slug, title: next.title } : undefined,
    related: related.map(p => ({ slug: p.slug, title: p.title, category: p.category }))
  }
}

export function getCategoryInfo(category: ProjectCategory): CategoryInfo {
  const categoryMap: Record<ProjectCategory, CategoryInfo> = {
    'enterprise': { 
      label: 'Enterprise', 
      icon: '🏢', 
      color: 'from-blue-500 to-cyan-500',
      description: 'Large-scale enterprise solutions and platforms'
    },
    'cloud-infrastructure': { 
      label: 'Cloud Infrastructure', 
      icon: '☁️', 
      color: 'from-purple-500 to-pink-500',
      description: 'Cloud architecture and infrastructure automation'
    },
    'api-development': { 
      label: 'API Development', 
      icon: '🔌', 
      color: 'from-green-500 to-emerald-500',
      description: 'API design, development, and integration'
    },
    'full-stack': { 
      label: 'Full Stack', 
      icon: '💻', 
      color: 'from-orange-500 to-red-500',
      description: 'End-to-end application development'
    },
    'devops': { 
      label: 'DevOps', 
      icon: '🔧', 
      color: 'from-yellow-500 to-orange-500',
      description: 'Development operations and automation'
    },
    'open-source': { 
      label: 'Open Source', 
      icon: '🚀', 
      color: 'from-indigo-500 to-purple-500',
      description: 'Community-driven open source projects'
    }
  }
  return categoryMap[category]
}

// Static data generation for Next.js
export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export { ProjectCategory } from '@/lib/types/project'
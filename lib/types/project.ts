// Core project interfaces and types for the portfolio

export interface ProjectMetrics {
  performance?: string
  scale?: string
  uptime?: string
  adoption?: string
  latency?: string
  reliability?: string
  efficiency?: string
  compliance?: string
}

export interface ProjectLinks {
  live?: string
  documentation?: string
  demo?: string
  github?: string
  caseStudy?: string
}

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  category: 'screenshot' | 'diagram' | 'mockup' | 'chart' | 'hero'
  dimensions?: { width: number; height: number }
}

export interface ProjectVideo {
  type: 'youtube' | 'local' | 'embed'
  src: string
  title: string
  description?: string
  thumbnail: string
  duration?: string
}

export interface MediaGallery {
  hero?: ProjectImage
  screenshots: ProjectImage[]
  diagrams: ProjectImage[]
  videos: ProjectVideo[]
}

export interface ArchitectureData {
  overview: string
  diagrams: ProjectImage[]
  components: SystemComponent[]
  dataFlow: DataFlowStep[]
}

export interface SystemComponent {
  name: string
  type: 'service' | 'database' | 'api' | 'frontend' | 'infrastructure'
  description: string
  technologies: string[]
}

export interface DataFlowStep {
  step: number
  description: string
  component: string
}

export interface ProjectTimeline {
  phase: string
  duration: string
  milestones: string[]
  deliverables: string[]
}

export interface Testimonial {
  text: string
  author: string
  role: string
  company: string
}

export type ProjectCategory = 
  | 'enterprise' 
  | 'cloud-infrastructure' 
  | 'api-development' 
  | 'full-stack' 
  | 'devops'
  | 'open-source'

export type ProjectStatus = 'completed' | 'ongoing' | 'maintained'

export interface BaseProject {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  description: string
  longDescription: string
  technologies: string[]
  highlights: string[]
  timeframe: string
  status: ProjectStatus
  featured?: boolean
  company?: string
  links?: ProjectLinks
  metrics?: ProjectMetrics
  gallery?: MediaGallery
  architecture?: ArchitectureData
  timeline?: ProjectTimeline[]
  testimonial?: Testimonial
  relatedProjects?: string[]
}

// Work Project - Professional projects
export interface WorkProject extends BaseProject {
  category: Exclude<ProjectCategory, 'open-source'>
  company: string
}

// GitHub Project - Open source projects
export interface GitHubProject extends BaseProject {
  category: 'open-source'
  language: string
  stars: number
  topics: string[]
  githubUrl: string
}

// Union type for all projects
export type ProjectDetail = WorkProject | GitHubProject

// Filter interfaces
export interface ProjectFilter {
  categories: ProjectCategory[]
  technologies: string[]
  companies: string[]
  featured?: boolean
}

// Navigation interfaces
export interface ProjectNavigation {
  previous?: { slug: string; title: string }
  next?: { slug: string; title: string }
  related: Array<{ slug: string; title: string; category: ProjectCategory }>
}

// Category information
export interface CategoryInfo {
  label: string
  icon: string
  color: string
  description?: string
}

// SEO and metadata
export interface ProjectSEO {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
}
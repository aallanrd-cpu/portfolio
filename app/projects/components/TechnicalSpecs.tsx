'use client'

import React from 'react'
import { ArchitectureData, ProjectMetrics, ProjectTimeline } from '@/lib/types/project'

interface TechnicalSpecsProps {
  architecture?: ArchitectureData
  metrics?: ProjectMetrics
  timeline?: ProjectTimeline[]
  technologies: string[]
}

function MetricsDisplay({ metrics }: { metrics: ProjectMetrics }) {
  const metricEntries = Object.entries(metrics).filter(([_, value]) => value)
  
  if (metricEntries.length === 0) return null
  
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">📊 Key Metrics</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricEntries.map(([key, value]) => (
          <div key={key} className="rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/5">
            <div className="text-sm text-gray-400 capitalize mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-lg font-semibold text-cyan-300">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TechnologiesDisplay({ technologies }: { technologies: string[] }) {
  // Group technologies by category for better display
  const groupedTech = technologies.reduce((acc, tech) => {
    let category = 'Other'
    
    // Frontend technologies
    if (['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS', 'HTML'].some(t => tech.includes(t))) {
      category = 'Frontend'
    }
    // Backend technologies
    else if (['Node.js', 'Python', 'Java', 'Spring Boot', '.NET', 'Express', 'FastAPI', 'Django'].some(t => tech.includes(t))) {
      category = 'Backend'
    }
    // Database technologies
    else if (['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'InfluxDB', 'SQL Server'].some(t => tech.includes(t))) {
      category = 'Database'
    }
    // Cloud & Infrastructure
    else if (['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'].some(t => tech.includes(t))) {
      category = 'Cloud & Infrastructure'
    }
    // Data & Analytics
    else if (['Kafka', 'Apache Spark', 'GraphQL', 'REST', 'WebSocket', 'Prometheus', 'Grafana'].some(t => tech.includes(t))) {
      category = 'Data & Analytics'
    }
    
    if (!acc[category]) acc[category] = []
    acc[category].push(tech)
    return acc
  }, {} as Record<string, string[]>)

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">🛠️ Technology Stack</h3>
      <div className="space-y-4">
        {Object.entries(groupedTech).map(([category, techs]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20 hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArchitectureOverview({ architecture }: { architecture: ArchitectureData }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">🏗️ Architecture Overview</h3>
      
      {/* Overview text */}
      <div className="mb-6">
        <p className="text-gray-300 leading-relaxed">{architecture.overview}</p>
      </div>

      {/* System Components */}
      {architecture.components && architecture.components.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">System Components</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {architecture.components.map((component, index) => (
              <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`rounded-full p-1 text-xs ${
                    component.type === 'service' ? 'bg-blue-500/20 text-blue-300' :
                    component.type === 'database' ? 'bg-green-500/20 text-green-300' :
                    component.type === 'api' ? 'bg-purple-500/20 text-purple-300' :
                    component.type === 'frontend' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {component.type === 'service' ? '⚙️' :
                     component.type === 'database' ? '🗄️' :
                     component.type === 'api' ? '🔌' :
                     component.type === 'frontend' ? '🖥️' :
                     '🔧'}
                  </div>
                  <h5 className="font-medium text-white">{component.name}</h5>
                </div>
                <p className="text-sm text-gray-300 mb-3">{component.description}</p>
                <div className="flex flex-wrap gap-1">
                  {component.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Flow */}
      {architecture.dataFlow && architecture.dataFlow.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Data Flow</h4>
          <div className="space-y-3">
            {architecture.dataFlow.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="text-gray-300">{step.description}</p>
                  <p className="text-sm text-cyan-400 mt-1">{step.component}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TimelineDisplay({ timeline }: { timeline: ProjectTimeline[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">📅 Project Timeline</h3>
      <div className="space-y-6">
        {timeline.map((phase, index) => (
          <div key={index} className="relative">
            {/* Timeline line */}
            {index < timeline.length - 1 && (
              <div className="absolute left-4 top-10 w-0.5 h-16 bg-gradient-to-b from-cyan-500 to-purple-500" />
            )}
            
            <div className="flex items-start gap-4">
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              
              {/* Phase content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-white">{phase.phase}</h4>
                  <span className="text-sm text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded">
                    {phase.duration}
                  </span>
                </div>
                
                {/* Milestones */}
                {phase.milestones && phase.milestones.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Key Milestones:</h5>
                    <ul className="space-y-1">
                      {phase.milestones.map((milestone, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-cyan-400 mt-1">▸</span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Deliverables */}
                {phase.deliverables && phase.deliverables.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Deliverables:</h5>
                    <div className="flex flex-wrap gap-2">
                      {phase.deliverables.map((deliverable, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechnicalSpecs({ 
  architecture, 
  metrics, 
  timeline, 
  technologies 
}: TechnicalSpecsProps) {
  return (
    <div className="space-y-8">
      {/* Metrics */}
      {metrics && <MetricsDisplay metrics={metrics} />}
      
      {/* Technologies */}
      <TechnologiesDisplay technologies={technologies} />
      
      {/* Architecture */}
      {architecture && <ArchitectureOverview architecture={architecture} />}
      
      {/* Timeline */}
      {timeline && timeline.length > 0 && <TimelineDisplay timeline={timeline} />}
    </div>
  )
}
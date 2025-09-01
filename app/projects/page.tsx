'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { getAllProjects, ProjectCategory } from '@/lib/projectData'

interface ProjectFilter {
  category: ProjectCategory[]
  technology: string[]
  company: string[]
}

export default function ProjectsPage() {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>({
    category: [],
    technology: [],
    company: []
  })

  const allProjects = getAllProjects()

  const toggleFilter = (type: keyof ProjectFilter, value: string) => {
    setProjectFilter(prev => {
      const currentValues = prev[type]
      const newValues = currentValues.includes(value as any)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value as any]
      return { ...prev, [type]: newValues }
    })
  }

  const clearAllFilters = () => {
    setProjectFilter({ category: [], technology: [], company: [] })
  }

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = projectFilter.category.length === 0 || projectFilter.category.includes(project.category)
    const technologyMatch = projectFilter.technology.length === 0 || project.technologies.some(tech => projectFilter.technology.includes(tech))
    const companyMatch = projectFilter.company.length === 0 || (project.company && projectFilter.company.includes(project.company))
    return categoryMatch && technologyMatch && companyMatch
  })

  const filterOptions = {
    categories: Array.from(new Set(allProjects.map(p => p.category))),
    technologies: Array.from(new Set(allProjects.flatMap(p => p.technologies))).slice(0, 12),
    companies: Array.from(new Set(allProjects.map(p => p.company).filter(Boolean)))
  }

  const getCategoryInfo = (category: ProjectCategory) => {
    const categoryMap = {
      'enterprise': { label: 'Enterprise', icon: '🏢', color: 'from-blue-500 to-cyan-500' },
      'cloud-infrastructure': { label: 'Cloud Infrastructure', icon: '☁️', color: 'from-purple-500 to-pink-500' },
      'api-development': { label: 'API Development', icon: '🔌', color: 'from-green-500 to-emerald-500' },
      'full-stack': { label: 'Full Stack', icon: '💻', color: 'from-orange-500 to-red-500' },
      'devops': { label: 'DevOps', icon: '🔧', color: 'from-yellow-500 to-orange-500' },
      'open-source': { label: 'Open Source', icon: '🚀', color: 'from-indigo-500 to-purple-500' }
    }
    return categoryMap[category] || categoryMap['enterprise']
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>←</span>
            <span>Back to Portfolio</span>
          </Link>
          <h1 className="mb-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            All Projects
          </h1>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
          <p className="mt-6 text-lg text-gray-300">
            Explore my complete portfolio of professional and open-source projects
          </p>
        </div>

        {/* Filter System */}
        <div className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <h2 className="text-xl font-semibold text-white">Filter Projects:</h2>
            <button
              onClick={clearAllFilters}
              className="rounded-lg border border-gray-500/30 bg-gray-500/10 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-gray-500/20"
            >
              Clear All
            </button>
          </div>
          
          {/* Category Filters */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-300">Category</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.categories.map(category => {
                const isActive = projectFilter.category.includes(category)
                const categoryInfo = getCategoryInfo(category)
                return (
                  <button
                    key={category}
                    onClick={() => toggleFilter('category', category)}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${categoryInfo.color} text-white scale-105 shadow-lg`
                        : 'border border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    <span>{categoryInfo.icon}</span>
                    <span>{categoryInfo.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Technology Filters */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-300">Technology</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.technologies.map(tech => {
                const isActive = projectFilter.technology.includes(tech)
                return (
                  <button
                    key={tech}
                    onClick={() => toggleFilter('technology', tech)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white scale-105 shadow-lg'
                        : 'border border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    {tech}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              const categoryInfo = getCategoryInfo(project.category)
              return (
                <Link 
                  key={project.id} 
                  href={`/projects/${project.slug}`}
                  className="group block"
                >
                  <article className="group/card relative h-full">
                    {/* Gradient border effect */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 blur transition duration-700 group-hover:opacity-100" />
                    
                    {/* Card content */}
                    <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:scale-105">
                      {/* Header */}
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r ${categoryInfo.color} text-white mb-3`}>
                            <span>{categoryInfo.icon}</span>
                            <span>{categoryInfo.label}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                            {project.title}
                          </h3>
                          {project.company && (
                            <p className="mt-1 text-sm text-gray-400">
                              {project.company} • {project.timeframe}
                            </p>
                          )}
                        </div>
                        {project.featured && (
                          <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 text-xs font-bold text-black">
                            ⭐ Featured
                          </div>
                        )}
                      </div>
                      
                      {/* Description */}
                      <p className="mb-4 text-gray-300 line-clamp-3">{project.description}</p>
                      
                      {/* Technology tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="rounded-md border border-gray-500/30 bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-400">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* View Details button */}
                      <div className="mt-auto">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                          <span>View Details</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl opacity-50 mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No projects found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters to see more projects.</p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105"
              >
                <span>🔄</span>
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
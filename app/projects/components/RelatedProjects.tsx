'use client'

import React from 'react'
import Link from 'next/link'
import { ProjectDetail, getCategoryInfo } from '@/lib/projectData'

interface RelatedProjectsProps {
  projects: ProjectDetail[]
  currentProjectSlug: string
}

export default function RelatedProjects({ projects, currentProjectSlug }: RelatedProjectsProps) {
  // Filter out the current project
  const relatedProjects = projects.filter(project => project.slug !== currentProjectSlug)

  if (relatedProjects.length === 0) {
    return null
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">🔗 Related Projects</h3>
        <p className="text-gray-400 text-sm">
          Explore other projects that share similar technologies or domain expertise
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProjects.map((project) => {
          const categoryInfo = getCategoryInfo(project.category)
          
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <article className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:scale-105">
                {/* Header */}
                <div className="mb-3">
                  <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-gradient-to-r ${categoryInfo.color} text-white mb-2`}>
                    <span className="text-xs">{categoryInfo.icon}</span>
                    <span>{categoryInfo.label}</span>
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {project.title}
                  </h4>
                  {project.company && (
                    <p className="text-xs text-gray-400 mt-1">
                      {project.company}
                    </p>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Technologies (showing only first 3) */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded bg-gray-500/20 px-2 py-0.5 text-xs text-gray-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Status and CTA */}
                <div className="flex items-center justify-between">
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'ongoing' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'maintained' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {project.status === 'ongoing' ? '🔄 Ongoing' :
                     project.status === 'maintained' ? '🔧 Maintained' :
                     '✅ Completed'}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <span>View Details</span>
                    <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 text-xs font-bold text-black">
                      ⭐
                    </div>
                  </div>
                )}
              </article>
            </Link>
          )
        })}
      </div>
      
      {/* View all projects link */}
      <div className="mt-6 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>View All Projects</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
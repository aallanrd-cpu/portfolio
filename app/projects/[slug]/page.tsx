import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProjectLayout from '@/components/layout/ProjectLayout'
import MediaGallery from '@/app/projects/components/MediaGallery'
import TechnicalSpecs from '@/app/projects/components/TechnicalSpecs'
import RelatedProjects from '@/app/projects/components/RelatedProjects'
import { 
  getProjectBySlug, 
  getProjectNavigation, 
  getRelatedProjects,
  getCategoryInfo,
  generateStaticParams as getStaticParams
} from '@/lib/projectData'

interface ProjectPageProps {
  params: { slug: string }
}

// Metadata generation for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found - Allan Rojas Portfolio',
      description: 'The requested project could not be found.'
    }
  }

  const categoryInfo = getCategoryInfo(project.category)
  const heroImage = project.gallery?.hero?.src || project.gallery?.screenshots[0]?.src
  
  return {
    title: `${project.title} - Allan Rojas Portfolio`,
    description: project.description,
    keywords: [
      ...project.technologies,
      project.category,
      categoryInfo.label,
      'Allan Rojas',
      'Software Engineer',
      'Portfolio'
    ],
    authors: [{ name: 'Allan Rojas D.' }],
    creator: 'Allan Rojas D.',
    openGraph: {
      title: `${project.title} - Allan Rojas Portfolio`,
      description: project.description,
      type: 'article',
      url: `/projects/${project.slug}`,
      images: heroImage ? [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: project.title
        }
      ] : [],
      siteName: 'Allan Rojas Portfolio'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Allan Rojas Portfolio`,
      description: project.description,
      images: heroImage ? [heroImage] : [],
      creator: '@allanrojasd'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `/projects/${project.slug}`
    }
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  return getStaticParams()
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    notFound()
  }

  const navigation = getProjectNavigation(slug)
  const relatedProjects = getRelatedProjects(slug, 6)
  const categoryInfo = getCategoryInfo(project.category)

  const breadcrumbs = [
    { label: 'Portfolio', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title }
  ]

  return (
    <ProjectLayout breadcrumbs={breadcrumbs} navigation={navigation}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            {/* Category Badge */}
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r ${categoryInfo.color} text-white mb-4`}>
              <span>{categoryInfo.icon}</span>
              <span>{categoryInfo.label}</span>
            </div>
            
            {/* Project Title */}
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {project.title}
            </h1>
            
            {/* Company and Timeframe */}
            {project.company && (
              <p className="text-xl text-gray-300 mb-4">
                {project.company} • {project.timeframe}
              </p>
            )}
            
            {/* Status and Featured Badges */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'ongoing' ? 'bg-green-500/20 text-green-300' :
                project.status === 'maintained' ? 'bg-blue-500/20 text-blue-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {project.status === 'ongoing' ? '🔄 Ongoing' :
                 project.status === 'maintained' ? '🔧 Maintained' :
                 '✅ Completed'}
              </div>
              
              {project.featured && (
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-sm font-bold text-black">
                  ⭐ Featured Project
                </div>
              )}
            </div>
            
            {/* Short Description */}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          {project.links && Object.keys(project.links).length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {project.links.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  <span>🔗</span>
                  <span>Live Demo</span>
                </Link>
              )}
              {project.links.demo && (
                <Link
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-6 py-3 font-medium text-purple-300 transition-all duration-300 hover:bg-purple-500/20 hover:scale-105"
                >
                  <span>🎯</span>
                  <span>View Demo</span>
                </Link>
              )}
              {project.links.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-500/30 bg-gray-500/10 px-6 py-3 font-medium text-gray-300 transition-all duration-300 hover:bg-gray-500/20 hover:scale-105"
                >
                  <span>📁</span>
                  <span>View Code</span>
                </Link>
              )}
              {project.links.documentation && (
                <Link
                  href={project.links.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-white/20 hover:scale-105"
                >
                  <span>📚</span>
                  <span>Documentation</span>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <section>
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <span>Project Overview</span>
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.longDescription}
                  </p>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section>
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Key Achievements</span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-cyan-400 mt-1 flex-shrink-0">▸</span>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Media Gallery */}
            {project.gallery && (
              <section>
                <MediaGallery gallery={project.gallery} projectTitle={project.title} />
              </section>
            )}

            {/* Technical Specifications */}
            <section>
              <TechnicalSpecs
                architecture={project.architecture}
                metrics={project.metrics}
                timeline={project.timeline}
                technologies={project.technologies}
              />
            </section>

            {/* Testimonial */}
            {project.testimonial && (
              <section>
                <div className="rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8 backdrop-blur-sm">
                  <div className="text-center">
                    <blockquote className="text-xl text-white font-medium mb-6 italic">
                      "{project.testimonial.text}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold text-cyan-300">{project.testimonial.author}</div>
                        <div className="text-sm text-gray-400">
                          {project.testimonial.role} at {project.testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4">📊 Quick Facts</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Category</div>
                  <div className="text-white font-medium">{categoryInfo.label}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Timeframe</div>
                  <div className="text-white font-medium">{project.timeframe}</div>
                </div>
                {project.company && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Company</div>
                    <div className="text-white font-medium">{project.company}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-400 mb-1">Status</div>
                  <div className={`inline-flex px-2 py-1 rounded text-sm font-medium ${
                    project.status === 'ongoing' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'maintained' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {project.status === 'ongoing' ? '🔄 Ongoing' :
                     project.status === 'maintained' ? '🔧 Maintained' :
                     '✅ Completed'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Technology Overview */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4">🛠️ Core Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 8).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 8 && (
                  <span className="rounded-lg border border-gray-500/30 bg-gray-500/10 px-3 py-1 text-sm font-medium text-gray-400">
                    +{project.technologies.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* GitHub Info for Open Source Projects */}
            {'language' in project && 'stars' in project && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-4">🚀 Open Source</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Language</span>
                    <span className="text-white font-medium">{project.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Stars</span>
                    <span className="text-cyan-300 font-medium">⭐ {project.stars}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm mb-2 block">Topics</span>
                    <div className="flex flex-wrap gap-1">
                      {project.topics?.map((topic) => (
                        <span
                          key={topic}
                          className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16">
            <RelatedProjects projects={relatedProjects} currentProjectSlug={project.slug} />
          </section>
        )}
      </div>
    </ProjectLayout>
  )
}
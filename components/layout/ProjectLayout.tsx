'use client'

import React from 'react'
import Link from 'next/link'
import { ProjectNavigation } from '@/lib/types/project'

interface Breadcrumb {
  label: string
  href?: string
}

interface ProjectLayoutProps {
  children: React.ReactNode
  breadcrumbs: Breadcrumb[]
  navigation?: ProjectNavigation
  showBackToGallery?: boolean
}

export default function ProjectLayout({ 
  children, 
  breadcrumbs, 
  navigation,
  showBackToGallery = true 
}: ProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Header with Navigation */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 transition-transform group-hover:scale-105">
                <span className="text-black text-sm font-bold">AR</span>
              </div>
              <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Allan Rojas
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Portfolio
              </Link>
              {showBackToGallery && (
                <Link
                  href="/projects"
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  All Projects
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-white/5 bg-slate-900/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="py-3">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-gray-500">/</span>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-300" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Project Navigation */}
      {navigation && (
        <div className="border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Previous Project */}
              <div className="flex items-center justify-start">
                {navigation.previous ? (
                  <Link
                    href={`/projects/${navigation.previous.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50"
                  >
                    <div className="rounded-full bg-cyan-500/20 p-2 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Previous Project</p>
                      <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors truncate">
                        {navigation.previous.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="opacity-50">
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <div className="rounded-full bg-gray-500/20 p-2 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">No Previous Project</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Project */}
              <div className="flex items-center justify-end">
                {navigation.next ? (
                  <Link
                    href={`/projects/${navigation.next.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50"
                  >
                    <div className="min-w-0 flex-1 text-right">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Next Project</p>
                      <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors truncate">
                        {navigation.next.title}
                      </p>
                    </div>
                    <div className="rounded-full bg-cyan-500/20 p-2 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div className="opacity-50">
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">No Next Project</p>
                      </div>
                      <div className="rounded-full bg-gray-500/20 p-2 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Projects */}
            {navigation.related && navigation.related.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-white">Related Projects</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {navigation.related.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:scale-105"
                    >
                      <h4 className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-400 capitalize">
                        {project.category.replace('-', ' ')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Gallery Button */}
            {showBackToGallery && (
              <div className="mt-8 text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span>View All Projects</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Allan Rojas D. — Crafted with passion for innovation
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <Link
                href="mailto:aallanrd@gmail.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                📧 Email
              </Link>
              <Link
                href="tel:+50672252296"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Phone"
              >
                📱 Phone
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                🏠 Portfolio
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
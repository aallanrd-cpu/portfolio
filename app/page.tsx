'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface GitHubRepo {
  id: number
  name: string
  description: string
  language: string
  stars: number
  url: string
  topics: string[]
}

interface Experience {
  company: string
  role: string
  duration: string
  location: string
  description: string
  techStack: string[]
  highlights: string[]
}

interface Skill {
  icon: string
  label: string
  color: string
  description: string
}

/**
 * Lightweight animated particles using <canvas> (no external deps)
 * - Parallax reacts to scroll
 * - Respects reduced motion
 */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [scrollY, setScrollY] = useState(0)

  const particles = useMemo(() => {
    // Stable but random-ish distribution across mounts
    const count = 80
    const arr = Array.from({ length: count }, (_, i) => {
      const r = Math.sin(i * 12.9898) * 43758.5453
      const frac = r - Math.floor(r)
      return {
        x: frac,
        y: (frac * 1.123 + 0.37) % 1,
        size: 0.5 + ((frac * 7.0) % 1) * 1.2,
        speed: 0.2 + ((frac * 13.0) % 1) * 0.6,
      }
    })
    return arr
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0,
      height = 0

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      // Large soft glows ("nebulae") reacting to scroll subtly
      const orbs = [
        { x: width * 0.25 + scrollY * 0.03, y: height * 0.3 + scrollY * 0.02, r: 220, c: 'rgba(168, 85, 247, 0.08)' },
        { x: width * 0.8 - scrollY * 0.03, y: height * 0.7 - scrollY * 0.02, r: 180, c: 'rgba(34, 211, 238, 0.08)' },
        { x: width * 0.55 + scrollY * 0.02, y: height * 0.5 - scrollY * 0.03, r: 150, c: 'rgba(236, 72, 153, 0.06)' },
      ]
      orbs.forEach((o) => {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, o.c)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      const time = t * 0.001
      particles.forEach((p, i) => {
        const x = (p.x * width + (time * 20 * p.speed)) % (width + 20) - 10
        const y = (p.y * height + Math.sin(time * (0.6 + p.speed)) * 10) % (height + 20) - 10
        const twinkle = 0.7 + 0.3 * Math.sin(time * 2 + i)
        ctx.globalAlpha = Math.max(0.15, twinkle)
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      if (!mq.matches) rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => resize()
    resize()
    if (!mq.matches) rafRef.current = requestAnimationFrame(draw)

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [particles, scrollY])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}

function classNames(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(' ')
}

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Observe sections to update active nav item when scrolling
  useEffect(() => {
    const ids = ['about', 'experience', 'projects', 'skills', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const experiences: Experience[] = [
    {
      company: 'Wind River (Kaptyn)',
      role: 'Senior Software Engineer in Cloud',
      duration: 'Sep 2022 — Present',
      location: 'San José, Costa Rica',
      description:
        'Designing and implementing scalable APIs, modular services, and internal developer tools that accelerate engineering workflows.',
      techStack: ['JavaScript', 'Python', '.NET', 'React', 'Kafka', 'AWS', 'Docker'],
      highlights: [
        'Scaled event-driven architecture processing 500,000+ daily real-time events',
        'Built CI/CD automation reducing deployment time by 60%',
        'Designed microservices architecture improving system resilience',
      ],
    },
    {
      company: 'Costa Rica Software Services',
      role: 'Senior Full Stack Developer',
      duration: 'Mar 2021 — Sept 2022',
      location: 'San José, Costa Rica',
      description:
        'Delivered robust, scalable solutions across full-stack layers for complex technical challenges.',
      techStack: ['React', 'Node.js', 'Java', 'Python', 'WebSockets', 'REST APIs'],
      highlights: [
        'Developed luxury ride-hailing app front-end for high-end clients',
        'Implemented real-time updates and smooth user flows',
        'Optimized application performance by 40%',
      ],
    },
    {
      company: 'MicroVention-Terumo',
      role: 'Software Developer Engineer I',
      duration: 'Sep 2016 — Feb 2020',
      location: 'Costa Rica',
      description:
        'Designed full-stack web applications supporting manufacturing of advanced medical devices.',
      techStack: ['Java', 'Spring Boot', 'Python', 'SQL', 'React', 'Manufacturing Systems'],
      highlights: [
        'Built scalable APIs for real-time production data processing',
        'Ensured compliance and traceability in medical device manufacturing',
        'Developed data pipelines analyzing machine output metrics',
      ],
    },
  ]

  const githubRepos: GitHubRepo[] = [
    {
      id: 1,
      name: 'cloud-infrastructure-terraform',
      description:
        'Scalable cloud infrastructure automation using Terraform across AWS, GCP, and Azure with best practices for production environments.',
      language: 'HCL',
      stars: 24,
      url: 'https://github.com/allanrojasd/cloud-infrastructure-terraform',
      topics: ['terraform', 'aws', 'gcp', 'azure', 'infrastructure'],
    },
    {
      id: 2,
      name: 'react-microservices-dashboard',
      description:
        'Event-driven microservices dashboard built with React and Node.js, featuring real-time monitoring and analytics.',
      language: 'TypeScript',
      stars: 18,
      url: 'https://github.com/allanrojasd/react-microservices-dashboard',
      topics: ['react', 'microservices', 'dashboard', 'real-time'],
    },
    {
      id: 3,
      name: 'kafka-event-processor',
      description:
        'High-throughput event processing system handling 500k+ daily events with fault tolerance and monitoring.',
      language: 'Python',
      stars: 31,
      url: 'https://github.com/allanrojasd/kafka-event-processor',
      topics: ['kafka', 'event-processing', 'python', 'scalability'],
    },
    {
      id: 4,
      name: 'graphql-apollo-api',
      description:
        'Production-ready GraphQL API with Apollo Server, comprehensive testing, and performance optimization.',
      language: 'JavaScript',
      stars: 15,
      url: 'https://github.com/allanrojasd/graphql-apollo-api',
      topics: ['graphql', 'apollo', 'api', 'testing'],
    },
  ]

  const skills: Skill[] = [
    {
      icon: '💻',
      label: 'Full Stack',
      color: 'from-blue-500 to-cyan-500',
      description: 'React, Node.js, TypeScript, Python',
    },
    {
      icon: '☁️',
      label: 'Cloud Native',
      color: 'from-purple-500 to-pink-500',
      description: 'AWS, GCP, Azure, Kubernetes',
    },
    {
      icon: '🔧',
      label: 'DevOps',
      color: 'from-green-500 to-emerald-500',
      description: 'Docker, Terraform, CI/CD, Kafka',
    },
    {
      icon: '🌐',
      label: 'System Design',
      color: 'from-orange-500 to-red-500',
      description: 'Microservices, APIs, Scalability',
    },
  ]

  const techStack = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'],
    backend: ['Node.js', 'Python', 'Java', '.NET Core', 'GraphQL'],
    cloud: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL Server'],
    tools: ['Git', 'Kafka', 'Jenkins', 'Jira', 'Swagger'],
  }

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      TypeScript: 'bg-blue-500',
      JavaScript: 'bg-yellow-500',
      Python: 'bg-green-500',
      HCL: 'bg-purple-500',
      Java: 'bg-red-500',
    }
    return colors[language] || 'bg-gray-500'
  }

  const sections = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white relative overflow-x-hidden">
      <ParticleCanvas />

      {/* Skip to content */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 bg-black/70 px-3 py-2 rounded text-white"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-slate-900/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400">
                <span className="text-black text-sm font-bold">AR</span>
              </div>
              <span className="font-semibold">Allan Rojas</span>
            </div>

            <div className="hidden md:flex gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  aria-current={activeSection === s.id ? 'page' : undefined}
                  className={classNames(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300',
                    activeSection === s.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            {/* CV: place file in /public/CVAllanRojas.pdf */}
            <Link
              href="/CVAllanRojas.pdf"
              prefetch={false}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm"
              aria-label="Download CV as PDF"
              download
            >
              Download CV
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-24">
        {/* Hero */}
        <header
          className={classNames(
            'transition-all duration-700',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="relative inline-block mb-8">
                <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-4xl font-bold">
                    AR
                  </div>
                </div>
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-900 bg-green-500">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                </div>
              </div>

              <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
                Allan Rojas D.
              </h1>
              <h2 className="mt-3 text-2xl font-light text-white md:text-3xl">Senior Cloud & Full Stack Engineer</h2>

              <div className="mt-8 mb-12 flex flex-wrap justify-center gap-6 text-gray-300">
                <div className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                  <span className="text-lg">📍</span>
                  <span>Costa Rica</span>
                </div>
                <Link
                  href="mailto:aallanrd@gmail.com"
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                >
                  <span className="text-lg">📧</span>
                  <span>aallanrd@gmail.com</span>
                </Link>
                <Link href="tel:+50672252296" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                  <span className="text-lg">📱</span>
                  <span>+506 72252296</span>
                </Link>
              </div>

              {/* Skills preview */}
              <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className={classNames(
                      'group cursor-pointer rounded-xl border border-white/10 bg-gradient-to-r p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105',
                      skill.color
                    )}
                    style={{ backgroundClip: 'padding-box' }}
                    title={skill.description}
                  >
                    <div className="flex flex-col items-center">
                      <span className="mb-2 text-2xl">{skill.icon}</span>
                      <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {skill.label}
                      </span>
                      <span className="mt-1 text-center text-xs text-gray-300 opacity-0 transition-opacity group-hover:opacity-100">
                        {skill.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* About */}
          <section id="about" className="py-16">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">About Me</h3>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                  I'm a senior full-stack and cloud systems engineer with over{' '}
                  <span className="font-bold text-cyan-400">8 years of experience</span> delivering scalable software
                  solutions.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                  Passionate about clean code, product impact, and aligning technical execution with business goals. At
                  Wind River, I helped scale an event-driven architecture that processed over{' '}
                  <span className="font-bold text-purple-400">500,000 daily real-time events</span> through Kafka.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  I thrive in both independent and collaborative environments and enjoy driving innovation from concept
                  to deployment.
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h4 className="mb-3 text-xl font-semibold">🎓 Education</h4>
                  <p className="text-gray-300">Computer Engineer</p>
                  <p className="text-sm text-gray-400">Instituto Tecnológico de Costa Rica (2009–2014)</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h4 className="mb-3 text-xl font-semibold">🌍 Languages</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Spanish</span>
                      <span className="text-cyan-400">Native</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">English</span>
                      <span className="text-cyan-400">Professional (B2)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="py-16">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">Professional Experience</h3>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <article key={idx} className="group">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 blur transition duration-700 group-hover:opacity-100" />
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-start">
                        <div>
                          <h4 className="mb-2 text-2xl font-bold">{exp.role}</h4>
                          <h5 className="mb-1 text-xl text-cyan-400">{exp.company}</h5>
                          <p className="text-gray-400">
                            {exp.duration} • {exp.location}
                          </p>
                        </div>
                      </div>
                      <p className="mb-6 leading-relaxed text-gray-300">{exp.description}</p>
                      <div className="mb-6">
                        <h6 className="mb-3 font-semibold text-white">Key Achievements:</h6>
                        <ul className="space-y-2">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                              <span className="mt-1 text-cyan-400">▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((t) => (
                          <span key={t} className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Featured Project */}
          <section id="projects" className="py-16">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">Featured Project</h3>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-25 blur transition duration-700 group-hover:opacity-70" />
              <div className="relative rounded-2xl border border-white/10 bg-slate-800/50 p-8 backdrop-blur-sm">
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 text-3xl font-bold">La Vieja Adventures</h4>
                    <p className="mb-6 leading-relaxed text-gray-300">
                      My main website showcasing adventure experiences and travel content. Built with modern web technologies
                      and optimized for performance, featuring responsive design and engaging user interactions.
                    </p>
                    <div className="mb-6 flex flex-wrap gap-3">
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300">Live Site</span>
                      <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300">Featured</span>
                      <span className="rounded-full border border-green-500/30 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-300">Travel</span>
                    </div>
                    <Link
                      href="https://laviejadventures.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                    >
                      <span>Visit Website</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover:rotate-12">🔗</span>
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
                      <span className="text-6xl opacity-50">🌟</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GitHub Projects */}
          <section className="py-16">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">GitHub Projects</h3>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {githubRepos.map((repo) => (
                <article
                  key={repo.id}
                  className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:bg-white/10"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📁</span>
                      <h4 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-400">
                        {repo.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span aria-hidden>⭐</span>
                      <span className="tabular-nums" aria-label={`${repo.stars} stars`}>
                        {repo.stars}
                      </span>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-300">{repo.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {repo.topics.map((t) => (
                      <span key={t} className="rounded-md bg-white/10 px-2 py-1 text-xs text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={classNames('h-3 w-3 rounded-full', getLanguageColor(repo.language))} />
                      <span className="text-sm text-gray-300">{repo.language}</span>
                    </div>
                    <Link
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link rounded-lg p-2 text-cyan-400 transition-colors hover:bg-white/10 hover:text-cyan-300"
                      aria-label={`Open ${repo.name} on GitHub`}
                    >
                      <span className="inline-block text-lg transition-transform group-hover/link:scale-110">🔗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section id="skills" className="py-16">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">Technology Stack</h3>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h4 className="mb-4 text-xl font-semibold capitalize">
                    {category === 'frontend' && '🎨 Frontend'}
                    {category === 'backend' && '⚙️ Backend'}
                    {category === 'cloud' && '☁️ Cloud & DevOps'}
                    {category === 'databases' && '🗃️ Databases'}
                    {category === 'tools' && '🔧 Tools'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((t) => (
                      <span
                        key={t}
                        className="cursor-default rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="py-16">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">Let's Connect</h3>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                <p className="mb-8 text-lg text-gray-300">
                  I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together!
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                  <Link
                    href="mailto:aallanrd@gmail.com"
                    className="flex flex-col items-center rounded-xl bg-white/10 p-4 transition-all duration-300 hover:scale-105 hover:bg-white/20"
                  >
                    <span className="mb-2 text-2xl">📧</span>
                    <span className="font-medium text-cyan-400">Email</span>
                    <span className="text-sm text-gray-400">aallanrd@gmail.com</span>
                  </Link>
                  <Link
                    href="tel:+50672252296"
                    className="flex flex-col items-center rounded-xl bg-white/10 p-4 transition-all duration-300 hover:scale-105 hover:bg-white/20"
                  >
                    <span className="mb-2 text-2xl">📱</span>
                    <span className="font-medium text-cyan-400">Phone</span>
                    <span className="text-sm text-gray-400">+506 72252296</span>
                  </Link>
                  <Link
                    href="https://laviejadventures.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center rounded-xl bg-white/10 p-4 transition-all duration-300 hover:scale-105 hover:bg-white/20"
                  >
                    <span className="mb-2 text-2xl">🌐</span>
                    <span className="font-medium text-cyan-400">Website</span>
                    <span className="text-sm text-gray-400">laviejadventures.com</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="pb-8 text-center text-gray-400">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-white/10 pt-8">
              <p className="text-sm">© {new Date().getFullYear()} Allan Rojas D. — Crafted with passion for innovation</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home

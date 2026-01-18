import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { ProjectCard } from '@/components/ProjectCard'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { submitContact } from './actions'
import { Navbar } from '@/components/Navbar'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all data
  const about = await payload.findGlobal({ slug: 'about' })

  const projects = await payload.find({
    collection: 'projects',
    limit: 8,
    sort: '-featured', // Featured first
  })

  const skills = await payload.find({
    collection: 'skills',
    limit: 100,
  })

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills.docs> = {}
  skills.docs.forEach((skill) => {
    const cat = skill.category || 'Other'
    if (!skillsByCategory[cat]) skillsByCategory[cat] = []
    skillsByCategory[cat].push(skill)
  })

  return (
    <main className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl px-6 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-stone-200/50 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-stone-100 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '-3s' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 shadow-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>

          <h1
            className="text-6xl font-extrabold tracking-tight text-stone-900 sm:text-8xl lg:text-9xl animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {about.heroHeadline || 'Building digital products that matter.'}
          </h1>

          <p
            className="mx-auto max-w-2xl text-xl text-stone-500 sm:text-2xl leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {about.heroSubtext ||
              'I am a full-stack developer passionate about clean code and delightful user experiences.'}
          </p>

          <div
            className="flex flex-col items-center justify-center gap-6 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href="#projects"
              className="group relative flex items-center gap-2 rounded-full bg-stone-900 px-10 py-5 text-lg font-semibold text-white transition-all hover:bg-stone-800 hover:scale-105 active:scale-95 shadow-xl shadow-stone-200"
            >
              View My Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-stone-200 bg-white px-10 py-5 text-lg font-semibold text-stone-900 transition-all hover:bg-stone-50 hover:shadow-md active:scale-95"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-stone-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32 items-center">
          <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-stone-100 shadow-2xl shadow-stone-200 rotate-2 hover:rotate-0 transition-transform duration-700">
            {about.profileImage &&
              typeof about.profileImage !== 'number' &&
              about.profileImage.url && (
                <Image
                  src={about.profileImage.url}
                  alt={(about.profileImage as Media).alt || 'Profile'}
                  fill
                  className="object-cover"
                />
              )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="inline-block text-stone-400 font-bold tracking-widest uppercase text-sm mb-6">
              About Me
            </div>
            <h2 className="mb-10 text-5xl font-bold tracking-tight sm:text-7xl text-stone-900 leading-tight">
              Crafting experiences with precision.
            </h2>
            <div className="prose prose-xl prose-stone text-stone-600">
              {about.bio ? (
                <RichText data={about.bio} />
              ) : (
                <p className="leading-relaxed">
                  I am a passionate developer with a keen eye for design, specializing in building
                  modern web applications that solve real-world problems.
                </p>
              )}
            </div>

            <div className="mt-16 grid grid-cols-2 gap-12 border-t border-stone-100 pt-12">
              <div className="flex flex-col gap-3">
                <span className="text-5xl font-bold text-stone-900">
                  5<span className="text-stone-300">+</span>
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-stone-400">
                  Years Exp.
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-5xl font-bold text-stone-900">
                  20<span className="text-stone-300">+</span>
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-stone-400">
                  Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Skills Section */}
      <section className="bg-stone-50 py-32 sm:py-48 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-block text-stone-400 font-bold tracking-widest uppercase text-sm mb-6">
              Expertise
            </div>
            <h2 className="text-5xl font-bold tracking-tight sm:text-7xl text-stone-900">
              Technical Arsenal
            </h2>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div
                key={category}
                className="group rounded-[2.5rem] bg-white p-10 shadow-sm border border-stone-100 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="mb-8 text-2xl font-bold capitalize text-stone-900 flex items-center gap-3">
                  <span className="w-8 h-px bg-stone-200 group-hover:w-12 transition-all"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill.id}
                      className="inline-flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-700 border border-transparent hover:border-stone-200 transition-colors"
                    >
                      {/* If icon exists */}
                      {skill.icon && typeof skill.icon !== 'number' && skill.icon.url && (
                        <Image
                          src={skill.icon.url}
                          width={20}
                          height={20}
                          alt={skill.name || ''}
                          className="h-5 w-5 grayscale contrast-125"
                        />
                      )}
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Projects Section (Bento Grid) */}
      <section
        id="projects"
        className="bg-stone-900 py-32 sm:py-48 px-6 text-white rounded-[3rem] sm:rounded-[5rem] mx-4 sm:mx-6 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-block text-stone-500 font-bold tracking-widest uppercase text-sm mb-6">
              Selected Works
            </div>
            <h2 className="text-5xl font-bold tracking-tight sm:text-8xl">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[250px]">
            {projects.docs.map((project, i) => {
              // Bento Grid layout logic
              let layoutClass = 'lg:col-span-2 lg:row-span-2' // Default
              if (i === 0) layoutClass = 'lg:col-span-4 lg:row-span-2'
              if (i === 3) layoutClass = 'lg:col-span-3 lg:row-span-2'
              if (i === 4) layoutClass = 'lg:col-span-3 lg:row-span-2'

              return <ProjectCard key={project.id} project={project} className={layoutClass} />
            })}
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-32 sm:py-48 text-center">
        <div className="inline-block text-stone-400 font-bold tracking-widest uppercase text-sm mb-6">
          Get in Touch
        </div>
        <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-8xl">
          Let&apos;s Build Together.
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-xl text-stone-500 sm:text-2xl">
          Currently open to freelance opportunities and full-time positions.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start text-left">
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                Email
              </h3>
              {about.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="text-3xl font-medium hover:text-stone-500 transition-colors break-words"
                >
                  {about.email}
                </a>
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                Location
              </h3>
              <p className="text-3xl font-medium">{about.location || 'Dubai, UAE'}</p>
            </div>
          </div>

          <form action={submitContact} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full rounded-2xl border-0 bg-stone-100 px-6 py-5 placeholder:text-stone-400 focus:ring-2 focus:ring-stone-900 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-2xl border-0 bg-stone-100 px-6 py-5 placeholder:text-stone-400 focus:ring-2 focus:ring-stone-900 transition-all"
              />
            </div>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              required
              className="w-full rounded-2xl border-0 bg-stone-100 px-6 py-5 placeholder:text-stone-400 focus:ring-2 focus:ring-stone-900 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-stone-900 px-12 py-5 text-lg font-bold text-white transition-all hover:bg-stone-800 hover:scale-[1.02] active:scale-95 shadow-xl shadow-stone-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-100 bg-[#fafaf9] px-6 py-20 pb-32">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left">
            <a href="#" className="text-2xl font-bold tracking-tight text-stone-900 group">
              HT
              <span className="text-stone-400 group-hover:text-stone-900 transition-colors">.</span>
            </a>
            <p className="mt-4 text-stone-500 max-w-xs">
              Building digital excellence with modern web technologies.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Connect
              </span>
              <a href="#" className="font-medium hover:text-stone-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="font-medium hover:text-stone-400 transition-colors">
                GitHub
              </a>
              <a href="#" className="font-medium hover:text-stone-400 transition-colors">
                Twitter
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Pages
              </span>
              <a href="#" className="font-medium hover:text-stone-400 transition-colors">
                Home
              </a>
              <a href="#projects" className="font-medium hover:text-stone-400 transition-colors">
                Projects
              </a>
              <a
                href={payloadConfig.routes.admin}
                target="_blank"
                className="font-medium hover:text-stone-400 transition-colors"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center text-sm text-stone-400">
          <p>© {new Date().getFullYear()} Hasnain Tanoli. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

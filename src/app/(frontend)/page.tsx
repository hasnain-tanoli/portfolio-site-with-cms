import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { ProjectCard } from '@/components/ProjectCard'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Navbar } from '@/components/Navbar'
import { ContactForm } from '@/components/ContactForm'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all data
  const [about, header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'about' }),
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

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
    <main className="min-h-screen overflow-x-hidden bg-[#fafaf9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500 selection:bg-stone-900 dark:selection:bg-stone-100 selection:text-white dark:selection:text-stone-950">
      <Navbar data={header} />

      {/* 1. Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-200 h-200 bg-stone-100 dark:bg-stone-900/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-stone-100 dark:bg-stone-900 px-6 py-2 text-sm font-bold text-stone-900 dark:text-stone-100 mb-10 shadow-sm border border-stone-200 dark:border-stone-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {about.availabilityStatus || 'Available for new projects'}
          </div>

          <h1 className="text-6xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-9xl leading-[1.1]">
            {about.heroHeadline || 'Building digital excellence with modern code.'}
          </h1>

          <p className="mx-auto mt-12 max-w-2xl text-xl text-stone-500 dark:text-stone-400 leading-relaxed font-medium">
            {about.heroSubtext ||
              'I am a full-stack engineer specializing in Next.js, TypeScript, and high-performance web applications.'}
          </p>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-stone-900 dark:bg-white px-12 py-5 text-lg font-bold text-white dark:text-stone-900 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-stone-200 dark:shadow-none"
            >
              View Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href={`mailto:${about.email || 'hello@hasnain.me'}`}
              className="text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors py-5 px-8"
            >
              Get in Touch
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
            className="w-6 h-6 text-stone-900 dark:text-stone-100"
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
          <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-stone-100 dark:bg-stone-900 shadow-2xl shadow-stone-200 dark:shadow-stone-900/50 rotate-2 hover:rotate-0 transition-transform duration-700">
            {about.profileImage &&
              //@ts-expect-error - Payload 3.0 type mismatch
              about.profileImage.url && (
                <Image
                  //@ts-expect-error - Payload 3.0 type mismatch
                  src={about.profileImage.url}
                  alt={(about.profileImage as Media).alt || 'Profile'}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="inline-block text-stone-400 dark:text-stone-500 font-bold tracking-widest uppercase text-sm mb-6">
              {about.aboutSectionTitle || 'About Me'}
            </div>
            <h2 className="mb-10 text-5xl font-bold tracking-tight sm:text-7xl text-stone-900 dark:text-stone-100 leading-tight">
              {about.aboutHeadline || 'Crafting experiences with precision.'}
            </h2>
            <div className="prose prose-xl prose-stone dark:prose-invert text-stone-600 dark:text-stone-400">
              {about.bio ? (
                <RichText data={about.bio} />
              ) : (
                <p className="leading-relaxed">
                  I am a passionate developer with a keen eye for design, specializing in building
                  modern web applications that solve real-world problems.
                </p>
              )}
            </div>

            <div className="mt-16 grid grid-cols-2 gap-12 border-t border-stone-100 dark:border-stone-800 pt-12">
              {(about.stats || []).map((stat, i: number) => (
                <div key={i} className="flex flex-col gap-3">
                  <span className="text-5xl font-bold text-stone-900 dark:text-stone-100">
                    {stat.value}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                    {stat.label}
                  </span>
                </div>
              ))}
              {!about.stats?.length && (
                <>
                  <div className="flex flex-col gap-3">
                    <span className="text-5xl font-bold text-stone-900 dark:text-stone-100">
                      5<span className="text-stone-300 dark:text-stone-600">+</span>
                    </span>
                    <span className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Years Exp.
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-5xl font-bold text-stone-900 dark:text-stone-100">
                      20<span className="text-stone-300 dark:text-stone-600">+</span>
                    </span>
                    <span className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Projects
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Skills Section */}
      <section className="bg-stone-50 dark:bg-stone-950 py-32 sm:py-48 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-block text-stone-400 dark:text-stone-500 font-bold tracking-widest uppercase text-sm mb-6">
              {about.expertiseSectionTitle || 'Expertise'}
            </div>
            <h2 className="text-5xl font-bold tracking-tight sm:text-7xl text-stone-900 dark:text-stone-100">
              {about.expertiseHeadline || 'Technical Arsenal'}
            </h2>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div
                key={category}
                className="group rounded-[2.5rem] bg-white dark:bg-stone-950 p-10 shadow-sm border border-stone-100 dark:border-stone-800 transition-all hover:shadow-xl dark:hover:shadow-stone-900/50 hover:-translate-y-1"
              >
                <h3 className="mb-8 text-2xl font-bold capitalize text-stone-900 dark:text-stone-100 flex items-center gap-3">
                  <span className="w-8 h-px bg-stone-200 dark:bg-stone-700 group-hover:w-12 transition-all"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill.id}
                      className="inline-flex items-center gap-3 rounded-2xl bg-stone-50 dark:bg-stone-900 px-4 py-3 text-sm font-semibold text-stone-700 dark:text-stone-300 border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition-colors"
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
        className="bg-stone-200 dark:bg-stone-900 py-32 sm:py-48 px-6 text-stone-900 dark:text-white rounded-[3rem] sm:rounded-[5rem] mx-4 sm:mx-6 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-block text-stone-500 dark:text-stone-500 font-bold tracking-widest uppercase text-sm mb-6">
              {about.projectsSectionTitle || 'Selected Works'}
            </div>
            <h2 className="text-5xl font-bold tracking-tight sm:text-8xl text-stone-900 dark:text-white">
              {about.projectsHeadline || 'Featured Projects'}
            </h2>
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
        <div className="inline-block text-stone-400 dark:text-stone-500 font-bold tracking-widest uppercase text-sm mb-6">
          {about.contactSectionTitle || 'Get in Touch'}
        </div>
        <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-8xl text-stone-900 dark:text-stone-100">
          {about.contactHeadline || "Let's Build Together."}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-xl text-stone-500 dark:text-stone-400 sm:text-2xl">
          {about.contactSubtext ||
            'Currently open to freelance opportunities and full-time positions.'}
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start text-left">
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                Email
              </h3>
              {about.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="text-3xl font-medium text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors wrap-break-word"
                >
                  {about.email}
                </a>
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                Location
              </h3>
              <p className="text-3xl font-medium text-stone-900 dark:text-stone-100">
                {about.location || 'Dubai, UAE'}
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-100 dark:border-stone-800 bg-[#fafaf9] dark:bg-stone-950 px-6 py-20 pb-32">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left">
            <a
              href="#"
              className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group"
            >
              {footer.logoText || 'HT'}
              <span className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                .
              </span>
            </a>
            <p className="mt-4 text-stone-500 dark:text-stone-400 max-w-xs">
              {footer.description || 'Building digital excellence with modern web technologies.'}
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                Connect
              </span>
              {(footer.socialLinks || []).map((link, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
                >
                  {link.platform}
                </a>
              ))}
              {!footer.socialLinks?.length && (
                <>
                  <a
                    href="#"
                    className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
                  >
                    Twitter
                  </a>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                Pages
              </span>
              <a
                href="#"
                className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#projects"
                className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
              >
                Projects
              </a>
              <Link
                href="/blog"
                className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
              >
                Blog
              </Link>
              <a
                href={payloadConfig.routes.admin}
                target="_blank"
                className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center text-sm text-stone-400 dark:text-stone-500">
          <p>
            {footer.copyrightText
              ? footer.copyrightText.replace('{year}', new Date().getFullYear().toString())
              : `© ${new Date().getFullYear()} Hasnain Tanoli. All rights reserved.`}
          </p>
        </div>
      </footer>
    </main>
  )
}

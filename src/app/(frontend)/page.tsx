import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { ProjectCard } from '@/components/ProjectCard'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { submitContact } from './actions'

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

  const testimonials = await payload.find({
    collection: 'testimonials',
    limit: 6,
  })

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills.docs> = {}
  skills.docs.forEach((skill) => {
    const cat = skill.category || 'Other'
    if (!skillsByCategory[cat]) skillsByCategory[cat] = []
    skillsByCategory[cat].push(skill)
  })

  return (
    <main className="bg-white text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl animate-fade-in-up space-y-8">
          <div className="inline-block rounded-full bg-stone-100 px-4 py-1.5 text-sm font-medium text-stone-600">
            Available for new projects
          </div>
          <h1 className="text-6xl font-bold tracking-tight text-stone-900 sm:text-7xl lg:text-8xl">
            {about.heroHeadline || 'Building digital products that matter.'}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-stone-500 sm:text-2xl">
            {about.heroSubtext ||
              'I am a full-stack developer passionate about clean code and delightful user experiences.'}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="rounded-full bg-stone-900 px-8 py-4 text-lg font-medium text-white transition-transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-stone-200 bg-white px-8 py-4 text-lg font-medium text-stone-900 transition-colors hover:bg-stone-50"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-stone-100">
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
            <h2 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">About Me</h2>
            <div className="prose prose-lg prose-stone text-stone-600">
              {about.bio ? (
                <RichText data={about.bio} />
              ) : (
                <p className="text-lg leading-relaxed">
                  I am a passionate developer with a keen eye for design. (Please double check your
                  &apos;bio&apos; field is populated in the Admin panel).
                </p>
              )}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-stone-900">5+</span>
                <span className="text-stone-500">Years Exp.</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-stone-900">20+</span>
                <span className="text-stone-500">Projects</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-stone-900">100%</span>
                <span className="text-stone-500">Commitment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Skills Section */}
      <section className="bg-stone-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Technical Expertise
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div key={category} className="rounded-3xl bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-bold capitalize text-stone-900">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div
                      key={skill.id}
                      className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-2 text-sm font-medium text-stone-700"
                    >
                      {/* If icon exists */}
                      {skill.icon && typeof skill.icon !== 'number' && skill.icon.url && (
                        <Image
                          src={skill.icon.url}
                          width={16}
                          height={16}
                          alt={skill.name || ''}
                          className="h-4 w-4"
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
      <section id="projects" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <h2 className="mb-16 text-center text-4xl font-bold tracking-tight sm:text-6xl">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {projects.docs.map((project, i) => {
            // Logic for Bento Grid: First item spans 2 cols and 2 rows
            const isFeatured = project.featured || i === 0
            const className = isFeatured ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'

            return <ProjectCard key={project.id} project={project} className={className} />
          })}
        </div>
      </section>

      {/* 5. Testimonials Section */}
      {testimonials.docs.length > 0 && (
        <section className="bg-stone-900 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              What People Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.docs.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-3xl bg-stone-800 p-8"
                >
                  <blockquote className="mb-8 text-lg font-medium leading-relaxed text-stone-300">
                    &quot;{item.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    {item.photo && typeof item.photo !== 'number' && item.photo.url ? (
                      <Image
                        src={item.photo.url}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-full bg-stone-700 object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-stone-700" />
                    )}
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-sm text-stone-400">
                        {item.role}
                        {item.company ? `, ${item.company}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Contact Section */}
      <section id="contact" className="mx-auto mb-20 max-w-3xl px-6 py-24 text-center sm:py-32">
        <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s Work Together
        </h2>
        <p className="mb-10 text-xl text-stone-500">
          Have a project in mind? I&apos;d love to hear about it.
        </p>
        <form action={submitContact} className="mx-auto max-w-md space-y-4 text-left">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full rounded-xl border-0 bg-stone-100 px-4 py-3 placeholder:text-stone-400 focus:ring-2 focus:ring-stone-900"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="w-full rounded-xl border-0 bg-stone-100 px-4 py-3 placeholder:text-stone-400 focus:ring-2 focus:ring-stone-900"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-stone-900 px-4 py-4 font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-100 py-10 text-center text-sm text-stone-500">
        <p>© {new Date().getFullYear()} Hasnain Tanoli. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href={payloadConfig.routes.admin} target="_blank" className="hover:text-stone-900">
            Admin Login
          </a>
          <a href="#" className="hover:text-stone-900">
            GitHub
          </a>
          <a href="#" className="hover:text-stone-900">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  )
}

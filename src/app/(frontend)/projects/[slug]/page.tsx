import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import Link from 'next/link'

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [header, footer, projects] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
    }),
  ])

  const project = projects.docs[0]

  if (!project) {
    notFound()
  }

  const image = (typeof project.image === 'string' ? null : project.image) as Media | null

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans">
      <Navbar data={header} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 px-6 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-200 h-200 bg-stone-200/40 dark:bg-stone-800/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Case Studies
          </Link>

          <header className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-8xl text-stone-900 dark:text-white leading-tight mb-8">
                {project.title}
              </h1>
              <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-12 border-l border-stone-200 dark:border-stone-800 pl-12">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 dark:text-stone-500 mb-4">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.techStack?.map((item, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/50 text-sm font-medium text-stone-700 dark:text-stone-300"
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-stone-900 dark:text-white font-bold uppercase tracking-widest text-sm"
                >
                  Launch Project
                  <span className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center transition-all group-hover:bg-stone-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-1.5-1.5L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </span>
                </a>
              )}
            </div>
          </header>
        </div>
      </section>

      {/* Featured Image Showcase */}
      <section className="px-6 mb-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative aspect-21/9 overflow-hidden rounded-[3rem] bg-stone-200 dark:bg-stone-900 shadow-2xl shadow-stone-300/50 dark:shadow-black/50">
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alt || project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      {project.content && (
        <section className="px-6 pb-48">
          <div className="mx-auto max-w-3xl">
            <div
              className="prose dark:prose-invert prose-xl prose-stone max-w-none 
              prose-headings:text-stone-900 dark:prose-headings:text-white prose-headings:font-bold 
              prose-p:text-stone-600 dark:prose-p:text-stone-400 prose-p:leading-relaxed
              prose-a:text-stone-900 dark:prose-a:text-white prose-a:no-underline hover:prose-a:underline
              prose-strong:text-stone-900 dark:prose-strong:text-white
              prose-img:rounded-[2rem] prose-img:shadow-2xl"
            >
              <RichText data={project.content} />
            </div>
          </div>
        </section>
      )}

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
              <Link
                href="/"
                className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#projects"
                className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="font-medium text-stone-900 dark:text-stone-100 hover:text-stone-400 dark:hover:text-stone-400 transition-colors"
              >
                Blog
              </Link>
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

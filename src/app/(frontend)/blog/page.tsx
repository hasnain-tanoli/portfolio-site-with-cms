import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

export default async function BlogListingPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [header, footer, posts] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.find({
      collection: 'posts',
      sort: '-publishedDate',
    }),
  ])

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500 selection:bg-stone-900 dark:selection:bg-stone-100 selection:text-white dark:selection:text-stone-950">
      <Navbar data={header} />

      <section className="mx-auto max-w-7xl px-6 py-32 sm:py-48">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-block text-stone-400 dark:text-stone-500 font-bold tracking-widest uppercase text-sm mb-6">
            Journal
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl text-stone-900 dark:text-stone-100">
            Insights & Thoughts
          </h1>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.docs.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col gap-6">
              <div className="relative aspect-16/10 overflow-hidden rounded-4xl bg-stone-100 dark:bg-stone-900">
                {post.featuredImage &&
                  typeof post.featuredImage !== 'number' &&
                  post.featuredImage.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={(post.featuredImage as Media).alt || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
              </div>
              <div className="space-y-4">
                <div className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  {post.publishedDate &&
                    new Date(post.publishedDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                </div>
                <h2 className="text-2xl font-bold leading-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-stone-500 dark:text-stone-400 line-clamp-3">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
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

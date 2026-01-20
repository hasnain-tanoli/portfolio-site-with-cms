import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import Link from 'next/link'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [header, footer, posts] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
    }),
  ])

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500 selection:bg-stone-900 dark:selection:bg-stone-100 selection:text-white dark:selection:text-stone-950">
      <Navbar data={header} />

      <article className="pt-32 pb-32 sm:pt-48 sm:pb-48 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-16">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 text-stone-400 dark:text-stone-500 hover:text-stone-950 dark:hover:text-stone-100 transition-all duration-300 font-bold uppercase tracking-[0.2em] text-xs"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 dark:border-stone-800 group-hover:border-stone-400 dark:group-hover:border-stone-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3 h-3 -translate-x-px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </span>
              Back to Journal
            </Link>
          </div>

          <header className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-stone-200 dark:bg-stone-800" />
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500">
                {post.publishedDate &&
                  new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
              </div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl text-stone-900 dark:text-stone-100 leading-[1.1] mb-12">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-2xl text-stone-500 dark:text-stone-400 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="relative aspect-16/10 overflow-hidden rounded-[3rem] bg-stone-100 dark:bg-stone-900 mb-24 shadow-2xl shadow-stone-200 dark:shadow-stone-900/50">
            {post.featuredImage &&
              typeof post.featuredImage !== 'number' &&
              post.featuredImage.url && (
                <Image
                  src={post.featuredImage.url}
                  alt={(post.featuredImage as Media).alt || ''}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1000px"
                  className="object-cover"
                />
              )}
          </div>

          <div
            className="prose prose-stone dark:prose-invert prose-2xl max-w-none 
            prose-headings:text-stone-900 dark:prose-headings:text-stone-100 prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:text-stone-600 dark:prose-p:text-stone-400 prose-p:leading-[1.8]
            prose-a:text-stone-900 dark:prose-a:text-stone-100 prose-a:underline decoration-stone-200 dark:decoration-stone-700 underline-offset-8 hover:decoration-stone-900 dark:hover:decoration-stone-400 transition-all 
            prose-blockquote:border-l-[4px] prose-blockquote:border-stone-900 dark:prose-blockquote:border-stone-100 prose-blockquote:bg-stone-50 dark:prose-blockquote:bg-stone-900 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl
            prose-img:rounded-[2.5rem] prose-img:shadow-2xl dark:prose-img:shadow-stone-900/50
            prose-strong:text-stone-900 dark:prose-strong:text-stone-100
            prose-code:text-stone-900 dark:prose-code:text-stone-100 prose-code:bg-stone-100 dark:prose-code:bg-stone-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-stone-900 dark:prose-pre:bg-stone-950 prose-pre:border prose-pre:border-stone-200 dark:prose-pre:border-stone-800"
          >
            <RichText data={post.content} />
          </div>
        </div>
      </article>

      <footer className="border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-950 px-6 py-24 text-center">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group"
          >
            {footer.logoText || 'HT'}
            <span className="text-stone-300 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
              .
            </span>
          </Link>
          <p className="mt-8 text-stone-400 dark:text-stone-500 text-xs font-medium uppercase tracking-widest">
            {footer.copyrightText
              ? footer.copyrightText.replace('{year}', new Date().getFullYear().toString())
              : `© ${new Date().getFullYear()} ${footer.logoText || 'Hasnain Tanoli'}. Built with Passion.`}
          </p>
        </div>
      </footer>
    </main>
  )
}

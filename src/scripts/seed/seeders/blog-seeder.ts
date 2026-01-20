import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(dirname, '../../../../.env') })

const blogPosts = [
  {
    title: 'The Future of Web Development with Payload 3.0',
    slug: 'future-of-web-dev-payload-3',
    excerpt:
      'Explore how Payload 3.0 is revolutionizing headless CMS with its Next.js-first approach and incredible performance.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Payload 3.0 has arrived, and it brings a whole new level of integration with Next.js. By leveraging the power of server components and actions, developers can now build faster, more secure, and more maintainable applications than ever before.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-10T00:00:00.000Z',
  },
  {
    title: 'Mastering TypeScript for Enterprise Applications',
    slug: 'mastering-typescript-enterprise',
    excerpt:
      'Learn the advanced TypeScript patterns used by industry leaders to build robust and type-safe large-scale systems.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'TypeScript has become the industry standard for large-scale web applications. In this post, we dive deep into advanced types, generics, and architectural patterns that help maintain clean and stable codebases.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-12T00:00:00.000Z',
  },
  {
    title: 'Designing Beautiful Dark Mode Interfaces',
    slug: 'designing-dark-mode-interfaces',
    excerpt:
      'A guide to creating high-contrast, accessible, and ultra-modern dark mode designs that users will love.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: "Dark mode is more than just a passing trend; it's an essential feature for modern user interfaces. We discuss color palettes, accessibility considerations, and CSS techniques for implementing seamless dark mode transitions.",
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-14T00:00:00.000Z',
  },
  {
    title: 'Building Scalable APIs with Node.js and Postgres',
    slug: 'building-scalable-apis-nodejs',
    excerpt:
      'How to architect backend services that can handle millions of requests while maintaining low latency and high reliability.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Scalability starts at the database level. Learn how to optimize your PostgreSQL queries and architect your Node.js services to handle high traffic and concurrent connections effectively.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-15T00:00:00.000Z',
  },
  {
    title: 'The Rise of AI-Driven Development Tools',
    slug: 'rise-of-ai-dev-tools',
    excerpt:
      'From GitHub Copilot to automated testing, AI is changing the way we write code. Is it time to adapt or get left behind?',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: "Artificial intelligence is no longer speculative—it's actively helping developers code faster and with fewer errors. We explore the latest tools and how they integrate into a modern developer workflow.",
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-16T00:00:00.000Z',
  },
  {
    title: 'Optimizing Next.js for Core Web Vitals',
    slug: 'optimizing-nextjs-web-vitals',
    excerpt:
      'Practical tips and tricks to hit the 100/100 Lighthouse score and ensure your users have the fastest experience possible.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Core Web Vitals are crucial for SEO and user experience. We cover image optimization, bundle size reduction, and effective use of the Next.js App Router to achieve top-tier performance.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-17T00:00:00.000Z',
  },
  {
    title: 'Server Actions vs. API Routes in Next.js',
    slug: 'server-actions-vs-api-routes',
    excerpt:
      'When should you use Server Actions and when are traditional API routes the better choice? A detailed comparison.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'With the introduction of Server Actions, the way we handle data mutations in Next.js has fundamentally changed. We compare both approaches to help you decide which one fits your project requirements.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-18T00:00:00.000Z',
  },
  {
    title: 'The Art of Minimalist Web Design',
    slug: 'art-of-minimalist-web-design',
    excerpt:
      'How to achieve more by doing less. Learn the principles of minimalist design that create timeless and focused web experiences.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: "Minimalism isn't just about white space; it's about purpose and clarity. We look at how to strip away the non-essential to create more impactful and user-centered designs.",
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
    publishedDate: '2026-01-19T00:00:00.000Z',
  },
]

const downloadImage = async (
  url: string,
): Promise<{ data: Buffer; name: string; mimetype: string }> => {
  const response = await fetch(url)
  
  // Validate HTTP response before reading the body
  if (!response.ok) {
    throw new Error(
      `Failed to download image from ${url}: ${response.status} ${response.statusText}`
    )
  }
  
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const contentType = response.headers.get('content-type') || 'image/jpeg'
  const extension = contentType.split('/')[1] || 'jpg'
  return {
    data: buffer,
    name: `blog-image-${Math.random().toString(36).substring(7)}.${extension}`,
    mimetype: contentType,
  }
}

const runBlogSeeder = async () => {
  try {
    if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
      console.error('❌ Error: PAYLOAD_SECRET and DATABASE_URL are required.')
      process.exit(1)
    }

    console.log('🚀 Initializing Payload...')
    const { default: config } = await import('../../../payload.config.js')
    await payload.init({ config })

    console.log('📝 Seeding Blog Posts...')
    for (const [_index, post] of blogPosts.entries()) {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
      })

      if (existing.totalDocs === 0) {
        console.log(`📸 Fetching image for: ${post.title}...`)
        // Using different seed for each image to get unique ones
        const image = await downloadImage(`https://picsum.photos/seed/${post.slug}/1200/800`)

        console.log(`📤 Uploading media for: ${post.title}...`)
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: post.title,
          },
          file: {
            data: image.data,
            name: image.name,
            mimetype: image.mimetype,
            size: image.data.length,
          },
        })

        console.log(`✨ Creating post: ${post.title}...`)
        await payload.create({
          collection: 'posts',
          data: {
            ...post,
            featuredImage: media.id,
          },
        })
      } else {
        console.log(`⏩ Skipping existing post: ${post.title}`)
      }
    }

    console.log('✅ Blog seeding completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error seeding blog data:', err)
    process.exit(1)
  }
}

runBlogSeeder()

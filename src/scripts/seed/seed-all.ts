import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(dirname, '../../../.env') })

// Helper function to download images from Lorem Picsum
const downloadImage = async (
  seed: string,
  width: number = 1200,
  height: number = 800,
): Promise<{ data: Buffer; name: string; mimetype: string }> => {
  const url = `https://picsum.photos/seed/${seed}/${width}/${height}`
  console.log(`  📥 Downloading image from: ${url}`)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed to download image from ${url}: ${response.status} ${response.statusText}`,
    )
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const contentType = response.headers.get('content-type') || 'image/jpeg'
  const extension = contentType.split('/')[1] || 'jpg'

  return {
    data: buffer,
    name: `${seed}-${width}x${height}.${extension}`,
    mimetype: contentType,
  }
}

// Seed data
const seedData = {
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
    password: process.env.ADMIN_PASSWORD || 'StrongPassword.12345',
    name: 'Super Admin',
  },
  skills: [
    { name: 'React', category: 'frontend' as const },
    { name: 'Next.js', category: 'frontend' as const },
    { name: 'TypeScript', category: 'frontend' as const },
    { name: 'Tailwind CSS', category: 'frontend' as const },
    { name: 'Vue.js', category: 'frontend' as const },
    { name: 'Node.js', category: 'backend' as const },
    { name: 'Express.js', category: 'backend' as const },
    { name: 'PostgreSQL', category: 'backend' as const },
    { name: 'MongoDB', category: 'backend' as const },
    { name: 'Payload CMS', category: 'backend' as const },
    { name: 'REST APIs', category: 'backend' as const },
    { name: 'GraphQL', category: 'backend' as const },
    { name: 'Docker', category: 'devops' as const },
    { name: 'Kubernetes', category: 'devops' as const },
    { name: 'CI/CD Pipelines', category: 'devops' as const },
    { name: 'AWS', category: 'devops' as const },
    { name: 'Vercel', category: 'devops' as const },
    { name: 'AI Automation', category: 'ai' as const },
    { name: 'Large Language Models', category: 'ai' as const },
    { name: 'OpenAI API', category: 'ai' as const },
  ],
  projects: [
    {
      title: 'Global E-commerce Platform',
      slug: 'global-ecommerce',
      description:
        'A high-performance e-commerce solution built with Next.js and Payload CMS, handling 100k+ monthly active users with seamless checkout experience.',
      featured: true,
      techStack: [
        { tag: 'Next.js' },
        { tag: 'Payload CMS' },
        { tag: 'Stripe' },
        { tag: 'PostgreSQL' },
        { tag: 'Tailwind CSS' },
      ],
      url: 'https://example.com/ecommerce',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Built a scalable e-commerce platform that handles thousands of transactions daily. Implemented advanced features like real-time inventory management, personalized recommendations, and multi-currency support.',
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
    },
    {
      title: 'AI Portfolio Builder',
      slug: 'ai-portfolio',
      description:
        'An automated tool that uses AI to generate professional portfolios from GitHub repositories, complete with project descriptions and tech stack analysis.',
      featured: true,
      techStack: [
        { tag: 'OpenAI' },
        { tag: 'TypeScript' },
        { tag: 'Next.js' },
        { tag: 'Vercel' },
        { tag: 'GitHub API' },
      ],
      url: 'https://example.com/ai-portfolio',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Leveraged GPT-4 to automatically analyze GitHub repositories and generate compelling portfolio content. The tool extracts project information, identifies technologies used, and creates professional descriptions.',
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
    },
    {
      title: 'Real-time Analytics Dashboard',
      slug: 'analytics-dashboard',
      description:
        'A custom analytics engine providing real-time insights for SaaS owners with beautiful data visualizations and predictive analytics.',
      featured: true,
      techStack: [
        { tag: 'React' },
        { tag: 'D3.js' },
        { tag: 'Node.js' },
        { tag: 'Redis' },
        { tag: 'WebSocket' },
      ],
      url: 'https://example.com/analytics',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Developed a real-time analytics platform that processes millions of events per day. Features include custom dashboards, automated reports, and machine learning-powered insights.',
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
    },
    {
      title: 'Healthcare Management System',
      slug: 'healthcare-system',
      description:
        'A comprehensive healthcare management platform for clinics and hospitals, featuring patient records, appointment scheduling, and telemedicine capabilities.',
      featured: false,
      techStack: [
        { tag: 'Next.js' },
        { tag: 'PostgreSQL' },
        { tag: 'WebRTC' },
        { tag: 'HIPAA Compliant' },
      ],
      url: 'https://example.com/healthcare',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Built a HIPAA-compliant healthcare platform with end-to-end encryption, secure video consultations, and integrated electronic health records management.',
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
    },
    {
      title: 'Social Media Automation Tool',
      slug: 'social-automation',
      description:
        'An intelligent social media management platform that uses AI to schedule posts, analyze engagement, and optimize content strategy across multiple platforms.',
      featured: false,
      techStack: [{ tag: 'Node.js' }, { tag: 'OpenAI' }, { tag: 'MongoDB' }, { tag: 'Bull Queue' }],
      url: 'https://example.com/social-automation',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Created an AI-powered social media automation tool that helps businesses maintain consistent online presence. Features include content generation, optimal posting times, and engagement analytics.',
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
    },
  ],
  posts: [
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'The new architecture eliminates the need for separate API routes in many cases, reducing complexity and improving performance. With built-in TypeScript support and automatic type generation, the developer experience is unmatched.',
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'From conditional types to template literal types, TypeScript offers powerful tools for creating type-safe abstractions. We explore real-world examples from enterprise applications and discuss best practices for team collaboration.',
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Learn how to use CSS custom properties, prefers-color-scheme media queries, and JavaScript to create a smooth dark mode experience. We also cover common pitfalls and how to avoid them.',
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'We cover connection pooling, query optimization, caching strategies, and horizontal scaling techniques. Real-world examples demonstrate how to build APIs that can grow with your business.',
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'From code completion to automated refactoring, AI tools are becoming indispensable. We discuss the benefits, limitations, and ethical considerations of AI-assisted development.',
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Learn about lazy loading, code splitting, and server-side rendering strategies that can dramatically improve your Lighthouse scores and user satisfaction.',
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Server Actions offer better type safety and simpler code, but API routes provide more flexibility for complex scenarios. We examine use cases for both and provide practical examples.',
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
            {
              type: 'paragraph',
              children: [
                {
                  text: 'From typography to color palettes, every element should serve a purpose. We explore examples from leading design systems and discuss how to apply these principles to your own projects.',
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
    {
      title: 'Microservices Architecture: When and Why',
      slug: 'microservices-architecture',
      excerpt:
        'Understanding when microservices make sense and when a monolith is the better choice for your application.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Microservices are not a silver bullet. We discuss the trade-offs, challenges, and benefits of microservices architecture, helping you make informed decisions for your projects.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Learn about service boundaries, inter-service communication, and deployment strategies. We also cover common pitfalls and how to avoid them when transitioning from a monolith.',
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
      publishedDate: '2026-01-20T00:00:00.000Z',
    },
    {
      title: 'Building Accessible Web Applications',
      slug: 'building-accessible-web-apps',
      excerpt:
        'A comprehensive guide to web accessibility, from ARIA labels to keyboard navigation and screen reader support.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: "Web accessibility is not optional—it's a fundamental requirement. We cover WCAG guidelines, semantic HTML, and practical techniques for making your applications usable by everyone.",
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'From color contrast to focus management, we explore the essential aspects of accessibility. Learn how to test your applications and ensure they meet accessibility standards.',
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
      publishedDate: '2026-01-21T00:00:00.000Z',
    },
  ],
  about: {
    availabilityStatus: 'Available for new projects',
    heroHeadline: 'Building digital excellence with modern code.',
    heroSubtext:
      'I am a full-stack engineer specializing in Next.js, TypeScript, and high-performance web applications.',
    aboutSectionTitle: 'About Me',
    aboutHeadline: 'Crafting experiences with precision.',
    bio: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'I have over 5 years of experience in the industry, working with startups and established companies to build scalable and performant web products. My passion lies in clean code, modular architecture, and delightful user experiences.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                text: 'I specialize in modern web technologies including React, Next.js, TypeScript, and Node.js. I believe in writing code that is not only functional but also maintainable and scalable.',
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
    stats: [
      { value: '5+', label: 'Years Experience' },
      { value: '50+', label: 'Projects Completed' },
      { value: '30+', label: 'Happy Clients' },
      { value: '100%', label: 'Client Satisfaction' },
    ],
    expertiseSectionTitle: 'Expertise',
    expertiseHeadline: 'Technical Arsenal',
    projectsSectionTitle: 'Selected Works',
    projectsHeadline: 'Featured Projects',
    contactSectionTitle: 'Get in Touch',
    contactHeadline: "Let's Build Together.",
    contactSubtext: 'Currently open to freelance opportunities and full-time positions.',
    email: 'hello@hasnain.me',
    location: 'Dubai, UAE',
  },
  header: {
    logoText: 'HT',
    navLinks: [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/#about' },
      { label: 'Projects', link: '/projects' },
      { label: 'Blog', link: '/blog' },
      { label: 'Contact', link: '/#contact' },
    ],
    ctaText: 'Hire Me',
  },
  footer: {
    logoText: 'HT',
    description: 'Building digital excellence with modern web technologies.',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/hasnain' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/hasnain' },
      { platform: 'Twitter', url: 'https://twitter.com/hasnain' },
      { platform: 'Email', url: 'mailto:hello@hasnain.me' },
    ],
    copyrightText: '© {year} Hasnain Tanoli. All rights reserved.',
  },
}

const runSeedAll = async () => {
  try {
    // Check for required environment variables
    if (!process.env.PAYLOAD_SECRET) {
      console.error('❌ Error: PAYLOAD_SECRET environment variable is required.')
      console.error('Please create a .env file in the root directory with:')
      console.error('PAYLOAD_SECRET=your-secret-key-here')
      console.error('DATABASE_URL=your-database-connection-string')
      process.exit(1)
    }

    if (!process.env.DATABASE_URL) {
      console.error('❌ Error: DATABASE_URL environment variable is required.')
      console.error('Please add DATABASE_URL to your .env file')
      process.exit(1)
    }

    console.log('🚀 Initializing Payload...')
    const { default: config } = await import('../../payload.config.js')
    await payload.init({ config })

    console.log('\n' + '='.repeat(60))
    console.log('🌱 Starting comprehensive database seeding...')
    console.log('='.repeat(60) + '\n')

    // 1. Seed Admin User
    console.log('👤 Step 1: Seeding Admin User...')
    const existingAdmin = await payload.find({
      collection: 'users',
      where: {
        email: { equals: seedData.admin.email },
      },
    })

    if (existingAdmin.totalDocs > 0) {
      console.log(`  ✓ Admin user already exists: ${seedData.admin.email}`)
    } else {
      await payload.create({
        collection: 'users',
        data: {
          name: seedData.admin.name,
          email: seedData.admin.email,
          password: seedData.admin.password,
          roles: ['admin'],
        },
      })
      console.log(`  ✓ Admin user created: ${seedData.admin.email}`)
    }

    // 2. Seed Skills
    console.log('\n🛠️  Step 2: Seeding Skills...')
    let skillsCreated = 0
    let skillsSkipped = 0

    for (const skill of seedData.skills) {
      const existing = await payload.find({
        collection: 'skills',
        where: { name: { equals: skill.name } },
      })

      if (existing.totalDocs === 0) {
        await payload.create({ collection: 'skills', data: skill })
        skillsCreated++
        console.log(`  ✓ Created skill: ${skill.name}`)
      } else {
        skillsSkipped++
      }
    }

    console.log(`  ✓ Skills: ${skillsCreated} created, ${skillsSkipped} skipped`)

    // 3. Seed Projects with Images
    console.log('\n🚀 Step 3: Seeding Projects...')
    let projectsCreated = 0
    let projectsSkipped = 0

    for (const project of seedData.projects) {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
      })

      if (existing.totalDocs === 0) {
        console.log(`  📸 Downloading image for: ${project.title}...`)
        const image = await downloadImage(`project-${project.slug}`, 1200, 800)

        console.log(`  📤 Uploading media for: ${project.title}...`)
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: project.title,
          },
          file: {
            data: image.data,
            name: image.name,
            mimetype: image.mimetype,
            size: image.data.length,
          },
        })

        console.log(`  ✨ Creating project: ${project.title}...`)
        await payload.create({
          collection: 'projects',
          data: {
            ...project,
            image: media.id,
          },
        })
        projectsCreated++
        console.log(`  ✓ Created project: ${project.title}`)
      } else {
        projectsSkipped++
        console.log(`  ⏩ Skipping existing project: ${project.title}`)
      }
    }

    console.log(`  ✓ Projects: ${projectsCreated} created, ${projectsSkipped} skipped`)

    // 4. Seed Blog Posts with Images
    console.log('\n📝 Step 4: Seeding Blog Posts...')
    let postsCreated = 0
    let postsSkipped = 0

    for (const post of seedData.posts) {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
      })

      if (existing.totalDocs === 0) {
        console.log(`  📸 Downloading image for: ${post.title}...`)
        const image = await downloadImage(`blog-${post.slug}`, 1200, 800)

        console.log(`  📤 Uploading media for: ${post.title}...`)
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

        console.log(`  ✨ Creating post: ${post.title}...`)
        await payload.create({
          collection: 'posts',
          data: {
            ...post,
            featuredImage: media.id,
          },
        })
        postsCreated++
        console.log(`  ✓ Created post: ${post.title}`)
      } else {
        postsSkipped++
        console.log(`  ⏩ Skipping existing post: ${post.title}`)
      }
    }

    console.log(`  ✓ Posts: ${postsCreated} created, ${postsSkipped} skipped`)

    // 5. Seed About Global with Profile Image
    console.log('\n👤 Step 5: Seeding About Global...')

    // Download and upload profile image
    console.log('  📸 Downloading profile image...')
    const profileImage = await downloadImage('profile-hasnain', 400, 400)

    console.log('  📤 Uploading profile image...')
    const profileMedia = await payload.create({
      collection: 'media',
      data: {
        alt: 'Profile Picture',
      },
      file: {
        data: profileImage.data,
        name: profileImage.name,
        mimetype: profileImage.mimetype,
        size: profileImage.data.length,
      },
    })

    await payload.updateGlobal({
      slug: 'about',
      data: {
        ...seedData.about,
        profileImage: profileMedia.id,
      },
    })
    console.log('  ✓ About global updated successfully')

    // 6. Seed Header Global
    console.log('\n🔝 Step 6: Seeding Header Global...')
    await payload.updateGlobal({
      slug: 'header',
      data: seedData.header,
    })
    console.log('  ✓ Header global updated successfully')

    // 7. Seed Footer Global
    console.log('\n🔽 Step 7: Seeding Footer Global...')
    await payload.updateGlobal({
      slug: 'footer',
      data: seedData.footer,
    })
    console.log('  ✓ Footer global updated successfully')

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('✅ Database seeding completed successfully!')
    console.log('='.repeat(60))
    console.log('\nSummary:')
    console.log(`  • Admin User: ${existingAdmin.totalDocs > 0 ? 'Already exists' : 'Created'}`)
    console.log(`  • Skills: ${skillsCreated} created, ${skillsSkipped} skipped`)
    console.log(`  • Projects: ${projectsCreated} created, ${projectsSkipped} skipped`)
    console.log(`  • Blog Posts: ${postsCreated} created, ${postsSkipped} skipped`)
    console.log(`  • About Global: Updated`)
    console.log(`  • Header Global: Updated`)
    console.log(`  • Footer Global: Updated`)
    console.log('\n🎉 Your portfolio is ready to go!')
    console.log('\nNext steps:')
    console.log('  1. Start the development server: npm run dev')
    console.log('  2. Visit http://localhost:3000 to see your portfolio')
    console.log('  3. Visit http://localhost:3000/admin to access the CMS')
    console.log(`  4. Login with: ${seedData.admin.email}`)
    console.log('\n')

    process.exit(0)
  } catch (err) {
    console.error('\n❌ Error during seeding:', err)
    process.exit(1)
  }
}

runSeedAll()

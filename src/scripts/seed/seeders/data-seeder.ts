import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(dirname, '../../../../.env') })

const data = {
  about: {
    heroHeadline: 'Building digital excellence with modern code.',
    heroSubtext:
      'I am a full-stack engineer specializing in Next.js, TypeScript, and high-performance web applications.',
    email: 'hello@hasnain.me',
    location: 'Dubai, UAE',
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
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    },
  },
  skills: [
    { name: 'React & Next.js', category: 'frontend' as const },
    { name: 'Tailwind CSS', category: 'frontend' as const },
    { name: 'TypeScript', category: 'frontend' as const },
    { name: 'Node.js', category: 'backend' as const },
    { name: 'PostgreSQL', category: 'backend' as const },
    { name: 'Payload CMS', category: 'backend' as const },
    { name: 'Docker', category: 'devops' as const },
    { name: 'CI/CD Pipelines', category: 'devops' as const },
    { name: 'AWS', category: 'devops' as const },
    { name: 'AI Automation', category: 'ai' as const },
    { name: 'Large Language Models', category: 'ai' as const },
  ],
  projects: [
    {
      title: 'Global E-commerce Platform',
      slug: 'global-ecommerce',
      description:
        'A high-performance e-commerce solution built with Next.js and Payload CMS, handling 100k+ monthly active users.',
      featured: true,
      techStack: [{ tag: 'Next.js' }, { tag: 'Payload' }, { tag: 'Stripe' }, { tag: 'PostgreSQL' }],
      url: 'https://example.com',
    },
    {
      title: 'AI Portfolio Builder',
      slug: 'ai-portfolio',
      description:
        'An automated tool that uses AI to generate professional portfolios from GitHub repositories.',
      featured: false,
      techStack: [{ tag: 'OpenAI' }, { tag: 'TypeScript' }, { tag: 'Vercel' }],
      url: 'https://example.com',
    },
    {
      title: 'Real-time Analytics Dashboard',
      slug: 'analytics-dashboard',
      description:
        'A custom analytics engine providing real-time insights for SaaS owners with beautiful data visualizations.',
      featured: true,
      techStack: [{ tag: 'React' }, { tag: 'D3.js' }, { tag: 'Node.js' }, { tag: 'Redis' }],
      url: 'https://example.com',
    },
  ],
}

const runDataSeeder = async () => {
  try {
    if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
      console.error('❌ Error: PAYLOAD_SECRET and DATABASE_URL are required.')
      process.exit(1)
    }

    console.log('🚀 Initializing Payload...')
    const { default: config } = await import('../../../payload.config.js')
    await payload.init({ config })

    console.log('📸 Handling Media...')
    const existingMedia = await payload.find({ collection: 'media', limit: 1 })
    const mediaId = existingMedia.docs[0]?.id

    console.log('👤 Seeding About Global...')
    await payload.updateGlobal({
      slug: 'about',
      data: {
        ...data.about,
        profileImage: mediaId || undefined,
      },
    })

    console.log('🛠️ Seeding Skills...')
    for (const skill of data.skills) {
      const existing = await payload.find({
        collection: 'skills',
        where: { name: { equals: skill.name } },
      })
      if (existing.totalDocs === 0) {
        await payload.create({ collection: 'skills', data: skill })
      }
    }

    console.log('🚀 Seeding Projects...')
    for (const project of data.projects) {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
      })
      if (existing.totalDocs === 0) {
        // @ts-expect-error - image is required but may be undefined if no media exists
        await payload.create({
          collection: 'projects',
          data: {
            ...project,
            image: mediaId || undefined,
          },
        })
      }
    }

    console.log('✅ Data seeding completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error seeding data:', err)
    process.exit(1)
  }
}

runDataSeeder()

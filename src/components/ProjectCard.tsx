import Link from 'next/link'
import Image from 'next/image'
import type { Media, Project } from '@/payload-types'

type ProjectCardProps = {
  project: Project
  className?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const image = (typeof project.image === 'string' ? null : project.image) as Media | null

  return (
    <div
      className={`group relative overflow-hidden rounded-4xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 transition-all duration-500 hover:bg-stone-200 dark:hover:bg-stone-800 hover:scale-[1.01] hover:shadow-2xl hover:shadow-stone-300/50 dark:hover:shadow-black/50 ${className}`}
    >
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {project.title}</span>
      </Link>
      <div className="flex h-full flex-col">
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
          )}
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-200 dark:from-stone-900 via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col grow justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack?.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="rounded-full bg-stone-200 dark:bg-stone-700/50 border border-stone-300 dark:border-stone-600/30 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-stone-600 dark:text-stone-400"
                >
                  {item.tag}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-stone-900 dark:text-white group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
              {project.title}
            </h3>
            <p className="mt-4 text-stone-600 dark:text-stone-400 line-clamp-2 text-sm leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
              {project.description}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            {project.url && (
              <a
                href={project.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-stone-900 dark:text-white group/link transition-colors"
              >
                Explore Project
                <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

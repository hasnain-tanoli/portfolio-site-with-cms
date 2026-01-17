import React from 'react'
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
      className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-xl ${className}`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-6 overflow-hidden rounded-2xl bg-gray-100">
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alt || project.title}
                width={800}
                height={600}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
          <p className="mt-2 text-gray-500 line-clamp-3">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack?.map((item, i) => (
              <span
                key={i}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {item.tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 duration-200 hover:text-gray-600"
            >
              Live Demo &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

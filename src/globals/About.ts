import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'availabilityStatus',
      type: 'text',
      required: true,
      defaultValue: 'Available for new projects',
    },
    {
      name: 'heroHeadline',
      type: 'text',
      required: true,
      defaultValue: 'Building digital products that matter.',
    },
    {
      name: 'heroSubtext',
      type: 'textarea',
      required: true,
      defaultValue:
        'I am a full-stack developer passionate about clean code and delightful user experiences.',
    },
    {
      name: 'aboutSectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'About Me',
    },
    {
      name: 'aboutHeadline',
      type: 'text',
      required: true,
      defaultValue: 'Crafting experiences with precision.',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Professional Bio',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'expertiseSectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Expertise',
    },
    {
      name: 'expertiseHeadline',
      type: 'text',
      required: true,
      defaultValue: 'Technical Arsenal',
    },
    {
      name: 'projectsSectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Selected Works',
    },
    {
      name: 'projectsHeadline',
      type: 'text',
      required: true,
      defaultValue: 'Featured Projects',
    },
    {
      name: 'contactSectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Get in Touch',
    },
    {
      name: 'contactHeadline',
      type: 'text',
      required: true,
      defaultValue: "Let's Build Together.",
    },
    {
      name: 'contactSubtext',
      type: 'textarea',
      required: true,
      defaultValue: 'Currently open to freelance opportunities and full-time positions.',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'hello@hasnain.me',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'Dubai, UAE',
    },
  ],
}

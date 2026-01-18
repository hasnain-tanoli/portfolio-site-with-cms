import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroHeadline',
      type: 'text',
      required: true,
      defaultValue: 'Hi, I’m Hasnain Tanoli',
    },
    {
      name: 'heroSubtext',
      type: 'textarea',
      required: true,
      defaultValue: 'I build beautiful web experiences.',
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
  ],
}

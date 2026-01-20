import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      required: true,
      defaultValue: 'HT',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Building digital excellence with modern web technologies.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      defaultValue: '© {year} Hasnain Tanoli. All rights reserved.',
    },
  ],
}

import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'firstColumn',
      fields: [
        {
          type: 'array',
          name: 'navItems',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'secondColumn',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          type: 'array',
          name: 'navItems',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
    {
      name: 'copyrightText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
    {
      type: 'group',
      name: 'socialMedia',
      label: 'Social Media Links',
      fields: [
        {
          name: 'facebookUrl',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn URL',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

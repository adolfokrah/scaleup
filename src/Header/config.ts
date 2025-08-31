import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'menuTitle',
          type: 'text',
          admin: {
            description:
              'Title displayed in the dropdown menu (e.g., "Overview"). Only used if this link has submenus.',
          },
        },
        {
          name: 'menuSubtitle',
          type: 'text',
          admin: {
            description:
              'Subtitle displayed under the title in the dropdown menu. Only used if this link has submenus.',
          },
        },
        {
          name: 'submenus',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 4,
          admin: {
            description: 'Create dropdown menu sections with multiple links',
            initCollapsed: true,
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'supportButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Support us',
          admin: {
            description: 'Text displayed on the support button',
          },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Ghost',
              value: 'ghost',
            },
            {
              label: 'Link',
              value: 'link',
            },
          ],
          admin: {
            description: 'Visual style of the button',
          },
        },
        link({
          appearances: false,
        }),
      ],
      admin: {
        description: 'Configuration for the support button in the header',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

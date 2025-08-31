import type { Block } from 'payload'
import { link } from '@/fields/link'
import deepMerge from '@/utilities/deepMerge'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const MediaContent: Block = {
  slug: 'mediaContent',
  interfaceName: 'MediaContentBlock',
  labels: {
    singular: 'Media Content Block',
    plural: 'Media Content Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'imageLeft',
      options: [
        {
          label: 'Image Left',
          value: 'imageLeft',
        },
        {
          label: 'Image Right',
          value: 'imageRight',
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
    deepMerge(
      link({
        appearances: ['default', 'outline'],
      }),
      {
        admin: {
          condition: (_: any, { enableLink }: any) => Boolean(enableLink),
        },
      },
    ),
  ],
}

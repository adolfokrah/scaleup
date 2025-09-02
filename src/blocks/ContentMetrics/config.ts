import type { Block } from 'payload'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContentMetrics: Block = {
  slug: 'contentMetrics',
  interfaceName: 'ContentMetricsBlock',
  labels: {
    singular: 'Content Metrics Block',
    plural: 'Content Metrics Blocks',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        description: 'Unique ID for anchor links (e.g., "metrics" for #metrics)',
        placeholder: 'section-id',
      },
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
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Learn More',
          required: true,
        },
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'metrics',
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
      defaultValue: [
        { value: '+200M', label: 'HUMANS IMPACTED' },
        { value: '50K', label: 'COLLABORATORS' },
        { value: '120+', label: 'ASSISTED' },
        { value: '120+', label: 'ASSISTED' },
      ],
      minRows: 4,
      maxRows: 4,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

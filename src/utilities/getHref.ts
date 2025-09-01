import type { Page, Post } from '@/payload-types'

type GetHrefProps = {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  url?: string | null
  anchor?: string | null
}

export const getHref = ({ type, reference, url, anchor }: GetHrefProps): string | null => {
  const baseHref =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  // Add anchor if provided and baseHref exists
  const href =
    baseHref && anchor ? `${baseHref}${anchor.startsWith('#') ? anchor : `#${anchor}`}` : baseHref

  return href || null
}

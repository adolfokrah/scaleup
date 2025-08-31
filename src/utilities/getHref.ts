import type { Page, Post } from '@/payload-types'

type GetHrefProps = {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  url?: string | null
}

export const getHref = ({ type, reference, url }: GetHrefProps): string | null => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  return href || null
}

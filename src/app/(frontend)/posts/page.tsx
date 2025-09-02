import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import { LowImpactHero } from '@/heros/LowImpact'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { Card } from '@/components/Card'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  // Separate the first post from the rest
  const firstPost = posts.docs[0]
  const remainingPosts = posts.docs.slice(1)

  return (
    <div>
      <LowImpactHero>
        <div className="w-fit">
          <h1 className="text-4xl md:text-6xl font-bold font-tiempos underline-static after:!h-5 mt-20">
            Articles
          </h1>
        </div>
      </LowImpactHero>

      <div className="pt-24 pb-24">
        <PageClient />

        <div className="container">
          {firstPost && (
            <Card
              doc={firstPost}
              relationTo="posts"
              className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-16 mx-5 md:border-b border-gray-100 md:pb-20"
              showCategories
              titleClassName="text:2xl md:text-5xl lg:font-bold"
              contentClassName="flex justify-center flex-col p-0 lg:p-10"
            />
          )}
        </div>

        <CollectionArchive posts={remainingPosts} className="border-t-0" />

        <div className="container">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Scaleup future Posts`,
  }
}

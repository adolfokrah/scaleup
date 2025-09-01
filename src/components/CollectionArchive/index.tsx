import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div className="border-t border-gray-200/60 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div
                  key={index}
                  className="p-6 bg-white/50 lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:border-gray-200/60 pt-8"
                >
                  <Card
                    className="h-full border-none"
                    doc={result}
                    relationTo="posts"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}

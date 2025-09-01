'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { motion } from 'framer-motion'

export type Props = {
  posts: CardPostData[]
  className?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, className } = props

  return (
    <motion.div
      className={cn('container')}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 2 * 0.1,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className={cn('border-t border-gray-200/60 ', className)}>
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
    </motion.div>
  )
}

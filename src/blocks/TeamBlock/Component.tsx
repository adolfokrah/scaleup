'use client'
import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const imageVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { heading, teamMembers } = props

  return (
    <div className="container mx-auto px-4">
      {/* Section Title */}
      {heading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="prose prose-lg max-w-none mx-auto">
            <RichText data={heading} enableGutter={false} />
          </div>
        </motion.div>
      )}

      {/* Team Members Grid */}
      {teamMembers && teamMembers.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn('grid gap-8 lg:gap-12 md:grid-cols-3  lg:grid-cols-4')}
        >
          {teamMembers.map((member, index) => {
            if (typeof member === 'object' && member !== null) {
              const { name, title: jobTitle, image } = member

              return (
                <motion.div key={index} variants={itemVariants} className="group">
                  {/* Profile Image */}
                  <motion.div variants={imageVariants} className="relative mx-auto mx-h-120">
                    <div className="relative w-full h-full overflow-hidden ">
                      {image && typeof image === 'object' && (
                        <Media resource={image} imgClassName="w-full h-full object-cover" />
                      )}
                    </div>
                  </motion.div>

                  {/* Member Info */}
                  <div className="pb-10 mt-3 space-y-2">
                    {name && (
                      <h3 className="text-l font-tiempos text-primary font-light lg:text-xl">
                        {name}
                      </h3>
                    )}

                    {jobTitle && <p className="text-sm lg:text-base font-work-sans">{jobTitle}</p>}
                  </div>
                </motion.div>
              )
            }
            return null
          })}
        </motion.div>
      )}
    </div>
  )
}

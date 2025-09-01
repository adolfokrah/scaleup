import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={400}
      height={45}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-37.5 w-full h-[45px] brightness-0 invert', className)}
      src="https://rg0w8zf8jr.ufs.sh/f/pnnsnpLaTAYjFpDWUfYb8d05z7JDOYPZCjM4bXKf6RgNmq19"
    />
  )
}

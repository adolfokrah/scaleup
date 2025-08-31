import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-none text-md font-regular ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-14 px-10 py-2',
        // icon: 'h-10 w-10',
        // lg: 'h-11 rounded-none px-8',
        // sm: 'h-9 rounded-none px-3',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground relative overflow-hidden before:absolute before:inset-0 before:bg-secondary/20 before:transform before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 hover:before:scale-y-100 hover:text-white',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost:
          'relative overflow-hidden hover:text-accent-foreground before:absolute before:inset-0 before:bg-card before:transform before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:-z-10 hover:before:scale-y-100',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline:
          'border border-border bg-transparent text-white relative overflow-hidden hover:text-accent-foreground before:absolute before:inset-0 before:bg-card before:transform before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:-z-10 hover:before:scale-y-100',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }

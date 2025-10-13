import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none", 
  {
    variants: {
      variant: {
        default: "bg-primary text-secondary hover:bg-primary hover:shadow-custom-action hover:border-action hover:text-action shadow-custom-secondary border-solid border-secondary border-2 text-lg",
        action: "bg-primary text-action hover:bg-primary hover:shadow-custom-secondary hover:border-secondary hover:text-secondary shadow-custom-action border-solid border-action border-2 text-lg",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? (props as any).as || "span" : "button"
    return React.createElement(
      Component,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props,
      }
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
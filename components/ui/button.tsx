"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/theme-provider"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-soft hover:shadow-soft-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent/60 hover:text-accent-foreground",
        secondary: "bg-gradient-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/80 hover:text-accent-foreground shadow-none hover:shadow-none",
        link: "text-primary underline-offset-4 hover:underline shadow-none hover:shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const { preferences } = useAccessibility()
    const Comp = asChild ? Slot : "button"
    
    // Apply accessibility modifications
    const sizeWithAccessibility = preferences.simplifiedLayout && size !== "icon" ? "lg" : size

    const accessibleClassName = cn(
      preferences.simplifiedLayout && "font-semibold",
      preferences.highContrast !== "none" && "high-contrast-button",
      className,
    )
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size: sizeWithAccessibility, className: accessibleClassName }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

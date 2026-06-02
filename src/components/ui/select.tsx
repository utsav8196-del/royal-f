import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

const SelectTrigger = Select  // alias for compatibility
const SelectValue = ({ placeholder }: { placeholder?: string }) => null // not needed with native select, we'll just use <option>

const SelectContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <>{children}</>
)

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, children, ...props }, ref) => (
    <option ref={ref} className={cn("", className)} {...props}>
      {children}
    </option>
  )
)
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
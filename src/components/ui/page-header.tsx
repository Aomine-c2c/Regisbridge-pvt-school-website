import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  action,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 pb-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-brand-navy">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <Separator className="bg-slate-200" />
    </div>
  )
}

import type React from 'react'
import { cn } from '@/lib/utils'

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  action,
}: {
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <h2 className="text-[13px] font-semibold text-foreground">{title}</h2>
      {action}
    </div>
  )
}

export function ProgressBar({
  value,
  className,
  color,
}: {
  value: number
  className?: string
  color?: string
}) {
  return (
    <div
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full bg-border',
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-brand transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  )
}

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  variant?: 'default' | 'brand' | 'outline' | 'warn'
  className?: string
}) {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    brand: 'bg-brand-muted text-brand',
    outline: 'border border-border text-muted-foreground',
    warn: 'bg-amber-50 text-amber-700',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

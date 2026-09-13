import { cn } from '@/lib/utils'

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        aria-hidden="true"
        className="flex size-6 items-center justify-center rounded-[7px] bg-foreground text-background"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 4.5C5 3.67 5.67 3 6.5 3H15l4 4v12.5c0 .83-.67 1.5-1.5 1.5h-11C5.67 21 5 20.33 5 19.5v-15Z"
            className="fill-background/0 stroke-background"
            strokeWidth="1.6"
          />
          <path
            d="M8.5 11.5h7M8.5 15h4.5"
            className="stroke-background"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          NoteForge
        </span>
      )}
    </span>
  )
}

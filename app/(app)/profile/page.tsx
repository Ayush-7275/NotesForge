import { PageHeader } from '@/components/app/primitives'

export default function ProfilePage() {
  return (
    <div>
      <PageHeader
        title="Profile"
        description="Manage your NoteForge profile."
      />
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
              JS
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-foreground">
                Jordan Silva
              </h2>
              <p className="text-sm text-muted-foreground">
                jordan@university.edu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

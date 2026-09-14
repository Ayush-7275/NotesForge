import { PageHeader } from '@/components/app/primitives'
import { NotesView } from '@/components/app/notes-view'

export default function NotesPage() {
  return (
    <div>
      <PageHeader
        title="Notes"
        description="Review and organize your course notes."
      />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <NotesView />
      </div>
    </div>
  )
}

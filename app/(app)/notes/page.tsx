import { PageHeader } from '@/components/app/primitives'
import { NotesView } from '@/components/app/notes-view'

export default function NotesPage() {
  return (
    <div>
      <PageHeader
        title="Notes"
        description="Review and organize your course notes."
      />
      <NotesView />
    </div>
  )
}

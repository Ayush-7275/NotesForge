import { PageHeader } from "@/components/app/primitives"
import { UploadsView } from "@/components/app/uploads-view"

export default function UploadsPage() {
  return (
    <div>
      <PageHeader
        title="Uploads"
        description="Upload your course materials and NoteForge will turn them into organized notes."
      />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <UploadsView />
      </div>
    </div>
  )
}

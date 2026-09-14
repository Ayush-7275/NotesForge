import { PageHeader } from "@/components/app/primitives"
import { UploadsView } from "@/components/app/uploads-view"

export default function UploadsPage() {
  return (
    <div>
      <PageHeader
        title="Uploads"
        description="Upload your course materials and NoteForge will turn them into organized notes."
      />
      <UploadsView />
    </div>
  )
}

import { notFound } from "next/navigation"
import { getSubject } from "@/lib/mock-data"
import { SubjectWorkspace } from "@/components/app/subject-workspace"

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const subject = getSubject(id)

  if (!subject) {
    notFound()
  }

  return <SubjectWorkspace subject={subject} />
}

"use client"

import { useState } from "react"
import {
  UploadCloud,
  FileText,
  Presentation,
  FileType,
  ImageIcon,
  MoreHorizontal,
  CheckCircle2,
  Loader2,
  Clock,
} from "lucide-react"
import { files as initialFiles, type StudyFile } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const typeIcon = {
  pdf: FileText,
  ppt: Presentation,
  doc: FileType,
  image: ImageIcon,
} as const

const statusConfig = {
  completed: { label: "Ready", icon: CheckCircle2, className: "text-brand" },
  processing: { label: "Processing", icon: Loader2, className: "text-foreground" },
  queued: { label: "Queued", icon: Clock, className: "text-muted-foreground" },
} as const

export function UploadsView() {
  const [dragging, setDragging] = useState(false)
  const [files] = useState<StudyFile[]>(initialFiles)

  return (
    <div className="space-y-8">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors",
          dragging ? "border-brand bg-brand-muted/40" : "border-border bg-card",
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
          <UploadCloud className="size-6 text-foreground" />
        </div>
        <p className="mt-4 text-[15px] font-medium text-foreground">
          Drag & drop your files here
        </p>
        <p className="mt-1 text-[13px] text-muted-foreground">
          PDFs, slides, Word docs, and images up to 50MB each
        </p>
        <button className="mt-5 rounded-lg bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90">
          Browse files
        </button>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {["PDF", "PPTX", "DOCX", "PNG", "JPG"].map((f) => (
            <span
              key={f}
              className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* File list */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-foreground">Your files</h2>
          <span className="text-[13px] text-muted-foreground">{files.length} files</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {files.map((file, i) => {
            const Icon = typeIcon[file.type]
            const status = statusConfig[file.status]
            const StatusIcon = status.icon
            return (
              <div
                key={file.id}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5",
                  i !== files.length - 1 && "border-b border-border",
                )}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4.5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-foreground">{file.name}</p>
                  <p className="text-[12px] text-muted-foreground">
                    {file.subject} · {file.size} · {file.uploaded}
                  </p>
                </div>

                {file.status === "processing" && (
                  <div className="hidden w-32 sm:block">
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-brand transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "flex items-center gap-1.5 text-[12px] font-medium",
                    status.className,
                  )}
                >
                  <StatusIcon
                    className={cn("size-3.5", file.status === "processing" && "animate-spin")}
                  />
                  {status.label}
                </div>

                <button
                  className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="File options"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import {
  UploadCloud,
  FileText,
  Presentation,
  FileType,
  ImageIcon,
  Trash2,
  CheckCircle2,
} from "lucide-react"
import { loadUploads, saveUploads, type StudyFile } from "@/lib/uploads-store"
import { cn } from "@/lib/utils"

const typeIcon = {
  pdf: FileText,
  ppt: Presentation,
  doc: FileType,
  image: ImageIcon,
} as const

const statusConfig = {
  completed: { label: "Ready", icon: CheckCircle2, className: "text-brand" },
} as const

export function UploadsView() {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<StudyFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setFiles(loadUploads()), [])

  function addFiles(selectedFiles: FileList | File[]) {
    const validFiles = Array.from(selectedFiles)
    const oversized = validFiles.find((file) => file.size > 50 * 1024 * 1024)
    if (oversized) {
      setError(`${oversized.name} is larger than the 50MB limit.`)
      return
    }

    const nextFiles = validFiles.map<StudyFile>((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      name: file.name,
      type: getFileType(file),
      size: formatFileSize(file.size),
      subject: "Unassigned",
      status: "completed",
      progress: 100,
      uploaded: "Just now",
    }))
    const updatedFiles = [...nextFiles, ...files]
    setFiles(updatedFiles)
    saveUploads(updatedFiles)
    setError(null)
  }

  function removeFile(id: string) {
    const updatedFiles = files.filter((file) => file.id !== id)
    setFiles(updatedFiles)
    saveUploads(updatedFiles)
  }

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
          addFiles(e.dataTransfer.files)
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
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(event) => {
            if (event.target.files) addFiles(event.target.files)
            event.target.value = ""
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 rounded-lg bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Browse files
        </button>
        {error && <p className="mt-3 text-[12px] text-red-600">{error}</p>}
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
        {files.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            No files uploaded yet.
          </p>
        ) : files.map((file, i) => {
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

                <div
                  className={cn(
                    "flex items-center gap-1.5 text-[12px] font-medium",
                    status.className,
                  )}
                >
                  <StatusIcon className="size-3.5" />
                  {status.label}
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getFileType(file: File): StudyFile["type"] {
  if (file.type.startsWith("image/")) return "image"
  if (file.type.includes("presentation") || /\.(ppt|pptx)$/i.test(file.name)) return "ppt"
  if (file.type.includes("word") || /\.(doc|docx)$/i.test(file.name)) return "doc"
  return "pdf"
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

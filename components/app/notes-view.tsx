"use client"

import { useMemo, useState } from "react"
import { Search, Sparkles, Star, FileText } from "lucide-react"
import { notes, subjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const filters = ["All", ...subjects.map((s) => s.name)]

export function NotesView() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")

  const filtered = useMemo(() => {
    return notes.filter((note) => {
      const matchesFilter = filter === "All" || note.subject === filter
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.excerpt.toLowerCase().includes(q) ||
        note.tags.some((t) => t.toLowerCase().includes(q))
      return matchesFilter && matchesQuery
    })
  }, [query, filter])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes and tags..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((note) => (
          <article
            key={note.id}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-muted">
                  <FileText className="size-3.5 text-muted-foreground" />
                </div>
                <span className="text-[12px] font-medium text-muted-foreground">
                  {note.subject}
                </span>
              </div>
              <Star
                className={cn(
                  "size-4",
                  note.starred
                    ? "fill-brand text-brand"
                    : "text-muted-foreground/40 group-hover:text-muted-foreground",
                )}
              />
            </div>

            <h3 className="text-pretty text-[15px] font-semibold leading-snug text-foreground">
              {note.title}
            </h3>
            <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
              {note.excerpt}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
              <span>Updated {note.updated}</span>
              {note.aiGenerated && (
                <span className="inline-flex items-center gap-1 font-medium text-brand">
                  <Sparkles className="size-3" />
                  AI
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="text-[14px] text-muted-foreground">No notes match your search.</p>
        </div>
      )}
    </div>
  )
}

"use client"

import { useRef, useState } from "react"
import { ArrowUp, Paperclip, Sparkles, FileText, BookOpen, Plus } from "lucide-react"
import { chatHistory, suggestedQuestions, subjects, type ChatMessage } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const scopeChips = ["All subjects", ...subjects.slice(0, 4).map((s) => s.name)]

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory)
  const [input, setInput] = useState("")
  const [scope, setScope] = useState("All subjects")
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setThinking(true)

    setTimeout(() => {
      const reply: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "Based on your uploaded materials, here is a concise explanation. This response is grounded in the sources cited below so you can jump straight to the relevant passage in your notes.",
        citations: [
          { source: "OS_Lecture_09_Deadlocks.pdf", location: "Page 42" },
          { source: "OS_Concurrency_Notes.pdf", location: "Page 8" },
        ],
      }
      setMessages((prev) => [...prev, reply])
      setThinking(false)
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }))
    }, 900)

    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }))
  }

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col">
      {/* Scope selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        <span className="text-[13px] text-muted-foreground">Context</span>
        {scopeChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setScope(chip)}
            className={cn(
              "rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
              scope === chip
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {thinking && (
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Sparkles className="size-4 animate-pulse text-brand" />
            NoteForge is reading your sources...
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 3 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-left text-[12px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-foreground/30"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
              e.preventDefault()
              send(input)
            }
          }}
          rows={1}
          placeholder="Ask anything about your notes, PDFs, or slides..."
          className="max-h-40 w-full resize-none bg-transparent px-3 py-2 text-[14px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Attach a file"
            >
              <Paperclip className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Plus className="size-3.5" />
              Add source
            </button>
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="inline-flex size-8 items-center justify-center rounded-lg bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-30"
            aria-label="Send message"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground px-4 py-3 text-[14px] leading-relaxed text-background">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-muted">
        <Sparkles className="size-4 text-brand" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="space-y-3 text-[14px] leading-relaxed text-foreground">
          {message.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-pretty">
              {para}
            </p>
          ))}
        </div>
        {message.citations && message.citations.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Sources
            </p>
            <div className="flex flex-wrap gap-2">
              {message.citations.map((c) => (
                <span
                  key={c.source + c.location}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[12px] text-muted-foreground"
                >
                  <FileText className="size-3.5 text-brand" />
                  <span className="font-medium text-foreground">{c.source}</span>
                  <span className="text-border">·</span>
                  {c.location}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 pt-1 text-[12px] text-muted-foreground">
          <button className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
            <BookOpen className="size-3.5" />
            Save to notes
          </button>
          <button className="transition-colors hover:text-foreground">Regenerate</button>
        </div>
      </div>
    </div>
  )
}

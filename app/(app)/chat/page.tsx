import { PageHeader } from "@/components/app/primitives"
import { ChatView } from "@/components/app/chat-view"

export default function ChatPage() {
  return (
    <div>
      <PageHeader
        title="AI Chat"
        description="Ask questions and get answers grounded in your own study materials."
      />
      <ChatView />
    </div>
  )
}

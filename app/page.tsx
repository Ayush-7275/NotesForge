import { SiteHeader } from '@/components/marketing/site-header'
import { Hero } from '@/components/marketing/hero'
import { Features } from '@/components/marketing/features'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { AICapabilities } from '@/components/marketing/ai-capabilities'
import { Testimonials } from '@/components/marketing/testimonials'
import { FAQ } from '@/components/marketing/faq'
import { SiteFooter } from '@/components/marketing/site-footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AICapabilities />
        <Testimonials />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  )
}

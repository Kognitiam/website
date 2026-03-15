import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { CommunitySection } from "@/components/community-section"
import { JoinSection } from "@/components/join-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CommunitySection />
      <JoinSection />
      <Footer />
    </main>
  )
}

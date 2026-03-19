import Image from "next/image"
import { BookOpen, MessageCircle, Lightbulb, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: BookOpen,
    title: "Discuss AI",
    description: "Explore AI research, emerging trends, real-world use cases, and big ideas together through open, accessible discussions.",
  },
  {
    icon: MessageCircle,
    title: "Share Ideas",
    description: "Exchange thoughts, perspectives, and insights in a supportive environment. Every voice matters here.",
  },
  {
    icon: Lightbulb,
    title: "Learn Together",
    description: "Collaborative learning is at our core. From beginners to experts, we all have something to teach and learn.",
  },
  {
    icon: Users,
    title: "Grow as a Community",
    description: "Build lasting connections with fellow AI enthusiasts. Together, we're more than the sum of our parts.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">What We Do</span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Kognitiam Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Like a good kopitiam serves more than just coffee, Kognitiam offers a rich blend of learning experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-colors group"
            >
              <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kogi Presenting */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-card border border-border">
          <Image
            src="/images/kogi-presenting.png"
            alt="Kogi presenting ideas"
            width={250}
            height={250}
            className="w-48 h-auto"
          />
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Regular Sessions & Events
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Kognitiam hosts inclusive AI discussions for people from all backgrounds, including those without technical experience.
              Our sessions are designed to make AI concepts approachable, engaging, and meaningful through open conversation and shared
              learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote: "Kognitiam feels like coming home to a warm cup of kopi and great conversation about the future of AI.",
    author: "Community Member",
    role: "ML Engineer",
  },
  {
    quote: "The blend of casual atmosphere and deep technical discussions is exactly what I was looking for.",
    author: "Community Member", 
    role: "Research Scientist",
  },
  {
    quote: "I love how welcoming everyone is, regardless of your background. True kopitiam spirit!",
    author: "Community Member",
    role: "AI Enthusiast",
  },
]

export function CommunitySection() {
  return (
    <section id="community" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Community</span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Voices from the Kopitiam
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hear from fellow AI enthusiasts who have found their intellectual home at Kognitiam.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background border-border">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="text-4xl text-secondary">{'"'}</div>
                <p className="text-foreground leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kogi Thinking */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 p-8 rounded-2xl bg-background border border-border">
          <Image
            src="/images/kogi-thinking.png"
            alt="Kogi thinking"
            width={250}
            height={250}
            className="w-48 h-auto"
          />
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              A Place for Deep Thinking
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              At Kognitiam, we embrace the art of thoughtful discussion. Like Kogi pondering 
              the next big idea, we create space for reflection, questioning, and discovery. 
              No question is too basic, no idea too ambitious.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

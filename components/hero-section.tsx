import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Coffee, Users, BookOpen } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Coffee className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Singapore-born AI Community</span>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Where <span className="text-accent">Coffee</span> Meets{" "}
              <span className="text-primary">Cognition</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A community built around coffee, conversation, and collective learning. 
              Part reading group, part salon, part kopitiam for minds hungry to explore the frontiers of AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#join">Join the Community</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link href="#about">Learn More</Link>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Growing Community</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Weekly Sessions</span>
              </div>
            </div>
          </div>

          {/* Hero Image - Kogi */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/images/kogi-coffee.png"
                alt="Kogi the Kognitiam Corgi with coffee"
                width={450}
                height={450}
                className="w-full max-w-md h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

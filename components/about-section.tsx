import Image from "next/image"

export function AboutSection() {

  return (
    <section id="about" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Image */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <Image
              src="/images/github-header.png"
              alt="Kognitiam community gathering"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl w-full max-w-lg"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Story</span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              From Kopitiam to Community
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Kognitiam</strong> is a wordplay on <em>kopitiam</em>, the beloved 
                Singaporean coffee shop that has served as the neighborhood living room for generations.
              </p>
              <p>
                Born in Singapore, Kognitiam is an AI interest group that brings the kopitiam spirit to the 
                world of artificial intelligence. We believe that the best ideas emerge from informal, inclusive 
                conversations, just like the ones that happen over a cup of kopi.
              </p>
              <p>
                Our mascot <strong className="text-foreground">Kogi</strong>, an enthusiastic corgi with spectacles 
                and a green bandana, embodies our values: warmth, curiosity, and a love for learning together.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex flex-col gap-1 p-4 rounded-xl bg-background border border-border">
                <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>Inclusive</span>
                <span className="text-sm text-muted-foreground">All backgrounds welcome</span>
              </div>
              <div className="flex flex-col gap-1 p-4 rounded-xl bg-background border border-border">
                <span className="text-2xl font-bold text-accent" style={{ fontFamily: 'var(--font-heading)' }}>Curious</span>
                <span className="text-sm text-muted-foreground">Always learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

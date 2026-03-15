import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Coffee, Users, Lightbulb, Heart, BookOpen, MessageCircle } from "lucide-react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Story",
  description: "The origin story of Kognitiam - how a late-night conversation, a viral essay, and a crumb of kaya toast gave birth to a Singapore AI community.",
  openGraph: {
    title: "Our Story | Kognitiam",
    description: "The origin story of Kognitiam - how a late-night conversation, a viral essay, and a crumb of kaya toast gave birth to a Singapore AI community.",
    url: "https://kognitiam.sg/lore",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Kognitiam - Where Coffee Meets Cognition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | Kognitiam",
    description: "The origin story of Kognitiam - how a late-night conversation, a viral essay, and a crumb of kaya toast gave birth to a Singapore AI community.",
    images: ["/images/og.png"],
  },
}

export default function LorePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Kognitiam Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
              Kognitiam
            </span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 
              className="mb-6 text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our Origin Story
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              How a late-night conversation, a viral essay, and a crumb of kaya toast gave birth to a community.
            </p>
          </div>
        </div>
      </section>

      {/* The Beginning */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 flex justify-center">
              <Image
                src="/images/og.png"
                alt="Kognitiam community gathering"
                width={800}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="prose prose-lg mx-auto">
              <h2 
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                A Disturbance in the Night
              </h2>
              <p className="text-foreground leading-relaxed">
                Kognitiam did not begin as a polished brand idea. It began as a disturbance.
              </p>
              <p className="text-foreground leading-relaxed">
                On a quiet night in Singapore, five friends — Sukumar, Praneeth, Charles, Zi Qiang, and Gita — 
                found themselves pulled into a serious conversation that felt impossible to postpone. The spark 
                was a viral essay by Matt Shumer, &quot;Something Big Is Happening,&quot; which framed recent AI progress 
                not as a distant trend, but as an immediate change in the structure of work itself.
              </p>
              <p className="text-foreground leading-relaxed">
                That night, the conversation was not theoretical. <strong>It was personal.</strong>
              </p>
              <p className="text-foreground leading-relaxed">
                They asked the questions that many people were privately asking but rarely saying aloud with full 
                honesty. Can we keep our jobs? What happens to software work when models can code, reason, and 
                increasingly assist in building the next generation of themselves? What happens to knowledge work 
                when intelligence becomes abundant, fast, and machine-mediated?
              </p>
              
              <blockquote className="border-l-4 border-secondary bg-card p-6 my-8 rounded-r-lg">
                <p className="text-lg italic text-foreground m-0">
                  Fear entered the room first. Then worry. Then urgency.
                </p>
              </blockquote>

              <p className="text-foreground leading-relaxed">
                The five of them were not alone in feeling it. Across the world, and especially in Singapore, a 
                familiar pattern was emerging: people were reading the headlines, trying the tools, watching demos, 
                and sensing that something fundamental had shifted. Yet most responses still fell into two extremes. 
                One camp dismissed AI as hype. The other surrendered to it as destiny.
              </p>
              <p className="text-foreground leading-relaxed font-semibold text-primary">
                Neither felt sufficient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Founding */}
      <section className="bg-card py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg mx-auto">
              <h2 
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                The First Act of Organization
              </h2>
              <p className="text-foreground leading-relaxed">
                What Singapore needed was not panic. It needed preparation. Not passive consumption, but participation. 
                Not isolated anxiety, but a revolution of knowledge.
              </p>
              <p className="text-foreground leading-relaxed">
                That conviction took form almost immediately.
              </p>
              <p className="text-foreground leading-relaxed">
                Sukumar opened WhatsApp and created a group. He gave it a plain, almost utilitarian name: 
                &quot;AI paper reading group.&quot; It was not yet a brand. It was a rally point. A first act of organization. 
                A small human refusal to be outpaced by events.
              </p>
              <p className="text-foreground leading-relaxed">
                In the first message, he laid out the thesis with clarity and without ceremony: this group would 
                discuss AI research papers every week, talk through what the industry was actually paying attention to, 
                look at what firms like a16z and YC were backing, and gather like-minded people who wanted to move 
                faster than the market rather than be displaced by it.
              </p>
              
              <blockquote className="border-l-4 border-accent bg-background p-6 my-8 rounded-r-lg">
                <p className="text-lg italic text-foreground m-0">
                  The subtext was simple: if intelligence was becoming cheaper, then human learning had to become more communal.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 flex justify-center">
              <Image
                src="/images/kogi-coffee.png"
                alt="Kogi with coffee"
                width={300}
                height={300}
                className="drop-shadow-lg"
              />
            </div>
            
            <div className="prose prose-lg mx-auto">
              <h2 
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                The Missing Frame: Coffee
              </h2>
              <p className="text-foreground leading-relaxed">
                And then there was the one thing that made it all human. <strong>Coffee.</strong>
              </p>
              <p className="text-foreground leading-relaxed">
                Coffee was the constant between them. Coffee as ritual. Coffee as pause. Coffee as invitation. 
                Coffee as the social technology that makes difficult conversations possible. In Singapore, that 
                instinct has a cultural home: the kopitiam. Not merely a place to drink, but a place to gather, 
                observe, argue, reflect, and return to.
              </p>
              <p className="text-foreground leading-relaxed">
                That was the missing frame.
              </p>
              <p className="text-foreground leading-relaxed">
                What if this was not just a reading group? What if it was a kopitiam for cognition? A place where 
                people did not merely consume AI news, but metabolized it together? A place where knowledge stopped 
                being individual defense and became shared infrastructure?
              </p>
              <p className="text-foreground leading-relaxed font-semibold text-accent">
                That idea became Kognitiam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 
              className="mb-8 text-3xl font-bold text-primary-foreground md:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Kognitiam = Cognition + Kopitiam
            </h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              The name captures both halves of the founding insight. Intelligence, yes — but not as something 
              distant, sterile, or owned only by labs and firms. Intelligence as something social. Local. 
              Discussed over cups on a shared table. Serious ideas in a familiar setting. High stakes, low ego.
            </p>
          </div>
        </div>
      </section>

      {/* Kogi's Story */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 flex justify-center">
              <Image
                src="/images/kogi-thinking.png"
                alt="Kogi thinking"
                width={280}
                height={280}
                className="drop-shadow-lg"
              />
            </div>
            
            <div className="prose prose-lg mx-auto">
              <h2 
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Meet Kogi — The Quiet Guardian
              </h2>
              <p className="text-foreground leading-relaxed">
                Kogi is the quiet guardian of Kognitiam.
              </p>
              <p className="text-foreground leading-relaxed">
                He is a small, low-slung kopitiam corgi with a warm caramel-and-cream coat, bright alert ears, 
                round intelligent eyes, and an expression that always seems to sit somewhere between curiosity 
                and concern. He is approachable without being childish, playful without becoming chaotic, and 
                observant in the way good communities are observant.
              </p>
              
              <h3 
                className="text-2xl font-bold text-primary mt-12"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                How Kogi Arrived
              </h3>
              <p className="text-foreground leading-relaxed">
                Before Kognitiam had a name, before it had a visual identity, before anyone thought of building 
                a brand around collective intelligence, there was just a late-night conversation and a table full 
                of worried people.
              </p>
              <p className="text-foreground leading-relaxed">
                The mood was serious. Not theatrical, not performative — just genuinely heavy.
              </p>
              <p className="text-foreground leading-relaxed">
                At some point in the conversation, a tiny piece of kaya toast fell from the table. A corgi appeared.
              </p>
              
              <blockquote className="border-l-4 border-secondary bg-card p-6 my-8 rounded-r-lg">
                <p className="text-lg italic text-foreground m-0">
                  No one had seen him come in. He simply materialised at the edge of the gathering, drawn not by 
                  grand ideas, but by a crumb. He stood there with complete confidence, short legs planted, ears 
                  upright, staring at the table as though he had every right to be included in the discussion.
                </p>
              </blockquote>

              <p className="text-foreground leading-relaxed">
                Someone laughed. Then someone else did. The room changed. The fear did not disappear, but it loosened. 
                The conversation became breathable again.
              </p>
              <p className="text-foreground leading-relaxed">
                The little corgi stayed nearby through the rest of the session — weaving around chairs, settling 
                under the table, occasionally lifting his head whenever voices became animated, as if he too were 
                tracking the signal in the room. Over time, the group began to joke that he had become their silent 
                moderator: present whenever the conversation mattered, calm whenever the room became too tense, and 
                mysteriously attentive whenever a genuinely good idea was spoken aloud.
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                He kept returning.
              </p>
              <p className="text-foreground leading-relaxed">
                He came into their lives the same way many important things do: accidentally, locally, and at 
                exactly the right time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-card py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 
              className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our Mission & Vision
            </h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2 border-primary/20 bg-background">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 
                    className="mb-4 text-xl font-bold text-primary"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Our Mission
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    To build a neighbourhood commons where people can collectively understand, discuss, and adapt 
                    to the rise of AI through shared learning, open conversation, and community rituals over coffee.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-accent/20 bg-background">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 
                    className="mb-4 text-xl font-bold text-accent"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Our Vision
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    A future where communities, not just institutions, shape how intelligence enters everyday life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 
              className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our Core Values
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: "Collective Intelligence",
                  description: "We learn faster together."
                },
                {
                  icon: MessageCircle,
                  title: "Curiosity Over Ego",
                  description: "Good questions matter more than status displays."
                },
                {
                  icon: BookOpen,
                  title: "Technical Yet Accessible",
                  description: "The ideas can be deep without the room becoming exclusionary."
                },
                {
                  icon: Coffee,
                  title: "Local Roots",
                  description: "Shaped by Singapore's social texture, not imported startup aesthetics."
                },
                {
                  icon: Lightbulb,
                  title: "Agency Through Learning",
                  description: "The answer to disruption is disciplined, communal adaptation."
                },
                {
                  icon: Heart,
                  title: "Human Solidarity",
                  description: "Technological change is easier to meet when people do not face it alone."
                },
              ].map((value, index) => (
                <Card key={index} className="border border-border bg-card">
                  <CardContent className="p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 
                      className="mb-2 text-lg font-bold text-foreground"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 
              className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              More Than an AI Meetup
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/90 leading-relaxed">
              Kognitiam was born from unease, but it was never meant to be a doom circle. Its purpose was not 
              to romanticize fear. Its purpose was to organize response. In that sense, Kognitiam is more than 
              an AI meetup. It is a local answer to a global rupture. A Singapore-born commons for people who 
              sensed that something was changing, and chose not to panic alone.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#join">
                Join the Community
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="Kognitiam Logo"
                width={32}
                height={32}
              />
              <span className="font-semibold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                Kognitiam
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Where coffee meets cognition. Singapore.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

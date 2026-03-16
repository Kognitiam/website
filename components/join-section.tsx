import Link from "next/link"
import { Github, MessageCircle, Mail, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JoinSection() {
  return (
    <section id="join" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Get Involved</span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Pull Up a Chair
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Whether you are an AI researcher, engineer, student, or simply curious about the field, 
            there is a seat for you at our table. Join our growing community and be part of the 
            conversation that shapes the future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link href="https://github.com/kognitiam" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                Join on GitHub
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="https://t.me/kognitiam" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Telegram
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLScXJ6lHpR8FfeWrKSGtno_gLkabA6XNCzh26mfkgnDP3Th2Jw/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <ClipboardList className="mr-2 h-5 w-5" />
                Express Interest
              </Link>
            </Button>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2 pt-4">
            <Mail className="h-4 w-4 text-primary-foreground/60" />
            <span className="text-sm text-primary-foreground/60">
              Or reach out at <a href="mailto:kogi@kognitiam.sg" className="underline hover:text-primary-foreground">kogi@kognitiam.sg</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

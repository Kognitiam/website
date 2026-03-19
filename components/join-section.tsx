import Link from "next/link"
import { Github, Mail, ClipboardList, Linkedin, Instagram } from "lucide-react"
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

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <Link href="https://github.com/kognitiam" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://t.me/kognitiam" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Telegram">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </Link>
            <Link href="https://x.com/Kognitiam" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="X (Twitter)">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link href="https://www.linkedin.com/company/kognitiam" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="https://www.instagram.com/kognitiam/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="https://www.youtube.com/@kognitiam-videos" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="YouTube">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
          </div>

          {/* Request Invite */}
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScXJ6lHpR8FfeWrKSGtno_gLkabA6XNCzh26mfkgnDP3Th2Jw/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
              <ClipboardList className="mr-2 h-5 w-5" />
              Join the community!
            </Link>
          </Button>

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

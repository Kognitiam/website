import Link from "next/link"
import Image from "next/image"
import { Coffee, Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Kognitiam Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <span className="font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                KOGNITIAM
              </span>
              <span className="text-xs text-muted-foreground">Where Coffee Meets Cognition</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
            <Link href="#features" className="hover:text-primary transition-colors">What We Do</Link>
            <Link href="#community" className="hover:text-primary transition-colors">Community</Link>
            <Link href="#join" className="hover:text-primary transition-colors">Join Us</Link>
          </nav>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Coffee className="h-4 w-4 text-primary" />
            <span>and</span>
            <Brain className="h-4 w-4 text-primary" />
            <span>in Singapore</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>2026 Kognitiam. A community for curious minds.</p>
        </div>
      </div>
    </footer>
  )
}

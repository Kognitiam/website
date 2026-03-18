"use client"

import { useState } from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Our Story", href: "/lore" },
  { label: "Events", href: "/events" },
  { label: "What We Do", href: "#features" },
  { label: "Community", href: "#community" },
  { label: "Join Us", href: "#join" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="Kognitiam Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
            KOGNITIAM
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#join">Get Involved</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background p-6">
            <div className="flex items-center gap-2 mb-8">
              <Image
                src="/images/logo.svg"
                alt="Kognitiam Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                KOGNITIAM
              </span>
            </div>
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-foreground transition-colors hover:text-primary py-1"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                <Link href="#join" onClick={() => setIsOpen(false)}>Get Involved</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ExternalLink, Calendar, Clock, BookOpen } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { format, isPast, isToday } from "date-fns";
import { getEvents, KognEvent } from "@/lib/events";
import { resolveImageUrl } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function toDate(ts: Timestamp | Date): Date {
  return ts instanceof Date ? ts : ts.toDate();
}

function EventCard({ event }: { event: KognEvent }) {
  const date = toDate(event.date);
  const past = isPast(date) && !isToday(date);

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200">
      {/* Image — links to detail page */}
      <Link href={`/events/${event.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolveImageUrl(event.imageUrl)}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/20">
              <Calendar className="h-12 w-12 text-secondary" />
            </div>
          )}
          {past && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <span className="text-sm font-semibold text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border">
                Past Event
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Date & time */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {format(date, "EEE, d MMM yyyy")}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {format(date, "h:mm a")}
          </span>
        </div>

        {/* Title — links to detail page */}
        <Link href={`/events/${event.id}`}>
          <h3
            className="text-lg font-bold text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {event.title}
          </h3>
        </Link>

        {/* Location */}
        {event.location && (
          <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent" />
            {event.locationUrl ? (
              <a
                href={event.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors line-clamp-1"
              >
                {event.location}
              </a>
            ) : (
              <span className="line-clamp-1">{event.location}</span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {event.description}
        </p>

        {/* CTA */}
        {!past && event.lumaUrl && (
          <a
            href={event.lumaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1"
          >
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              Register
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        )}
        {past && (
          <Link href={`/events/${event.id}`} className="mt-1">
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 border-primary/40 text-primary hover:bg-primary/10"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Read Recap
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 py-20 text-center">
      <Calendar className="h-12 w-12 text-muted-foreground/40" />
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<KognEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = events.filter((e) => {
    const d = toDate(e.date);
    return d >= now || isToday(d);
  });
  const past = events.filter((e) => {
    const d = toDate(e.date);
    return isPast(d) && !isToday(d);
  });

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center flex flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="border-primary/40 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1"
          >
            Community Gatherings
          </Badge>
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Events at <span className="text-primary">Kognitiam</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Coffee, conversation, and collective learning — in person. Join us
            at our next session.
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="pb-20 container mx-auto px-4 md:px-6">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-8 bg-muted">
            <TabsTrigger value="upcoming" className="gap-2">
              Upcoming
              {upcoming.length > 0 && (
                <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0 h-5">
                  {upcoming.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card animate-pulse"
                  >
                    <div className="aspect-[16/9] bg-muted rounded-t-2xl" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.length > 0 ? (
                  upcoming.map((e) => <EventCard key={e.id} event={e} />)
                ) : (
                  <EmptyState label="No upcoming events — check back soon!" />
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.length > 0 ? (
                [...past].reverse().map((e) => <EventCard key={e.id} event={e} />)
              ) : (
                <EmptyState label="No past events yet." />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </main>
  );
}

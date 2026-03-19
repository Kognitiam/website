"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { format, isPast, isToday } from "date-fns";
import { ArrowLeft, Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { getEvent, KognEvent } from "@/lib/events";
import { getBlog, EventBlog, ContentBlock } from "@/lib/blog";
import { resolveImageUrl } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── Block renderers ────────────────────────────────────────────────────────────

function TextBlock({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="text-foreground leading-relaxed text-[1.05rem] mb-4">{children}</p>
        ),
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-foreground mt-6 mb-3">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold text-foreground mt-5 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">{children}</h3>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4 text-foreground text-[1.05rem]">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-foreground text-[1.05rem]">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a href={href} className="underline text-foreground hover:opacity-70" target="_blank" rel="noopener noreferrer">{children}</a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground my-4">{children}</blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-muted rounded px-1 py-0.5 text-sm font-mono">{children}</code>
        ),
        hr: () => <hr className="my-6 border-muted" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function ImageBlock({ url, caption }: { url: string; caption?: string }) {
  return (
    <figure className="space-y-2 my-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveImageUrl(url)}
        alt={caption ?? ""}
        className="w-full rounded-2xl object-cover"
      />
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function YoutubeBlock({ videoId, caption }: { videoId: string; caption?: string }) {
  return (
    <figure className="space-y-2 my-2">
      <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderBlock(block: ContentBlock, i: number) {
  if (block.type === "text") return <TextBlock key={i} content={block.content} />;
  if (block.type === "image") return <ImageBlock key={i} url={block.url} caption={block.caption} />;
  if (block.type === "youtube") return <YoutubeBlock key={i} videoId={block.videoId} caption={block.caption} />;
  return null;
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<KognEvent | null>(null);
  const [blog, setBlog] = useState<EventBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [ev, bl] = await Promise.all([getEvent(id), getBlog(id)]);
      setEvent(ev);
      setBlog(bl);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-40">
          <span className="text-muted-foreground text-sm">Loading…</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="text-muted-foreground">Event not found.</p>
          <Link href="/events">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Events
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const date = event.date.toDate();
  const past = isPast(date) && !isToday(date);
  const hasBlog = past && blog && blog.blocks.length > 0;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero image */}
      {event.imageUrl && (
        <div className="relative w-full h-[45vh] md:h-[58vh] overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveImageUrl(event.imageUrl)}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        </div>
      )}

      {/* Content column */}
      <div
        className={`max-w-2xl mx-auto px-4 md:px-6 ${
          event.imageUrl ? "-mt-12 relative z-10" : "pt-12"
        } pb-4`}
      >
        {/* Back link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Events
        </Link>

        {/* Status badge */}
        <div className="mb-4">
          {past ? (
            <Badge variant="outline" className="text-muted-foreground border-border">
              Past Event
            </Badge>
          ) : (
            <Badge className="bg-accent text-accent-foreground">
              Upcoming
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold text-foreground mb-5 text-balance leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {event.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-col gap-2.5 mb-6 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              {format(date, "EEEE, d MMMM yyyy")}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              {format(date, "h:mm a")}
            </span>
          </div>
          {event.location && (
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent shrink-0" />
              {event.locationUrl ? (
                <a
                  href={event.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors underline underline-offset-2"
                >
                  {event.location}
                </a>
              ) : (
                event.location
              )}
            </span>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-muted-foreground leading-relaxed mb-8 text-base">
            {event.description}
          </p>
        )}

        {/* Register CTA (upcoming only) */}
        {!past && event.lumaUrl && (
          <a href={event.lumaUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              Register for this Event
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        )}

        {/* Blog recap */}
        {hasBlog && (
          <>
            <div className="my-10 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Event Recap
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-8">
              {blog!.blocks.map((block, i) => renderBlock(block, i))}
            </div>
          </>
        )}

        {/* Past event with no recap yet */}
        {past && !hasBlog && (
          <p className="text-sm text-muted-foreground italic mt-2">
            Event recap coming soon.
          </p>
        )}
      </div>

      <div className="pb-20" />
      <Footer />
    </main>
  );
}

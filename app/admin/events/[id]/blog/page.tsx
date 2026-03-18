"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  ChevronUp,
  ChevronDown,
  Type,
  ImageIcon,
  Youtube,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { getEvent, KognEvent } from "@/lib/events";
import { getBlog, saveBlog, ContentBlock } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// ── Helpers ────────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function extractVideoId(input: string): string {
  const short = input.match(/youtu\.be\/([^?&\s]+)/);
  if (short) return short[1];
  const long = input.match(/[?&]v=([^?&\s]+)/);
  if (long) return long[1];
  const embed = input.match(/embed\/([^?&\s]+)/);
  if (embed) return embed[1];
  return input.trim();
}

// ── Types ──────────────────────────────────────────────────────────────────────

type EditorBlock = ContentBlock & { _id: string };

// ── Block editor card ──────────────────────────────────────────────────────────

function BlockCard({
  block,
  index,
  total,
  onChange,
  onDelete,
  onMove,
}: {
  block: EditorBlock;
  index: number;
  total: number;
  onChange: (id: string, patch: Partial<ContentBlock>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  const icons = {
    text: <Type className="h-4 w-4 text-primary" />,
    image: <ImageIcon className="h-4 w-4 text-accent" />,
    youtube: <Youtube className="h-4 w-4 text-destructive" />,
  };

  const previewVideoId =
    block.type === "youtube" ? extractVideoId(block.videoId) : "";

  return (
    <Card className="border-border">
      <CardContent className="pt-4 pb-5 space-y-4">
        {/* Block header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icons[block.type]}
            <span className="text-sm font-semibold text-foreground capitalize">
              {block.type}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={index === 0}
              onClick={() => onMove(block._id, -1)}
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={index === total - 1}
              onClick={() => onMove(block._id, 1)}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(block._id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Text block */}
        {block.type === "text" && (
          <Textarea
            placeholder="Write your content here… (double line-break = new paragraph)"
            rows={6}
            className="resize-y text-sm"
            value={block.content}
            onChange={(e) => onChange(block._id, { content: e.target.value })}
          />
        )}

        {/* Image block */}
        {block.type === "image" && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input
                placeholder="https://..."
                value={block.url}
                onChange={(e) => onChange(block._id, { url: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>
                Caption{" "}
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                placeholder="Image caption"
                value={block.caption ?? ""}
                onChange={(e) =>
                  onChange(block._id, { caption: e.target.value })
                }
              />
            </div>
            {block.url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={block.url}
                alt="Preview"
                className="rounded-xl max-h-52 w-full object-cover border border-border"
              />
            )}
          </div>
        )}

        {/* YouTube block */}
        {block.type === "youtube" && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>YouTube URL</Label>
              <Input
                placeholder="https://youtu.be/… or https://youtube.com/watch?v=…"
                value={block.videoId}
                onChange={(e) =>
                  onChange(block._id, { videoId: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label>
                Caption{" "}
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                placeholder="Video caption"
                value={block.caption ?? ""}
                onChange={(e) =>
                  onChange(block._id, { caption: e.target.value })
                }
              />
            </div>
            {previewVideoId && (
              <div className="aspect-video rounded-xl overflow-hidden border border-border">
                <iframe
                  src={`https://www.youtube.com/embed/${previewVideoId}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AdminBlogEditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<KognEvent | null>(null);
  const [blocks, setBlocks] = useState<EditorBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    async function load() {
      const [ev, blog] = await Promise.all([getEvent(id), getBlog(id)]);
      setEvent(ev);
      if (blog) {
        setBlocks(blog.blocks.map((b) => ({ ...b, _id: uid() })));
      }
      setLoading(false);
    }
    load();
  }, [id]);

  function addBlock(type: "text" | "image" | "youtube") {
    const base = { _id: uid() };
    setBlocks((prev) => [
      ...prev,
      type === "text"
        ? { ...base, type: "text", content: "" }
        : type === "image"
        ? { ...base, type: "image", url: "", caption: "" }
        : { ...base, type: "youtube", videoId: "", caption: "" },
    ]);
  }

  function updateBlock(id: string, patch: Partial<ContentBlock>) {
    setBlocks((prev) =>
      prev.map((b) => (b._id === id ? { ...b, ...patch } : b))
    );
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b._id !== id));
  }

  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b._id === id);
      if (idx < 0) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Strip local _id and resolve youtube video IDs before saving
      const clean: ContentBlock[] = blocks.map(({ _id, ...rest }) => {
        const block = rest as ContentBlock;
        if (block.type === "youtube") {
          return { ...block, videoId: extractVideoId(block.videoId) };
        }
        return block;
      });
      await saveBlog(id, clean);
      // Re-sync blocks with resolved IDs
      setBlocks(clean.map((b) => ({ ...b, _id: uid() })));
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-muted-foreground text-sm">Loading…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => router.push("/admin/events")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Blog recap for</p>
              <h1
                className="text-base font-bold text-foreground truncate"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {event?.title ?? "Event"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href={`/events/${id}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </Button>
            </Link>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {savedMsg ? "Saved!" : saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {/* Empty state */}
        {blocks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm border border-dashed border-border rounded-2xl">
            No content blocks yet. Add one below.
          </div>
        )}

        {/* Blocks */}
        {blocks.map((block, idx) => (
          <BlockCard
            key={block._id}
            block={block}
            index={idx}
            total={blocks.length}
            onChange={updateBlock}
            onDelete={deleteBlock}
            onMove={moveBlock}
          />
        ))}

        {/* Add block buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => addBlock("text")}
            className="gap-2"
          >
            <Type className="h-4 w-4" />
            Add Text
          </Button>
          <Button
            variant="outline"
            onClick={() => addBlock("image")}
            className="gap-2"
          >
            <ImageIcon className="h-4 w-4" />
            Add Image
          </Button>
          <Button
            variant="outline"
            onClick={() => addBlock("youtube")}
            className="gap-2"
          >
            <Youtube className="h-4 w-4" />
            Add YouTube
          </Button>
        </div>
      </div>
    </div>
  );
}

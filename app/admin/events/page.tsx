"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  ArrowLeft,
  MapPin,
  ExternalLink,
  PenLine,
} from "lucide-react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  KognEvent,
} from "@/lib/events";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// ── Types & helpers ────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: "",
  description: "",
  imageUrl: "",
  date: "",
  location: "",
  locationUrl: "",
  lumaUrl: "",
};

type FormState = typeof EMPTY_FORM;

function toDatetimeLocal(ts: Timestamp): string {
  return format(ts.toDate(), "yyyy-MM-dd'T'HH:mm");
}

function buildPayload(form: FormState) {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    imageUrl: form.imageUrl.trim(),
    date: Timestamp.fromDate(new Date(form.date)),
    // Pass empty string for cleared optional fields so createEvent omits them
    // and updateEvent converts them to deleteField().
    location: form.location.trim() || undefined,
    locationUrl: form.locationUrl.trim() || undefined,
    lumaUrl: form.lumaUrl.trim() || undefined,
  };
}

// ── Shared form fields ─────────────────────────────────────────────────────────

function EventFormFields({
  form,
  onChange,
}: {
  form: FormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2 space-y-1.5">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Paper Reading: Attention Is All You Need"
          value={form.title}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="date">
          Date & Time <span className="text-destructive">*</span>
        </Label>
        <Input
          id="date"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="location">
          Location{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <Input
          id="location"
          name="location"
          placeholder="The Coffee Academics, Scotts Square"
          value={form.location}
          onChange={onChange}
        />
      </div>

      <div className="sm:col-span-2 space-y-1.5">
        <Label htmlFor="imageUrl">Event Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          placeholder="https://..."
          value={form.imageUrl}
          onChange={onChange}
        />
      </div>

      <div className="sm:col-span-2 space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="What's this event about? Who should come?"
          rows={3}
          value={form.description}
          onChange={onChange}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="locationUrl">
          Location URL{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <Input
          id="locationUrl"
          name="locationUrl"
          placeholder="Google Maps link"
          value={form.locationUrl}
          onChange={onChange}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lumaUrl">
          Registration URL{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <Input
          id="lumaUrl"
          name="lumaUrl"
          placeholder="lu.ma/your-event"
          value={form.lumaUrl}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AdminEventsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [events, setEvents] = useState<KognEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [createForm, setCreateForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Edit modal
  const [editingEvent, setEditingEvent] = useState<KognEvent | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [updating, setUpdating] = useState(false);
  const [editError, setEditError] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchEvents() {
    setLoading(true);
    try {
      setEvents(await getEvents());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  // ── Create ───────────────────────────────────────────────────────────────────

  function handleCreateChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    if (!createForm.title || !createForm.date) {
      setCreateError("Title and date are required.");
      return;
    }
    setCreating(true);
    try {
      await createEvent(buildPayload(createForm));
      setCreateForm(EMPTY_FORM);
      await fetchEvents();
    } catch {
      setCreateError("Failed to create event. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  // ── Edit modal ───────────────────────────────────────────────────────────────

  function openEdit(ev: KognEvent) {
    setEditingEvent(ev);
    setEditForm({
      title: ev.title,
      description: ev.description ?? "",
      imageUrl: ev.imageUrl ?? "",
      date: toDatetimeLocal(ev.date),
      location: ev.location ?? "",
      locationUrl: ev.locationUrl ?? "",
      lumaUrl: ev.lumaUrl ?? "",
    });
    setEditError("");
  }

  function closeEdit() {
    setEditingEvent(null);
    setEditForm(EMPTY_FORM);
    setEditError("");
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingEvent) return;
    setEditError("");
    if (!editForm.title || !editForm.date) {
      setEditError("Title and date are required.");
      return;
    }
    setUpdating(true);
    try {
      await updateEvent(editingEvent.id, buildPayload(editForm));
      await fetchEvents();
      closeEdit();
    } catch {
      setEditError("Failed to update event. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  // ── Delete ───────────────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    setDeletingId(id);
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Manage Events
            </h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* Create form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle
              className="flex items-center gap-2 text-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <Plus className="h-5 w-5 text-accent" />
              Create New Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-5">
              <EventFormFields form={createForm} onChange={handleCreateChange} />
              {createError && (
                <p className="text-sm text-destructive">{createError}</p>
              )}
              <Button
                type="submit"
                disabled={creating}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {creating ? "Creating…" : "Create Event"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Events list */}
        <div>
          <h2
            className="text-lg font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            All Events
          </h2>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No events yet. Create one above.
            </p>
          ) : (
            <div className="space-y-3">
              {[...events].reverse().map((ev) => {
                const date = ev.date.toDate();
                const past = date < new Date();
                return (
                  <div
                    key={ev.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                  >
                    {/* Thumbnail */}
                    {ev.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ev.imageUrl}
                        alt={ev.title}
                        className="w-20 h-14 object-cover rounded-lg shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <CalendarDays className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="font-semibold text-foreground truncate"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {ev.title}
                        </span>
                        {past && (
                          <Badge
                            variant="outline"
                            className="text-xs text-muted-foreground"
                          >
                            Past
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {format(date, "d MMM yyyy, h:mm a")}
                        </span>
                        {ev.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {ev.location}
                          </span>
                        )}
                        {ev.lumaUrl && (
                          <a
                            href={ev.lumaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Registration link
                          </a>
                        )}
                      </div>
                      {ev.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {ev.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        title="Edit event"
                        onClick={() => openEdit(ev)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {past && (
                        <Link href={`/admin/events/${ev.id}/blog`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10"
                            title="Edit blog recap"
                          >
                            <PenLine className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        disabled={deletingId === ev.id}
                        onClick={() => handleDelete(ev.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      <Dialog open={!!editingEvent} onOpenChange={(open) => !open && closeEdit()}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
              Edit Event
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-5">
            <EventFormFields form={editForm} onChange={handleEditChange} />
            {editError && (
              <p className="text-sm text-destructive">{editError}</p>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeEdit}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updating}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {updating ? "Saving…" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  doc,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface KognEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Timestamp;
  location?: string;
  locationUrl?: string;
  lumaUrl?: string;
  createdAt: Timestamp;
}

export async function getEvents(): Promise<KognEvent[]> {
  const q = query(collection(db, "events"), orderBy("date", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as KognEvent));
}

/** Remove keys whose value is undefined — Firestore rejects them */
function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}

export async function createEvent(
  data: Omit<KognEvent, "id" | "createdAt">
): Promise<void> {
  await addDoc(collection(db, "events"), {
    ...stripUndefined(data),
    createdAt: serverTimestamp(),
  });
}

export async function updateEvent(
  id: string,
  data: Omit<KognEvent, "id" | "createdAt">
): Promise<void> {
  // Use deleteField() for optional fields that were cleared so they're
  // actually removed from the document rather than left with the old value.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateDoc(doc(db, "events", id), {
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    date: data.date,
    location: data.location || deleteField(),
    locationUrl: data.locationUrl || deleteField(),
    lumaUrl: data.lumaUrl || deleteField(),
  } as any);
}

export async function getEvent(id: string): Promise<KognEvent | null> {
  const snap = await getDoc(doc(db, "events", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as KognEvent;
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, "events", id));
}

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface TextBlock {
  type: "text";
  content: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  caption?: string;
}

export interface YoutubeBlock {
  type: "youtube";
  videoId: string;
  caption?: string;
}

export type ContentBlock = TextBlock | ImageBlock | YoutubeBlock;

export interface EventBlog {
  blocks: ContentBlock[];
}

export async function getBlog(eventId: string): Promise<EventBlog | null> {
  const snap = await getDoc(doc(db, "blogs", eventId));
  if (!snap.exists()) return null;
  return snap.data() as EventBlog;
}

export async function saveBlog(
  eventId: string,
  blocks: ContentBlock[]
): Promise<void> {
  await setDoc(doc(db, "blogs", eventId), {
    blocks,
    updatedAt: serverTimestamp(),
  });
}

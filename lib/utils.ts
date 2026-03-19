import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Strips markdown syntax and returns plain text suitable for compact previews.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, "")           // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")     // bold
    .replace(/\*(.+?)\*/g, "$1")         // italic *
    .replace(/_(.+?)_/g, "$1")           // italic _
    .replace(/~~(.+?)~~/g, "$1")         // strikethrough
    .replace(/`(.+?)`/g, "$1")           // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // links
    .replace(/^>\s+/gm, "")             // blockquotes
    .replace(/^[-*+]\s+/gm, "")         // unordered list markers
    .replace(/^\d+\.\s+/gm, "")         // ordered list markers
    .replace(/^-{3,}$/gm, "")           // horizontal rules
    .replace(/\n+/g, " ")               // collapse newlines to spaces
    .trim();
}

/**
 * Transforms Google Drive sharing URLs into proxy URLs to bypass CORS restrictions.
 * Handles formats like:
 *   https://drive.google.com/file/d/FILE_ID/view?...
 *   https://drive.google.com/open?id=FILE_ID
 *   https://drive.google.com/uc?id=FILE_ID
 */
export function resolveImageUrl(url: string): string {
  if (!url) return url;

  let driveId: string | null = null;

  // Match /file/d/FILE_ID/
  const fileMatch = url.match(/\/file\/d\/([^/?&]+)/);
  if (fileMatch) driveId = fileMatch[1];

  // Match ?id=FILE_ID or &id=FILE_ID (open or uc links)
  if (!driveId) {
    const idMatch = url.match(/[?&]id=([^?&]+)/);
    if (idMatch && url.includes("drive.google.com")) driveId = idMatch[1];
  }

  if (driveId) {
    const directUrl = `https://drive.google.com/uc?export=view&id=${driveId}`;
    return `/api/image-proxy?url=${encodeURIComponent(directUrl)}`;
  }

  return url;
}

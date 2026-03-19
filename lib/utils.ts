import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

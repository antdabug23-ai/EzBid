import "server-only";
import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { ValidationError } from "./errors";
import { ALLOWED_DOCUMENT_TYPES, ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/constants";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

export type UploadKind = "image" | "document";

/**
 * Validates and stores an uploaded file on local disk for the MVP.
 * Returns a public URL path. Replace internals with Supabase Storage later;
 * the signature stays the same.
 */
export async function saveUploadedFile(file: File, kind: UploadKind): Promise<string> {
  if (!file || file.size === 0) {
    throw new ValidationError("No file provided.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new ValidationError("File is too large. Maximum size is 5 MB.");
  }

  const allowed = kind === "image" ? ALLOWED_IMAGE_TYPES : ALLOWED_DOCUMENT_TYPES;
  if (!allowed.includes(file.type)) {
    throw new ValidationError(
      kind === "image"
        ? "Unsupported image type. Use JPG, PNG, WEBP, or GIF."
        : "Unsupported file type. Use PDF or an image."
    );
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = EXTENSIONS[file.type] ?? "bin";
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

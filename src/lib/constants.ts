export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const ALLOWED_DOCUMENT_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  "application/pdf",
];

export const PAGE_SIZE = 20;

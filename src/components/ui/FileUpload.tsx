"use client";

import { useState, useRef } from "react";
import { Button } from "./Button";

interface FileUploadProps {
  kind: "image" | "document";
  multiple?: boolean;
  label?: string;
  onChange: (urls: string[]) => void;
  value: string[];
}

const ACCEPT: Record<FileUploadProps["kind"], string> = {
  image: "image/png,image/jpeg,image/webp,image/gif",
  document: "image/png,image/jpeg,image/webp,image/gif,application/pdf",
};

export function FileUpload({ kind, multiple = false, label, onChange, value }: FileUploadProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("kind", kind);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed.");
        uploaded.push(data.url);
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(-1));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT[kind]}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? "Uploading…" : label ?? "Upload file"}
      </Button>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      {value.length > 0 ? (
        <ul className="space-y-2">
          {value.map((url) => (
            <li
              key={url}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-brand-700 hover:underline"
              >
                {url.split("/").pop()}
              </a>
              <button
                type="button"
                onClick={() => remove(url)}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

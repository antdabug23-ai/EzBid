import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { saveUploadedFile, type UploadKind } from "@/lib/services/uploads";
import { ServiceError } from "@/lib/services/errors";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const kindRaw = String(formData.get("kind") ?? "image");
    const kind: UploadKind = kindRaw === "document" ? "document" : "image";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const url = await saveUploadedFile(file, kind);
    return NextResponse.json({ url });
  } catch (err) {
    if (err instanceof ServiceError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}

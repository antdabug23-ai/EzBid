"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Input, Field } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FileUpload } from "@/components/ui/FileUpload";
import { Alert } from "@/components/shared/states";
import { uploadVendorDocumentAction } from "@/lib/actions/documents";
import { EMPTY_FORM_STATE } from "@/lib/actions/form-state";

export function DocumentUploadForm() {
  const [state, formAction] = useFormState(uploadVendorDocumentAction, EMPTY_FORM_STATE);
  const [files, setFiles] = useState<string[]>([]);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      {state.ok && state.message ? <Alert tone="success">{state.message}</Alert> : null}
      {files.map((url) => (
        <input key={url} type="hidden" name="fileUrl" value={url} />
      ))}

      <Card>
        <CardBody className="space-y-4">
          <Field label="Document type" htmlFor="documentType" required error={err.documentType}>
            <Input
              id="documentType"
              name="documentType"
              placeholder="e.g. Business license, Insurance, Trade certification"
            />
          </Field>
          <Field label="File" hint="PDF or image, up to 5 MB." error={err.fileUrl}>
            <FileUpload kind="document" value={files} onChange={setFiles} label="Upload document" />
          </Field>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <SubmitButton pendingText="Uploading…">Submit document</SubmitButton>
      </div>
    </form>
  );
}

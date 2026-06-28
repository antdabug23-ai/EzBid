"use server";

import { redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { createJobFromFormData } from "@/lib/validations/job";
import { createCustomerJob } from "@/lib/services/jobs";
import { type FormState, toErrorState } from "./form-state";

const UNABLE_TO_CREATE_JOB = "Unable to create job right now.";

export async function createJobAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  let newJobId: string | null = null;
  try {
    const { profile } = await requireCustomer();
    const parsed = createJobFromFormData(formData);
    const job = await createCustomerJob(profile.id, parsed);
    newJobId = job.id;
  } catch (err) {
    return toErrorState(err, "createJob", UNABLE_TO_CREATE_JOB);
  }

  if (newJobId) redirect(`/customer/jobs/${newJobId}`);
  return { ok: false, error: UNABLE_TO_CREATE_JOB };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/current-user";
import { jobSchema } from "@/lib/validations/job";
import {
  addJobPhoto,
  cancelJob,
  createJob,
  markJobCompleted,
  markJobInProgress,
  updateJob,
} from "@/lib/services/jobs";
import { resolveServiceCategoryId } from "@/lib/services/categories";
import { type FormState, toErrorState } from "./form-state";

export async function createJobAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  let newJobId: string | null = null;
  try {
    const { profile } = await requireCustomer();
    const parsed = jobSchema.parse(Object.fromEntries(formData));
    const serviceCategoryId = await resolveServiceCategoryId(parsed.serviceCategoryId);
    const job = await createJob(profile.id, { ...parsed, serviceCategoryId });

    const photoUrls = formData.getAll("photoUrls").map(String).filter(Boolean);
    for (const url of photoUrls) {
      await addJobPhoto(profile.id, job.id, url);
    }
    newJobId = job.id;
  } catch (err) {
    return toErrorState(err);
  }
  revalidatePath("/customer/jobs");
  redirect(`/customer/jobs/${newJobId}`);
}

export async function updateJobAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const jobId = String(formData.get("jobId") ?? "");
  try {
    const { profile } = await requireCustomer();
    const parsed = jobSchema.parse(Object.fromEntries(formData));
    const serviceCategoryId = await resolveServiceCategoryId(parsed.serviceCategoryId);
    await updateJob(profile.id, jobId, { ...parsed, serviceCategoryId });
  } catch (err) {
    return toErrorState(err);
  }
  revalidatePath(`/customer/jobs/${jobId}`);
  redirect(`/customer/jobs/${jobId}`);
}

export async function markInProgressAction(formData: FormData): Promise<void> {
  const jobId = String(formData.get("jobId") ?? "");
  const { profile } = await requireCustomer();
  await markJobInProgress(profile.id, jobId);
  revalidatePath(`/customer/jobs/${jobId}`);
}

export async function markCompletedAction(formData: FormData): Promise<void> {
  const jobId = String(formData.get("jobId") ?? "");
  const { profile } = await requireCustomer();
  await markJobCompleted(profile.id, jobId);
  revalidatePath(`/customer/jobs/${jobId}`);
}

export async function cancelJobAction(formData: FormData): Promise<void> {
  const jobId = String(formData.get("jobId") ?? "");
  const { profile } = await requireCustomer();
  await cancelJob(profile.id, jobId);
  revalidatePath(`/customer/jobs/${jobId}`);
}

import { z } from "zod";

export const stepSchema = z.object({
  id: z.uuidv4(),
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 1 character long")
    .max(64, "Title must be at most 64 characters long"),
});

export const fileSchema = z.object({
  id: z.uuidv4(),
  fileBlob: z.instanceof(Blob),
  fileName: z.string(),
  fileMimeType: z.string(),
  fileSize: z.number().nonnegative(),
});

export const snapshotSchema = z.object({
  id: z.uuidv4(),
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 1 character long")
    .max(64, "Title must be at most 64 characters long"),
  file: fileSchema,
  steps: z.array(stepSchema),
});

export const guideSchema = z.object({
  id: z.uuidv4(),
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 1 character long")
    .max(64, "Title must be at most 64 characters long"),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long")
    .max(256, "Description must be at most 256 characters long"),
  snapshots: z.array(snapshotSchema).min(1, "Must have at least 1 snapshot"),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  version: z.number().int().positive().default(1),
  isDeleted: z.boolean().default(false),
});

export type Guide = z.infer<typeof guideSchema>;
export type Snapshot = z.infer<typeof snapshotSchema>;
export type File = z.infer<typeof fileSchema>;
export type Step = z.infer<typeof stepSchema>;

import { z } from "zod";

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
  version: z.number().int().positive().default(1),
  isDeleted: z.boolean().default(false),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const snapshotSchema = z.object({
  id: z.uuidv4(),
  guideId: z.uuidv4(),
  text: z
    .string()
    .trim()
    .min(1, "Step text must be at least 1 character long")
    .max(64, "Step text must be at most 64 characters long"),
  order: z.number().int().nonnegative(),
});

export const stepSchema = z.object({
  id: z.uuidv4(),
  snapshotId: z.uuidv4(),
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 1 character long")
    .max(64, "Title must be at most 64 characters long"),
  order: z.number().int().nonnegative(),
});

export const fileSchema = z.object({
  id: z.uuidv4(),
  snapshotId: z.uuidv4(),
  fileName: z.string(),
  fileMimeType: z.string(),
  fileSize: z.number().nonnegative(),
  fileBlob: z.instanceof(Blob),
});

export type GuideType = z.infer<typeof guideSchema>;
export type SnapshotType = z.infer<typeof snapshotSchema>;
export type FileType = z.infer<typeof fileSchema>;
export type StepType = z.infer<typeof stepSchema>;

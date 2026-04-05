import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { logger } from "@/lib/logger";

const r2Logger = logger.child({ scope: "uploads.r2" });

function getRequiredR2Env(
  name: "R2_ACCESS_KEY_ID" | "R2_SECRET_ACCESS_KEY" | "R2_BUCKET" | "R2_ENDPOINT",
) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

function sanitizeFileName(fileName: string) {
  const normalized = fileName.trim().toLowerCase().replace(/[^a-z0-9.\-_]+/g, "-");

  return normalized.length > 0 ? normalized : "document";
}

export function getR2Bucket() {
  return getRequiredR2Env("R2_BUCKET");
}

export function getR2Client() {
  return new S3Client({
    credentials: {
      accessKeyId: getRequiredR2Env("R2_ACCESS_KEY_ID"),
      secretAccessKey: getRequiredR2Env("R2_SECRET_ACCESS_KEY"),
    },
    endpoint: getRequiredR2Env("R2_ENDPOINT"),
    forcePathStyle: true,
    region: "auto",
  });
}

export function buildObjectKey(input: {
  fileName: string;
  objectId: string;
  organizationId: string;
  prefix: string;
}) {
  const safeName = sanitizeFileName(input.fileName);

  return `org/${input.organizationId}/${input.prefix}/${input.objectId}/${safeName}`;
}

export async function createUploadUrl(input: {
  bucket: string;
  contentType: string;
  expiresInSeconds?: number;
  objectKey: string;
}) {
  const expiresInSeconds = input.expiresInSeconds ?? 60 * 5;

  r2Logger.debug("Creating presigned upload URL.", {
    bucket: input.bucket,
    contentType: input.contentType,
    expiresInSeconds,
    objectKey: input.objectKey,
  });

  return getSignedUrl(
    getR2Client(),
    new PutObjectCommand({
      Bucket: input.bucket,
      ContentType: input.contentType,
      Key: input.objectKey,
    }),
    {
      expiresIn: expiresInSeconds,
    },
  );
}

export async function createDownloadUrl(input: {
  bucket: string;
  expiresInSeconds?: number;
  objectKey: string;
  responseContentDisposition?: string;
}) {
  const expiresInSeconds = input.expiresInSeconds ?? 60 * 5;

  return getSignedUrl(
    getR2Client(),
    new GetObjectCommand({
      Bucket: input.bucket,
      Key: input.objectKey,
      ResponseContentDisposition: input.responseContentDisposition,
    }),
    {
      expiresIn: expiresInSeconds,
    },
  );
}

export async function readObjectBytes(input: {
  bucket: string;
  objectKey: string;
}) {
  const response = await getR2Client().send(
    new GetObjectCommand({
      Bucket: input.bucket,
      Key: input.objectKey,
    }),
  );

  const body = response.Body;

  if (!body) {
    throw new Error("R2 object body was empty.");
  }

  if ("transformToByteArray" in body && typeof body.transformToByteArray === "function") {
    return body.transformToByteArray();
  }

  throw new Error("R2 object body could not be converted to bytes.");
}

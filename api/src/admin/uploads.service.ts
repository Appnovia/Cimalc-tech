import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DeleteObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { CreateUploadUrlDto } from "./dto/create-upload-url.dto.js";
import { ConfirmUploadDto } from "./dto/confirm-upload.dto.js";

@Injectable()
export class UploadsService {
  private readonly accountId = process.env.R2_ACCOUNT_ID;
  private readonly accessKeyId = process.env.R2_ACCESS_KEY_ID;
  private readonly secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  private readonly bucketName = process.env.R2_BUCKET_NAME;
  private readonly publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");

  async createUploadUrl(dto: CreateUploadUrlDto) {
    if (!this.accountId || !this.accessKeyId || !this.secretAccessKey || !this.bucketName) {
      throw new InternalServerErrorException("R2 storage is not configured");
    }

    const extension = dto.fileName.split(".").pop()?.toLowerCase() || "bin";
    const folder = this.cleanFolder(dto.productId ? `products/${dto.productId}` : dto.folder || "uploads");
    const key = `${folder}/${randomUUID()}.${extension}`;
    const client = new S3Client({
      region: "auto",
      endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: dto.contentType,
      ContentLength: dto.size,
    });

    return {
      uploadUrl: await getSignedUrl(client, command, { expiresIn: 900 }),
      key,
      publicUrl: this.publicUrl ? `${this.publicUrl}/${key}` : undefined,
    };
  }

  async confirmUpload(dto: ConfirmUploadDto) {
    const client = this.client();
    const head = await client.send(new HeadObjectCommand({ Bucket: this.bucketName, Key: dto.key }));
    if (head.ContentLength !== dto.size || head.ContentType !== dto.contentType) {
      throw new InternalServerErrorException("Uploaded file metadata does not match");
    }
    return dto;
  }

  async deleteUpload(key: string) {
    await this.client().send(new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }));
    return { message: "Upload deleted" };
  }

  private client() {
    if (!this.accountId || !this.accessKeyId || !this.secretAccessKey || !this.bucketName) {
      throw new InternalServerErrorException("R2 storage is not configured");
    }
    return new S3Client({
      region: "auto",
      endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: this.accessKeyId, secretAccessKey: this.secretAccessKey },
    });
  }

  private cleanFolder(folder: string) {
    return folder.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/^\/+|\/+$/g, "") || "uploads";
  }
}

/**
 * Cloudflare R2 integration boundary.
 *
 * The backend should later return a presigned PUT URL and public object URL.
 * Keep credentials and signing exclusively on the backend; the browser should
 * only receive short-lived upload instructions.
 */
import { apiRequest } from "@/lib/api/client";

export interface R2UploadInstruction { uploadUrl: string; publicUrl: string; storageKey: string; }

export async function requestR2UploadInstruction(file: File): Promise<R2UploadInstruction> {
    const result = await apiRequest<{ uploadUrl: string; key: string; publicUrl: string }>("/admin/uploads/presign", { method: "POST", body: JSON.stringify({ fileName: file.name, contentType: file.type, folder: "products" }) });
    const upload = await fetch(result.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
    if (!upload.ok) throw new Error("Image upload failed");
    return { uploadUrl: result.uploadUrl, publicUrl: result.publicUrl, storageKey: result.key };
}

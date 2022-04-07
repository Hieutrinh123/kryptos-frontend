import { ID } from "@directus/sdk";

export interface DirectusFile {
  id: ID;
  title: string;
  description: string;
  width: number;
  height: number;
}

export const fileFields = ["id", "title", "description", "width", "height"];

export function resolveImageUrl<T extends DirectusFile | undefined | null>(
  image: T
): T extends DirectusFile ? string : undefined {
  if (!image || !image.id) {
    return undefined as any;
  }
  return (process.env.NEXT_PUBLIC_DIRECTUS_URL + "/assets/" + image.id) as any;
}

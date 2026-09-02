import { headers } from "next/headers";
import type { CurrentUser } from "@/lib/types";

function decodeName(value: string | null, encoding: string | null) {
  if (!value || encoding !== "percent-encoded-utf-8") return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

export function userFromHeaders(requestHeaders: Headers): CurrentUser | null {
  const id = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  const fullName = decodeName(
    requestHeaders.get("oai-authenticated-user-full-name"),
    requestHeaders.get("oai-authenticated-user-full-name-encoding")
  );

  if (!id) {
    if (process.env.NODE_ENV !== "production") {
      return { id: "local-preview-user", email: "preview@motif.local", name: "Preview Creator" };
    }
    return null;
  }

  return {
    id,
    email,
    name: fullName ?? email?.split("@")[0] ?? "Creator",
  };
}

export async function getCurrentUser() {
  return userFromHeaders(await headers());
}

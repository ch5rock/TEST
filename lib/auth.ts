import { cookies, headers } from "next/headers";
import type { CurrentUser } from "@/lib/types";

export const GUEST_COOKIE = "motif_guest_id";

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

function guestUser(id: string): CurrentUser {
  const shortCode = id.replace(/-/g, "").slice(0, 6).toUpperCase();
  return { id: `guest:${id}`, email: null, name: `게스트 ${shortCode}` };
}

function validGuestId(value: string | undefined | null) {
  return value && /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value) ? value : null;
}

export function userForRequest(request: Request) {
  const authenticated = userFromHeaders(request.headers);
  if (authenticated) return { user: authenticated, guestCookie: null };

  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookieValue = cookieHeader
    .split(";")
    .map((part) => part.trim().split("="))
    .find(([name]) => name === GUEST_COOKIE)?.[1];
  const existingId = validGuestId(cookieValue ? decodeURIComponent(cookieValue) : null);
  const id = existingId ?? crypto.randomUUID();
  return {
    user: guestUser(id),
    guestCookie: existingId
      ? null
      : `${GUEST_COOKIE}=${id}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
  };
}

export function withGuestCookie(response: Response, guestCookie: string | null) {
  if (guestCookie) response.headers.append("Set-Cookie", guestCookie);
  return response;
}

export async function getCurrentUser() {
  const authenticated = userFromHeaders(await headers());
  if (authenticated) return authenticated;
  const guestId = validGuestId((await cookies()).get(GUEST_COOKIE)?.value);
  return guestId ? guestUser(guestId) : null;
}

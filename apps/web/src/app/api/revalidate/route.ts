import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Called by the backend right after an admin saves/publishes content, so
 * edits show up on the public site immediately instead of waiting out the
 * page's normal ISR window (see `revalidate = 60` on each page).
 *
 * Auth: a shared secret, since this has to be reachable without an admin
 * session (it's a server-to-server call, not a browser request).
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.WEB_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const paths: unknown = body?.paths;
  if (!Array.isArray(paths) || paths.some((p) => typeof p !== "string")) {
    return NextResponse.json({ message: "Expected { paths: string[] }" }, { status: 400 });
  }

  for (const path of paths as string[]) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: paths });
}

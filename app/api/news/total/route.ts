import { getNumberOfNewsArticles } from "@/articles/utils";

export function GET(): Response {
  return new Response(getNumberOfNewsArticles().toString(), { status: 200 });
}

import { getNumberOfHistoryArticles } from "@/articles/utils";

export function GET(): Response {
  return new Response(getNumberOfHistoryArticles().toString(), { status: 200 });
}

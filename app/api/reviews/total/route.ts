import { getNumberOfReviews } from "@/articles/utils";

export function GET(): Response {
  return new Response(getNumberOfReviews().toString(), { status: 200 });
}

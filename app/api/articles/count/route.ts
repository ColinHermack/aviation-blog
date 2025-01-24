import { getNumberOfArticlesByTopic } from "@/articles/utils";

export function GET(request: Request): Response {
  try {
    let topic: string | null = request.headers.get("topic");

    if (topic === null) {
      return new Response("Error: No topic provided", { status: 400 });
    }

    return new Response(getNumberOfArticlesByTopic(topic).toString(), {
      status: 200,
    });
  } catch {
    return new Response("Error", { status: 500 });
  }
}

import { getSearchResults } from "@/articles/utils";

export function GET(request: Request): Response {
  try {
    if (request.headers.get("query") === null) {
      return new Response("Error: No search query provided", { status: 400 });
    } else if (typeof request.headers.get("query") !== "string") {
      return new Response("Error: search query is not a string", { status: 400 });
    } else {
      return new Response(
        JSON.stringify(
          getSearchResults(String(request.headers.get("query"))),
        ),
        { status: 200 },
      );
    }
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}

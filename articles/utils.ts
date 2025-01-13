import * as fs from "fs";

const NUM_ARTICLES_PER_PAGE = 12;

export interface ArticleMetadata {
  title: string;
  datePosted: Date;
  author: string;
  tags: string[];
  cover: string;
  coverPhotographer: string;
  coverLink: string;
  type: string;
}

export interface Article {
  metadata: ArticleMetadata;
  content: string;
}

function getArticles(dir: string): Article[] {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;

  let articles: Article[] = [];
  let files = fs.readdirSync(dir);

  for (let file of files) {
    let fileContent = fs.readFileSync(dir + "/" + file, "utf8");
    let match = frontmatterRegex.exec(fileContent);
    let frontMatterBlock = match![1];
    let content = fileContent.replace(frontmatterRegex, "").trim();

    let currArticle: Article = {
      metadata: {
        title: "",
        datePosted: new Date(),
        author: "",
        tags: [],
        cover: "",
        coverPhotographer: "",
        coverLink: "",
        type: "",
      },
      content: "",
    };

    frontMatterBlock
      .trim()
      .split("\n")
      .forEach((line) => {
        let [key, value] = line.split(": ");

        if (key === "title") {
          currArticle.metadata.title = value;
        } else if (key === "postedOn") {
          currArticle.metadata.datePosted = new Date(value);
          currArticle.metadata.datePosted.setHours(
            currArticle.metadata.datePosted.getHours() + 5,
          );
        } else if (key === "author") {
          currArticle.metadata.author = value;
        } else if (key === "tags") {
          currArticle.metadata.tags = value.split(", ");
        } else if (key === "cover") {
          currArticle.metadata.cover = value;
        } else if (key === "cover_photographer") {
          currArticle.metadata.coverPhotographer = value;
        } else if (key === "cover_link") {
          currArticle.metadata.coverLink = value;
        }
      });

    currArticle.content = content;
    articles.push(currArticle);
  }

  articles.sort((a, b) => {
    return b.metadata.datePosted.getTime() - a.metadata.datePosted.getTime();
  });

  return articles;
}

export function getPaginatedNewsArticleMetadata(
  page: number,
): ArticleMetadata[] {
  let articles = getArticles("/articles/news");

  articles.forEach((article) => {
    article.metadata.type = "news";
  });

  return articles
    .slice((page - 1) * NUM_ARTICLES_PER_PAGE, page * NUM_ARTICLES_PER_PAGE)
    .map((article) => article.metadata);
}

export function getPaginatedHistoryArticleMetadata(
  page: number,
): ArticleMetadata[] {
  let articles = getArticles("/articles/history");

  articles.forEach((article) => {
    article.metadata.type = "history";
  });

  return articles
    .slice((page - 1) * NUM_ARTICLES_PER_PAGE, page * NUM_ARTICLES_PER_PAGE)
    .map((article) => article.metadata);
}

export function getPaginatedReviewMetadata(page: number): ArticleMetadata[] {
  let articles = getArticles("/articles/reviews");

  articles.forEach((article) => {
    article.metadata.type = "reviews";
  });

  return articles
    .slice((page - 1) * NUM_ARTICLES_PER_PAGE, page * NUM_ARTICLES_PER_PAGE)
    .map((article) => article.metadata);
}

export function getNewsArticles(): Article[] {
  let articles = getArticles("/articles/news");

  articles.forEach((article) => {
    article.metadata.type = "news";
  });

  return articles;
}

export function getReviews(): Article[] {
  let articles = getArticles("/articles/reviews");

  articles.forEach((article) => {
    article.metadata.type = "reviews";
  });

  return articles;
}

export function getHistoryArticles(): Article[] {
  let articles = getArticles("/articles/history");

  articles.forEach((article) => {
    article.metadata.type = "history";
  });

  return articles;
}

export function getNumberOfNewsArticles(): number {
  return fs.readdirSync("/articles/news").length;
}

export function getNumberOfHistoryArticles(): number {
  return fs.readdirSync("/articles/history").length;
}

export function getNumberOfReviews(): number {
  return fs.readdirSync("/articles/reviews").length;
}

export function getNewsArticleBySlug(slug: string): Article | undefined {
  return getNewsArticles().find(
    (article) =>
      article.metadata.title.toLowerCase().replaceAll(" ", "-") === slug,
  );
}

export function getHistoryArticleBySlug(slug: string): Article | undefined {
  return getHistoryArticles().find(
    (article) =>
      article.metadata.title.toLowerCase().replaceAll(" ", "-") === slug,
  );
}

export function getReviewBySlug(slug: string): Article | undefined {
  return getReviews().find(
    (article) =>
      article.metadata.title.toLowerCase().replaceAll(" ", "-") === slug,
  );
}

export function getSearchResults(searchTerm: string): ArticleMetadata[] {
  const articles = [
    ...getNewsArticles(),
    ...getHistoryArticles(),
    ...getReviews(),
  ].sort((a, b) => {
    return b.metadata.datePosted.getTime() - a.metadata.datePosted.getTime();
  });

  searchTerm = searchTerm.replaceAll("-", " ");

  const results = articles.filter((article) => {
    return (
      article.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.metadata.author
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      article.metadata.tags.find((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (results.length === 0) {
    return articles
      .slice(0, NUM_ARTICLES_PER_PAGE)
      .map((article) => article.metadata);
  }

  return results
    .map((article) => article.metadata)
    .slice(0, NUM_ARTICLES_PER_PAGE);
}

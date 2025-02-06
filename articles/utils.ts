import * as fs from "fs";
import path from "path";

const NUM_ARTICLES_PER_PAGE = 12;

export interface ArticleMetadata {
  title: string;
  datePosted: Date;
  author: string;
  tags: string[];
  topic: string;
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
        topic: "",
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
        } else if (key === "topic") {
          currArticle.metadata.topic = value;
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

export function getArticlesByTopic(topic: string): ArticleMetadata[] {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;

  let articles: ArticleMetadata[] = [];
  let files = fs.readdirSync(path.join(process.cwd(), "articles", "text"));

  for (let file of files) {
    let fileContent = fs.readFileSync(
      path.join(process.cwd(), "articles", "text", file),
      "utf8",
    );
    let match = frontmatterRegex.exec(fileContent);
    let frontMatterBlock = match![1];

    let currArticle: ArticleMetadata = {
      title: "",
      datePosted: new Date(),
      author: "",
      tags: [],
      topic: "",
      cover: "",
      coverPhotographer: "",
      coverLink: "",
      type: "",
    };

    frontMatterBlock
      .trim()
      .split("\n")
      .forEach((line) => {
        let [key, value] = line.split(": ");

        if (key === "title") {
          currArticle.title = value;
        } else if (key === "postedOn") {
          currArticle.datePosted = new Date(value);
          currArticle.datePosted.setHours(
            currArticle.datePosted.getHours() + 5,
          );
        } else if (key === "author") {
          currArticle.author = value;
        } else if (key === "tags") {
          currArticle.tags = value.split(", ");
        } else if (key === "topic") {
          currArticle.topic = value;
        } else if (key === "cover") {
          currArticle.cover = value;
        } else if (key === "cover_photographer") {
          currArticle.coverPhotographer = value;
        } else if (key === "cover_link") {
          currArticle.coverLink = value;
        }
      });

    if (currArticle.topic === topic) {
      articles.push(currArticle);
    }
  }

  articles.sort((a, b) => {
    return b.datePosted.getTime() - a.datePosted.getTime();
  });

  return articles;
}

export function getPaginatedArticleMetadata(topic: string, page: number) {
  let articles = getArticlesByTopic(topic);

  return articles.slice(
    (page - 1) * NUM_ARTICLES_PER_PAGE,
    page * NUM_ARTICLES_PER_PAGE,
  );
}

export function getRecentArticles(): ArticleMetadata[] {
  let articles = getArticles(path.join(process.cwd(), "articles", "text"));

  return articles
    .map((article) => article.metadata)
    .slice(0, NUM_ARTICLES_PER_PAGE);
}

export function getArticleBySlug(slug: string): Article | undefined {
  let articles = getArticles(path.join(process.cwd(), "articles", "text"));

  return articles.find(
    (article) =>
      article.metadata.title.toLowerCase().replaceAll(" ", "-") === slug,
  );
}

export function getNumberOfArticlesByTopic(topic: string): number {
  return getArticlesByTopic(topic).length;
}

export function getSearchResults(searchTerm: string): ArticleMetadata[] {
  const articles = getArticles(path.join(process.cwd(), "articles", "text"));

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

export function getSimilarArticles(
  keywords: string[],
  title: string,
): ArticleMetadata[] {
  const articles = getArticles(path.join(process.cwd(), "articles", "text"));

  const results = articles.filter((article) => {
    return keywords.every((keyword) =>
      article.metadata.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  });

  let articleTitles: string[] = results.map(
    (article) => article.metadata.title,
  );

  for (let i = 0; i < results.length; i++) {
    if (results[i].metadata.title === title) {
      results.splice(i, 1);
    }
  }

  while (results.length < 3) {
    let recentArticle = articles.find(
      (article) => !articleTitles.includes(article.metadata.title),
    );

    articleTitles.push(recentArticle!.metadata.title);
    results.push(recentArticle!);
  }

  return results.map((article) => article.metadata);
}

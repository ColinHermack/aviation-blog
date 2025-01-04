import * as fs from "fs";

export interface ArticleMetadata {
    title: string,
    datePosted: Date,
    author: string,
    tags: string[],
    cover: string,
    coverPhotographer: string,
    coverLink: string
}

export interface Article {
    metadata: ArticleMetadata,
    content: string
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
                coverLink: ""
            },
            content: ""
        };

        frontMatterBlock.trim().split("\n").forEach(line => {
            let [key, value] = line.split(": ");
            if (key === "title") {
                currArticle.metadata.title = value;
            } else if (key === "postedOn") {
                currArticle.metadata.datePosted = new Date(value);
                currArticle.metadata.datePosted.setHours(currArticle.metadata.datePosted.getHours() + 5);
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
        })

        currArticle.content = content;
        articles.push(currArticle);
    }

    articles.sort((a, b) => {
        return b.metadata.datePosted.getTime() - a.metadata.datePosted.getTime();
    });

    return articles;
}

export function getPaginatedNewsArticleMetadata(page: number): ArticleMetadata[] {
    return getArticles("articles/news").slice((page - 1) * 10, page * 10).map(article => article.metadata);
}

export function getPaginatedHistoryArticleMetadata(page: number): ArticleMetadata[] {
    return getArticles("articles/history").slice((page - 1) * 10, page * 10).map(article => article.metadata);
}

export function getNewsArticles(): Article[] {
    return getArticles("articles/news");
}

export function getReviews(): Article[] {
    return getArticles("articles/reviews");
}

export function getNumberOfNewsArticles(): number {
    return fs.readdirSync("articles/news").length;
}

export function getNumberOfHistoryArticles(): number {
    return fs.readdirSync("articles/history").length;
}

export function getNumberOfReviews(): number {
    return fs.readdirSync("articles/reviews").length;
}

export function getNewsArticleBySlug(slug: string): Article | undefined {
    return getNewsArticles().find(article => article.metadata.title.toLowerCase().replaceAll(" ", "-") === slug);
}

export function getHistoryArticleBySlug(slug: string): Article | undefined {
    return getArticles("articles/history").find(article => article.metadata.title.toLowerCase().replaceAll(" ", "-") === slug);
}
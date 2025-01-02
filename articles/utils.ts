import * as fs from "fs";

interface ArticleMetadata {
    title: string,
    datePosted: Date,
    author: string,
    tags: string[],
    cover: string
}

interface Article {
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
                cover: ""
            },
            content: ""
        };

        frontMatterBlock.trim().split("\n").forEach(line => {
            let [key, value] = line.split(": ");
            if (key === "title") {
                currArticle.metadata.title = value;
            } else if (key === "datePosted") {
                currArticle.metadata.datePosted = new Date(value);
            } else if (key === "author") {
                currArticle.metadata.author = value;
            } else if (key === "tags") {
                currArticle.metadata.tags = value.split(", ");
            } else if (key === "cover") {
                currArticle.metadata.cover = value;
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

export function getNewsArticles(): Article[] {
    return getArticles("./news");
}

export function getReviewArticles(): Article[] {
    return getArticles("./reviews");
}
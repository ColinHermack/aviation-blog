import React from "react";

import { getSimilarArticles } from "@/articles/utils";
import ArticleCard from "@/app/article-card";

interface ArticleRecommenderProps {
  keywords: string[];
  title: string;
}

export default function ArticleRecommender(props: ArticleRecommenderProps) {
  let articles = getSimilarArticles(props.keywords, props.title);

  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => {
        return (
          <ArticleCard
            key={article.title.toLowerCase().replace(" ", "-")}
            coverPhoto={article.cover}
            datePosted={new Date(article.datePosted)}
            title={article.title}
            type={article.type}
          />
        );
      })}
    </div>
  );
}

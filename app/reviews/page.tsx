"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";

import ArticleCard from "@/app/article-card";

export default function Page() {
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/reviews/total")
      .then((response) => response.text())
      .then((data) => {
        setTotalPages(Math.ceil(parseInt(data) / 10));
      });
  }, []);

  useEffect(() => {
    fetch("/api/reviews/articles", {
      method: "GET",
      headers: {
        page: activePage.toString(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      });
  }, [activePage]);

  if (articles.length === 0) {
    return <Spinner color="primary" size="lg" />;
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen">
      <h1 className="m-8 text-4xl font-bold text-center">Reviews</h1>
      <div className="flex flex-wrap justify-center items-center">
        {articles.map((article: any) => {
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
      <Pagination
        className="m-8"
        initialPage={1}
        total={totalPages}
        onChange={(page) => setActivePage(page)}
      />
    </div>
  );
}

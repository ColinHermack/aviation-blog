"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import ArticleCard from "@/app/article-card";

const Loading = () => {
  return <Spinner className="m-8" color="primary" size="lg" />;
};

function PageContent() {
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);

  const searchParams = useSearchParams();
  const topic: string | null | undefined = searchParams.get("topic");

  if (topic === null || topic === undefined) {
    redirect("/404");
  }

  useEffect(() => {
    fetch("/api/articles/count", {
      method: "GET",
      headers: {
        topic: topic,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setTotalPages(Math.ceil(parseInt(data) / 10));
      });
  }, [topic]);

  useEffect(() => {
    fetch("/api/articles", {
      method: "GET",
      headers: {
        page: activePage.toString(),
        topic: topic,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      });
  }, [topic, activePage]);

  if (articles.length === 0) {
    return <Spinner color="primary" size="lg" />;
  }

  return (
    <div className="flex flex-col items-center justify-top">
      <h1 className="m-8 text-4xl font-bold text-center">
        {topic.charAt(0).toUpperCase() + topic.slice(1)}
      </h1>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-top min-h-screen w-full">
      <Suspense fallback={<Loading />}>
        <PageContent />
      </Suspense>
    </div>
  );
}

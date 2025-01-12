"use client";

import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

import { ArticleMetadata } from "@/articles/utils";

interface SearchResultsProps {
  query: string;
}

function SearchResults(props: SearchResultsProps) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("/api/search", {
      method: "GET",
      headers: {
        query: props.query,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      });
  }, [props.query]);

  if (searchResults.length === 0) {
    return <Spinner color="primary" size="lg" />;
  } else {
    return searchResults.map((article: ArticleMetadata) => {
      return (
        <Link
          key={article.title.toLowerCase().replace(" ", "-")}
          className="m-4"
          href={`/${article.type}/${article.title.toLowerCase().replaceAll(" ", "-")}`}
        >
          <Card
            className="w-[350px] h-[175px] max-w-full flex flex-col justify-top align-center"
            shadow={"md"}
          >
            <CardBody className="flex flex-row items-top justify-between overflow-visible">
              <h4 className="font-bold text-md w-[200px] text-left">
                {article.title}
              </h4>
              <Image
                alt="Card background"
                className="rounded-xl object-cover"
                height={100}
                src={`/${article.type}_images/${article.cover}`}
                width={100}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <p className="text-tiny text-default-500 font-bold">
                {new Date(article.datePosted).toDateString()}
              </p>
            </CardFooter>
          </Card>
        </Link>
      );
    });
  }
}

export default function Page() {
  const searchParams = useSearchParams();
  let search: string | null | undefined = searchParams.get("query");

  if (search === null) {
    redirect("/404");
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen w-full">
      <h1 className="m-8 text-4xl font-bold text-center">Search Results</h1>
      <SearchResults query={search} />
    </div>
  );
}

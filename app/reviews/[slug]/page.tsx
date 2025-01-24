import React from "react";
import { redirect } from "next/navigation";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { remark } from "remark";
import html from "remark-html";
import { FaCamera } from "react-icons/fa";

import { Article, getReviewBySlug } from "@/articles/utils";

function formatDateString(date: Date): string {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  let dateString: string = "";

  dateString += days[date.getDay()];
  dateString += ", ";
  dateString += months[date.getMonth()];
  dateString += " ";
  dateString += date.getDate();
  dateString += ", ";
  dateString += date.getFullYear();

  return dateString;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let slug = (await params).slug;
  const article: Article | undefined = getReviewBySlug(slug);

  if (article === undefined) {
    redirect("/404");
  }
  const articleContent = await remark().use(html).process(article.content);
  const articleContentHtml = articleContent.toString();

  return (
    <div className="flex flex-col items-center justify-top min-h-screen w-full">
      <h1 className="m-8 text-4xl font-bold text-center">
        {article.metadata.title}
      </h1>
      <Image
        alt={article.metadata.title}
        className="mt-8"
        src={`/reviews_images/${article.metadata.cover}`}
        width={800}
      />
      {article.metadata.coverLink !== "" &&
      article.metadata.coverPhotographer !== "" ? (
        <Link
          className="w-full text-tiny uppercase font-bold flex justify-left items-center max-w-[800px] gap-2 mb-4 mt-2 text-sky-600"
          href={article.metadata.coverLink}
          isExternal={true}
        >
          <FaCamera />
          {article.metadata.coverPhotographer}
        </Link>
      ) : (
        <></>
      )}
      <p className="w-full text-left max-w-[800px] mb-8 mt-2 text-tiny uppercase font-bold">
        PUBLISHED ON {formatDateString(article.metadata.datePosted)}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: articleContentHtml }}
        className="w-full text-left max-w-[800px] mx-8 mb-8 [&>p]:my-4 [&>p>a]:text-sky-600 [&>h2]:font-bold [&>h2]:my-4 [&>h2]:text-2xl [&>h3]:font-bold [&>h3]:my-4 [&>h3]:text-xl [&>h4]:font-bold [&>h4]:my-4 [&>h4]:text-lg [&>h5]:font-bold [&>h5]:my-4 [&>h5]:text-base [&>h6]:font-bold [&>h6]:my-4 [&>h6]:text-sm"
      />
    </div>
  );
}

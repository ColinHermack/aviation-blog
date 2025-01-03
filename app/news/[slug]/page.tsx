import React from "react";
import { Article, getNewsArticleBySlug } from '@/articles/utils';
import { redirect } from 'next/navigation';
import { Image } from "@nextui-org/image";
import { remark } from "remark";
import html from "remark-html";

function formatDateString(date: Date): string {
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
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

interface PageParams {
    params: {
        slug: string
    }
}

export default async function Page({ params }: PageParams) {
    let slug = await params.slug;
    const article: Article | undefined = getNewsArticleBySlug(slug);
    if (article === undefined) {
        redirect("/404");
    }
    const articleContent = await remark()
        .use(html)
        .process(article.content)
    const articleContentHtml = articleContent.toString();
    console.log(articleContentHtml);
    return (
        <div className='flex flex-col items-center justify-top min-h-screen w-full'>
            <h1 className='m-8 text-4xl font-bold text-center'>{article.metadata.title}</h1>
            <Image
                src={`/news_images/${article.metadata.cover}`}
                width={750}
                alt={article.metadata.title}
                className='mt-8 mb-4'
            />
            <p className='w-full text-left max-w-[800px] mx-8 mb-8 text-tiny uppercase font-bold'>PUBLISHED ON {formatDateString(article.metadata.datePosted)}</p>
            <div 
                className='w-full text-left max-w-[800px] mx-8 mb-8 [&>p]:my-4 [&>p>a]:text-sky-600'
                dangerouslySetInnerHTML={{ __html: articleContentHtml }} 
            />
        </div>
    )
}
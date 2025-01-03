"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import {Pagination} from "@nextui-org/pagination";
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { Spinner } from '@nextui-org/spinner';

export default function Page() {
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("/api/news/total")
            .then((response) => response.text())
            .then((data) => {
                setTotalPages(Math.ceil(parseInt(data) / 10));
            });
    }, []); 

    useEffect(() => {
        fetch("/api/news/articles", {
            method: "GET",
            headers: {
                "page": activePage.toString()
            },
        })
            .then(response => response.json())
            .then(data => {
                setArticles(data);
            })
    }, [activePage])

    if (articles.length === 0) {
        return (
            <Spinner />
        )
    }

    return (
        <div className='flex flex-col items-center justify-top min-h-screen'>
            <h1 className='m-8 text-4xl font-bold text-center'>News</h1>
            <div className='flex flex-wrap justify-center items-center'>
                {articles.map((article: any) => {
                    return (
                        <Link
                            href={`/news/${article.title.toLowerCase().replaceAll(" ", "-")}`}
                            key={article.title.toLowerCase().replace(" ", "-")}
                            className='m-4'
                        >
                            <Card className="py-4 w-[300px] flex flex-col justify-top align-center">
                                <CardHeader className="flex-col items-start">
                                    <h4 className="font-bold text-large">{article.title}</h4>
                                    <p>{(new Date(article.datePosted)).toDateString()}</p>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2 px-[15px]">
                                    <Image
                                    alt="Card background"
                                    className="rounded-xl "
                                    src={`/news_images/${article.cover}`}
                                    width={270}
                                    height={200}
                                    />
                                </CardBody>
                            </Card>
                        </Link>
                    )
                })}
            </div>
            <Pagination initialPage={1} total={totalPages} onChange={(page) => setActivePage(page)} className='m-8'/>
        </div>
    )
}
"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import {Pagination} from "@nextui-org/pagination";
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { Spinner } from '@nextui-org/spinner';
import { Divider } from "@nextui-org/divider";

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
                "page": activePage.toString()
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
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
            <h1 className='m-8 text-4xl font-bold text-center'>History</h1>
            <div className='flex flex-wrap justify-center items-center'>
                {articles.map((article: any) => {
                    return (
                        <Link
                            href={`/reviews/${article.title.toLowerCase().replaceAll(" ", "-")}`}
                            key={article.title.toLowerCase().replace(" ", "-")}
                            className='m-4'
                        >
                            <Card className="w-[350px] h-[175px] max-w-full flex flex-col justify-top align-center" shadow={'md'}>
                                <CardBody className="flex flex-row items-top justify-between overflow-visible">
                                    <h4 className="font-bold text-md w-[200px] text-left">{article.title}</h4>
                                    <Image
                                    alt="Card background"
                                    className="rounded-xl object-cover"
                                    src={`/reviews_images/${article.cover}`}
                                    width={100}
                                    height={100}
                                    />  
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <p className='text-tiny text-default-500 font-bold'>{(new Date(article.datePosted)).toDateString()}</p>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                })}
            </div>
            <Pagination initialPage={1} total={totalPages} onChange={(page) => setActivePage(page)} className='m-8'/>
        </div>
    )
}
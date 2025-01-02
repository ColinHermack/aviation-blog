"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import {Pagination} from "@nextui-org/pagination";

export default function Page() {
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("/api/news/total")
            .then((response) => response.text())
            .then((data) => {
                setTotalPages(Math.ceil(parseInt(data) % 10));
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
                console.log(data);
            })
    }, [activePage])

    return (
        <div className='flex flex-col items-center justify-top h-screen'>
            <h1 className='m-8 text-4xl font-bold text-center'>News</h1>
            <Pagination initialPage={1} total={totalPages} onChange={(page) => setActivePage(page)} className='m-8'/>
        </div>
    )
}
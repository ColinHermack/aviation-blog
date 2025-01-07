"use client";

import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

interface SearchResultsProps {
    query: string
}

function SearchResults(props: SearchResultsProps) {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch("/api/search", {
            method: "GET",
            headers: {
                query: props.query
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSearchResults(data);
            })
    }, [props.query])

    if (searchResults.length === 0) {
        return (
            <Spinner color="primary" size="lg" />
        )
    }
}

export default function Page() {
    const searchParams = useSearchParams();
    let search: string | null | undefined = searchParams.get("query");
    
    if (search === null) {
        redirect("/404");
    }

    return (
        <div className='flex flex-col items-center justify-top min-h-screen w-full'>
            <h1 className="m-8 text-4xl font-bold text-center">Search Results</h1>
            <SearchResults query={search} />
        </div>
    )
}
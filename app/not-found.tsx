import React from 'react';
import { Link }from '@nextui-org/link';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-top'>
            <h1 className='text-4xl font-bold'>Error 404</h1>
            <h2 className='text-xl m-8'>It seems the page you're searching for doesn't exist.</h2>
            <Link
                className="flex items-center gap-1 text-current mt-4"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                Return Home
            </Link>
        </div>
    )
}
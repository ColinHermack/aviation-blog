"use client"

import React from 'react';
import { Image } from '@nextui-org/image';
import { useTheme } from 'next-themes';

interface ILogoProps {
    size: number
}

export default function Logo(props: ILogoProps) {
    const { theme, setTheme } = useTheme();

    if (theme === 'dark') {
        return (
            <Image
                alt="Logo"
                className="object-cover"
                width={props.size}
                height={props.size}
                src='/logo_dark.png'
            />
        );
    } else {
        return (
            <Image
                alt="Logo"
                className="object-cover"
                height={props.size}
                width={props.size}
                src='/logo.png'
            />
        );
    }
}
"use client";
import React from 'react';
import XIcon from '@/assets/icons/x.svg';
import TelegramIcon from '@/assets/icons/telegram.svg';

interface SocialLink {
    icon: React.ComponentType<any>, // Ensure icon type is ComponentType
    name: string,
    url: string
}

const socialLinks: SocialLink[] = [
    {
        name: "X",
        icon: XIcon,
        url: "https://twitter.com/chetcoin",
    },
    {
        name: "Telegram",
        icon: TelegramIcon,
        url: "https://t.me/chetverify",
    },
]

export default function Navigation() {
    return (
        <div className="flex justify-between text-center content-center w-full fixed">
            <div className="text-center flex items-center justify-center mt-2 ml-3">
                <h1 className="text-neutral-300">ChetGPT</h1>
            </div>

            <div>
                <ol className="flex items-center justify-center flex-wrap ml-2 mr-2 mt-2">
                    {socialLinks.map((link: SocialLink, index: number) => (
                        <li key={index} className="w-6 h-6 inline-block mr-1 p-1 box-content bg-neutral-900 rounded-lg last-of-type:mr-0">
                            <a className="block" href={link.url} target="_blank" rel="noopener noreferrer">
                                <link.icon className="w-6 h-full m-auto"/>
                            </a>
                        </li>
                    ))}
                </ol>

            </div>
        </div>
    );
}

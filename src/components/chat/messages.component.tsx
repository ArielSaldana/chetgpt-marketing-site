import './message'
import {useAtom} from "jotai/index";
import {messagesAtom} from "@/components/chat/atom";
import Image from "next/image";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

export function markdownToHtml(markdown: string) {
    const result = unified()
        .use(remarkParse)
        .use(remarkHtml)
        .processSync(markdown);

    return result.toString();
}

function MarkdownComponent({ markdownString }: any) {
    const html = markdownToHtml(markdownString);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Messages() {
    const [messages] = useAtom(messagesAtom);
    return (
        <div className="h-[calc(100%-204px)] p-2 w-full block relative top-12">
            <ol className="mt-10">
                {messages.map((message, index) => (
                    <li key={index} className="w-full mb-10">
                        <div className="flex items-start">
                            {/* Profile Picture Container */}
                            <div className="flex-none" style={{ width: 60, height: 60 }}>
                                <Image
                                    src={message.fromChet ? "/chetgptpfp.png" : "/userpfp.png"}
                                    alt={"profile photo"}
                                    width={60}
                                    height={60}
                                    className="block"
                                />
                            </div>
                            {/* Message Content Container */}
                            <div className="flex-grow ml-3">
                                <div>
                                    <strong>{message.fromChet ? "ChetGPT" : "You"}</strong>
                                </div>
                                <div>
                                    <MarkdownComponent markdownString={message.message} />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}


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
                    <li className="w-full" key={index}>
                        <div className="relative flex items-center mb-10">
                            <div className="flex-shrink-0">
                                <Image
                                    src={message.fromChet ? "/chetgptpfp.png" : "/userpfp.png"}
                                    alt={"profile photo"}
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <div className="relative mt-3">
                                {message.fromChet && <div><strong>ChetGPT</strong></div>}
                                {!message.fromChet && <div><strong>You</strong></div>}
                                <div>
                                    <MarkdownComponent markdownString={message.message} />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}

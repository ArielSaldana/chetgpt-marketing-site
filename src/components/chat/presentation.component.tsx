"use client";
import Messages from "@/components/chat/messages.component";
import TextInput from "@/components/chat/text-input.component";
import Image from "next/image";
import {messagesAtom} from "@/components/chat/atom";
import {useAtom} from "jotai/index";
import {Message} from "@/components/chat/message";
import {sendMsgToOpenAI} from "@/services/openai";

interface PromptLink {
    question: string,
    detail: string
    prompt: string
}

const links: PromptLink[] = [
    {question: "Dexscreener Link", detail: "Gets the dexscreener link", prompt: "Can I get the dexscreener link?"},
    {question: "Twitter Link", detail: "Gets the Twitter link", prompt: "Can I get the Twitter link?"},
    {question: "Telegram Link", detail: "Gets the Telegram link", prompt: "Can I get the Telegram link?"},
    {
        question: "What meme coin should I invest in?",
        detail: "Suggests a meme coin",
        prompt: "What meme coins should I invest in?"
    },
]


export function Presentation() {
    const [messages, setMessage] = useAtom(messagesAtom);

    async function handlePromptLink(message: string): Promise<void> {
        console.log(message)
        const newMessage: Message = {fromChet: false, message: message};
        addMsg(newMessage)

        try {
            const response = await sendMsgToOpenAI(message);
            if (response != null) {
                const chetGPTMsg: Message = {fromChet: true, message: response.toString()};
                addMsg(chetGPTMsg)
            }
            console.log("Response from OpenAI:", response);
        } catch (error) {
            console.error("Error communicating with OpenAI:", error);
        }
    }

    function addMsg(msg: Message): void {
        setMessage(prevMessages => [...prevMessages, msg]);
    }

    const shouldDisplaySplashScreen = messages.length == 0;

    return (
        <div className="max-w-3xl p-2 w-full block relative h-calc top-12">
            {shouldDisplaySplashScreen &&
                <div
                    className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <Image
                        src="/logowht2210-y01-200w.png"
                        alt="ChetGPT Logo"
                        width={156}
                        height={158}
                        style={{width: '80px', height: 'auto', position: 'relative', top: '50px'}}
                        priority
                    />
                    <Image
                        src="/halptodaymessage21414-5tsn-300h.png"
                        alt="ChetGPT Can I help You Message"
                        width={382}
                        height={215}
                        style={{width: '300px', height: 'auto'}}
                        priority
                    />

                    <div className="flex flex-row flex-wrap items-center justify-center w-full cursor-pointer">
                        {links.map((link, index) => (
                            <div onClick={() => {
                                handlePromptLink(link.prompt)
                            }} key={index}
                                 className={`${index > 1 ? 'hidden' : ''} w-full md:block md:w-45pr px-5 py-2 border border-solid border-neutral-700 mx-2 my-1 rounded-lg`}>
                                <h3 className="text-neutral-400 text-md">{link.question}</h3>
                                <p className="text-neutral-400 text-sm">{link.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }

            <div className="w-full" style={{paddingBottom: '150px'}}>
                <Messages/>
            </div>
            <div className="w-full" style={{width: 'calc(100% - 1rem)'}}>
                <TextInput/>
            </div>
        </div>
    )
}

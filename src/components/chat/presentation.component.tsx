"use client";
import Messages from "@/components/chat/messages.component";
import TextInput from "@/components/chat/text-input.component";
import Image from "next/image";
import {messagesAtom} from "@/components/chat/atom";
import {useAtom} from "jotai/index";

export function Presentation() {
    const [messages] = useAtom(messagesAtom);

    const shouldDisplaySplashScreen = messages.length == 0;

    return (
        <div className="max-w-3xl m-auto p-2 w-full block relative h-calc top-12">

            {shouldDisplaySplashScreen &&
                <div
                    className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
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
                </div>
            }

            <div className="w-full" style={{width: 'calc(100% - 1rem)'}}>
                <Messages/>
            </div>
            <div className="w-full" style={{width: 'calc(100% - 1rem)'}}>
                <TextInput/>
            </div>
        </div>
    )
}

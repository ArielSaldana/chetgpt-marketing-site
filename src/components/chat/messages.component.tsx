import './message'
import {useAtom} from "jotai/index";
import {messagesAtom} from "@/components/chat/atom";
import Image from "next/image";

export default function Messages() {
    const [messages] = useAtom(messagesAtom);
    return (
        <div>
            <ol>
                {messages.map((message, index) => (
                    <li key={index}>
                        <div className="relative flex items-center mb-10">
                            <div>
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
                                <div>{message.message}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}

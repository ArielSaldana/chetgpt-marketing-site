import './message'
import {useAtom} from "jotai/index";
import {messagesAtom} from "@/components/chat/atom";

export default function Messages() {
    const [messages] = useAtom(messagesAtom);
    return (
        <div>
            <ol>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.message}
                    </li>
                ))}
            </ol>
        </div>
    )
}

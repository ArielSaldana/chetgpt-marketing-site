import React, {useState} from 'react';
import {useAtom} from 'jotai';
import {messagesAtom} from "./atom"
import {Message} from "@/components/chat/message";
import UpIcon from '@/assets/icons/up-arrow.svg';
import {sendMsgToOpenAI} from "@/services/openai";

export default function TextInput() {
    const [messages, setMessages] = useAtom(messagesAtom);
    const [text, setText] = useState('');
    const [isActive, setIsActive] = useState(false);

    async function addMessage() {
        if (text.trim()) {
            const newMessage: Message = {fromChet: false, message: text}; // Assuming 'fromChet' was a typo
            // setMessages([...messages, newMessage]);
            addMsg(newMessage)
            setText('');

            try {
                const response = await sendMsgToOpenAI(text);
                if (response != null) {
                    const chetGPTMsg: Message = {fromChet: true, message: response.toString()};
                    addMsg(chetGPTMsg)
                }
                console.log("Response from OpenAI:", response);
            } catch (error) {
                console.error("Error communicating with OpenAI:", error);
            }
        }
    }

    function addMsg(msg: Message): void {
        setMessages(prevMessages => [...prevMessages, msg]);
    }

    function handleKeyDown(e: { key: string; shiftKey: any; preventDefault: () => void; }) {
        // If Shift + Enter is pressed, allow the default behavior to add a new line
        // Prevents the default action of inserting a newline
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMessage();
        }
    }

    function handleFocus() {
        console.log("yes")
        setIsActive(true);
    }

    function handleBlur() {
        setIsActive(false);
    }

    // Check if the text is not empty and not just the placeholder
    const isTextNotEmpty = text.trim().length > 0;

    return (
        <div className="fixed bottom-0 max-w-3xl w-inherit flex flex-col bg-black">
            <div className={`${isActive ? 'focus:border-neutral-300' : 'border-neutral-700'} "bottom-0 max-w-3xl w-full flex flex-row justify-center items-center rounded-md shadow-sm border border-solid focus:border-neutral-300`}>
                <textarea
                    className="bg-transparent p-0 pl-10 pr-10 pt-2 pb-2 resize-none focus:outline-none focus:ring-0 w-full h-11 placeholder-neutral-600"
                    value={text}
                    onFocus={(e) => handleFocus()}
                    onBlur={(e) => handleBlur()}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message ChetGPT"
                />
                <button
                    className={`${isTextNotEmpty ? 'bg-neutral-200' : 'bg-neutral-800'} w-8 h-8 rounded-lg flex justify-center items-center absolute right-2`}
                    onClick={addMessage}>
                    <UpIcon className="text-neutral-950 w-6 h-6"/>
                </button>
            </div>
            <div className="mt-5 mb-4">
                <p>ChetGPT(TM)</p>
            </div>
        </div>
    );
}

import React, {useState} from 'react';
import {useAtom} from 'jotai';
import {messagesAtom} from "./atom"
import {Message} from "@/components/chat/message";
import UpIcon from '@/assets/icons/up-arrow.svg'; // Make sure this import works, if using SVGR

export default function TextInput() {
    const [messages, setMessages] = useAtom(messagesAtom);
    const [text, setText] = useState('');

    function addMessage() {
        if (text.trim()) {
            const newMessage: Message = {fromChet: true, message: text}; // Assuming 'fromChet' was a typo
            setMessages([...messages, newMessage]);
            setText('');  // Clear the textarea after sending the message
        }
    }

    function handleKeyDown(e: { key: string; shiftKey: any; preventDefault: () => void; }) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents the default action of inserting a newline
            addMessage();
        }
        // If Shift + Enter is pressed, allow the default behavior to add a new line
    }

    // Check if the text is not empty and not just the placeholder
    const isTextNotEmpty = text.trim().length > 0;

    return (
        <div className="fixed bottom-0 max-w-3xl w-inherit flex flex-col">
            <div className="bottom-0 max-w-3xl w-full flex flex-row justify-center items-center rounded-md shadow-sm border border-solid border-neutral-600">
                <textarea
                    className="bg-transparent p-0 pl-10 pr-10 pt-2 pb-2 resize-none focus:outline-none focus:ring-0 w-full h-11 placeholder-neutral-600"
                    value={text}
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

"use client";
import Messages from "@/components/chat/messages.component";
import TextInput from "@/components/chat/text-input.component";

export function Presentation() {

    return (
        <div className="max-w-3xl m-auto p-2 w-full block relative h-calc top-12">


            <div className="w-full" style={{width: 'calc(100% - 1rem)'}}>
                <Messages/>
            </div>
            <div className="w-full" style={{width: 'calc(100% - 1rem)'}}>
                <TextInput/>
            </div>
        </div>
    )
}

import Image from "next/image";
import Navigation from "@/components/navigation/navigation.component";
import {Presentation} from "@/components/chat/presentation.component";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Navigation/>
            <Presentation/>
        </main>
    );
}

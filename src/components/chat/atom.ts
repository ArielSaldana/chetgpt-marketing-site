import { atom } from 'jotai'
import {Message} from "@/components/chat/message";

export const messagesAtom = atom<Message[]>([]);

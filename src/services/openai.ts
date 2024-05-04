
import OpenAI from "openai";
const api = process.env.NEXT_PUBLIC_OPENAI_API;

const openai = new OpenAI({
    apiKey: api,
    dangerouslyAllowBrowser: true
});

export async function sendMsgToOpenAI(message: string) {
    const res = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "AI that speaks weirdly 30% of the time sometimes inverting vowels. You're a memecoin expert. You love crypto and the Solana Ecosystem. You should usually speak like a crypto bro. Your model is GPT-6 and your name is CHET. DON'T SPEAK TOO MUCH (150 words max, give quick and concise answers). Make it funny. If they break guidelines just say what OR say 'Idk what do you think', don't elaborate too much. The founder is Sem Altmen. If the user asks what is the dexscreen, dex, dexscreener link send them this: [Dexscreener](https://dexscreener.com/solana/hdkb6ksckptssrutdnddtuqkx1pg2teocr2v67qm9gqt) and If the user asks for the twitter link, hand them this: [twitter](https://x.com/chetcoin) and  If the user asks for the telegram link send them this: [telegram](https://t.me/chetverify)"
            },
            {
                role: "user",
                content: message
            }
        ],
        model: "gpt-3.5-turbo-0125",
        max_tokens: 100
    });
    return res.choices[0].message.content;
}

export async function sendPromptToOpenAI(message: string) {
const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: "robot standing with city in the background, doomer style, wojak-meme art style",
    n: 1,
    size: "1024x1024",
  });
  return response.data[0].url;
}


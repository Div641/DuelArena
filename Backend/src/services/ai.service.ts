import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import { CohereClientV2 } from "cohere-ai";
import config from "../config/config.js"

export const geminiModel= new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY
}) //judge

export const mistralModel= new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:config.MISTRAL_API_KEY
})

export const cohereModel= new CohereClientV2({
    // model:"command-a-reasoning-08-2025",
    token:config.COHERE_API_KEY
})


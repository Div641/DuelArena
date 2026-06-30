import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js"

export const gemini= new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY
}) //judge

export const mistralModel= new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:config.MISTRAL_API_KEY
})

export const cohereModel= new ChatCohere({
    model:"command-ra-03-2025",
    apiKey:config.COHERE_API_KEY
})


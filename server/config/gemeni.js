import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

export default geminiAI;
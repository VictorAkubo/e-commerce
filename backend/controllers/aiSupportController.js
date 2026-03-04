import Together from "together-ai";
import { init, getAuthToken } from "@heyputer/puter.js/src/init.cjs";
import Product from "../schema/db.js"

export const AiSupport = async (req, res) => {
  const { message } = req.body;
  const together = new Together({ apiKey:"key_CYe7uHng531D9D6gQb4ed"});
try{
  const response = await together.chat.completions.create({
  messages: [
        { role: "system", content: "You are a helpful customer support agent." },
        { role: "user", content: message },
      ],
  model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8"
});

  res.status(200).json({ reply: response.choices[0].message.content});
}catch(error){
  res.status(400).json({ reply: error.message });
}
}


const PUTER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoiZ3VpIiwidiI6IjAuMC4wIiwidSI6Ii9vWENDRWZwVFJXUkVxbmJyWll0cFE9PSIsInV1IjoiTG55MXQvQWFRR2lqS1hyNlBDUEluZz09IiwiaWF0IjoxNzcyNTc3NDA0fQ.ayTKsCviEtJC1gwD8RZlVCdimexRCvnkD473SkNyZD4";

export const PuterAiSupport = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Initialize Puter with your specific token
    const puter = init(PUTER_TOKEN);
    
    // Making the call
    const AllProduct = await Product.find()
    const response = await puter.ai.chat([
      {
        role: "user",
        content: "always hide the id dont reply by displaying the id of any product" + AllProduct + message
      }
    ]);

    // Puter responses usually nest the text in .message.content
    const replyText = response.message?.content || response.toString();

    return res.status(200).json({
      success: true,
      reply: replyText
    });

  } catch (error) {
    console.error("Puter AI Error:", error);
    return res.status(500).json({ 
      error: "API request failed",
      details: error.message 
    });
  }
};
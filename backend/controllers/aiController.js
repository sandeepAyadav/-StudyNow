import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAiMentor = async (req, res) => {
    try {
        const { question, courseTitle } = req.body;

        if (!question) {
            return res.status(400).json({ success: false, message: "Please provide a query prompt." });
        }

     
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        
        const systemPrompt = `You are "StudyNow AI Mentor", an elite technical instructor and software architecture expert. 
        The student is currently learning the course: "${courseTitle || 'Full Stack Web Development'}".
        Provide structurally accurate, highly professional answers. Include clean code snippets using markdown syntax wherever necessary. 
        Keep your explanations clear, precise, and deeply encouraging like a helpful senior peer mentor.`;

        const fullPrompt = `${systemPrompt}\n\nStudent Question: ${question}`;

        const result = await model.generateContent(fullPrompt);
        const aiResponse = result.response.text();

        return res.status(200).json({
            success: true,
            reply: aiResponse
        });

    } catch (error) {
        console.error("Gemini AI API Engine execution failure:", error);
        return res.status(500).json({
            success: false,
            message: "AI Core failed to compile response parameters."
        });
    }
};
import express from "express"
import cors from "cors"
import useGraph from "./services/graph.ai.service.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok'
    })
})

app.post("/use-graph", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            res.status(400).json({ error: "Message is required" });
            return;
        }
        const result = await useGraph(message);
        res.status(200).json(result);
    } catch (error: any) {
        console.error("Error in use-graph:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
})

app.post("/logout", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });
})

export default app
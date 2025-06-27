import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve('../../../.env') });

const router = express.Router();

// Proxy endpoint for chat
router.post("/", async (req, res) => {
  try {
    const FASTAPI_URL = process.env.REACT_APP_FASTAPI_URL || 'http://localhost:8000';
    const response = await fetch(`${FASTAPI_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error proxying chat request:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

export default router;

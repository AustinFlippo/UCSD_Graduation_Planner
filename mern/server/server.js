import express from "express";
import cors from "cors";
import chat from "./routes/chat.js";
import searchRouter from "./routes/search.js";
import uploadRouter from "./routes/upload.js";
import exportRouter from "./routes/export.js";
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve('../../.env.production') });
} else {
  dotenv.config({ path: path.resolve('../../.env.development') });
}

// Fallback to root .env if specific env file doesn't exist
dotenv.config({ path: path.resolve('../../.env') });


const PORT = process.env.EXPRESS_PORT || process.env.PORT || 5050;
const app = express();

// Environment-specific CORS
if (process.env.NODE_ENV === 'production') {
  const allowedOrigins = [
    "https://academic-planner-frontend.onrender.com",
    "https://www.tritonplanner.com",
    "https://tritonplanner.com"
  ];
  
  // Add custom frontend URL from environment if provided
  if (process.env.REACT_APP_FRONTEND_URL) {
    allowedOrigins.push(process.env.REACT_APP_FRONTEND_URL);
  }
  
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));
} else {
  app.use(cors());
}
app.use(express.json());
app.use("/chat", chat);
app.use("/search-courses", searchRouter);
app.use("/upload-degree-audit", uploadRouter);
app.use("/api/export", exportRouter);

// Health check endpoints
app.get('/', (req, res) => {
  res.json({ 
    status: 'Express server running', 
    timestamp: new Date().toISOString(),
    service: 'express-backend'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'express-backend',
    timestamp: new Date().toISOString()
  });
});

// start the Express server - bind to 0.0.0.0 for Render compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on host 0.0.0.0 port ${PORT}`);
});

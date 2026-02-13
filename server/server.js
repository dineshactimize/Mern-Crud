import express from 'express';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';

// Make sure to add the .js extension to local imports in ESM
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();

dotEnv.config();

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

// API Routes
app.use('/employees', employeeRoutes);

// Fallback for React routing - FIXED FOR EXPRESS 5
// The (.*) creates a named parameter that satisfies the new path-to-regexp rules
// Add 'splat' or any name inside the parentheses
// This tells Express: "Capture everything into a parameter named '0'"
app.get('/*splat', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client/build', 'index.html')
  );
});


// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log(`Database connection error: ${error}`);
    });

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});
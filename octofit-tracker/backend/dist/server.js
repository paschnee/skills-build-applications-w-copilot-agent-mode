import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase } from './config/database.js';
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 8000);
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
app.get('/api/dashboard', (_req, res) => {
    res.json({
        totalStudents: 0,
        totalPoints: 0,
        activeTeams: 0,
        weeklyGoal: '0 miles',
    });
});
app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`OctoFit Tracker API is running on http://localhost:${PORT}`);
});

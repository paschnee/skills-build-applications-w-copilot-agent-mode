import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 8000);
const apiUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
const fallbackUsers = [
    { id: 1, name: 'Ava Thompson', team: 'Lightning', points: 1450 },
    { id: 2, name: 'Leo Martinez', team: 'Storm', points: 1320 },
    { id: 3, name: 'Mia Patel', team: 'Lightning', points: 1215 },
    { id: 4, name: 'Noah Lee', team: 'Thunder', points: 1105 },
];
const fallbackTeams = [
    { id: 1, name: 'Lightning', members: 3, goal: '35 miles this week' },
    { id: 2, name: 'Storm', members: 2, goal: '30 miles this week' },
    { id: 3, name: 'Thunder', members: 4, goal: '40 miles this week' },
];
const fallbackActivities = [
    { id: 1, user: 'Ava Thompson', type: 'Running', minutes: 30, points: 250 },
    { id: 2, user: 'Leo Martinez', type: 'Strength', minutes: 45, points: 220 },
    { id: 3, user: 'Mia Patel', type: 'Walking', minutes: 20, points: 150 },
];
const fallbackWorkouts = [
    '20-minute interval run for cardio endurance',
    'Two strength sessions focused on core and legs',
    'Daily mobility routine to improve recovery',
];
const isDatabaseConnected = () => mongoose.connection.readyState === 1;
async function getUsers() {
    if (isDatabaseConnected()) {
        return User.find().lean();
    }
    return fallbackUsers;
}
async function getTeams() {
    if (isDatabaseConnected()) {
        return Team.find().lean();
    }
    return fallbackTeams;
}
async function getActivities() {
    if (isDatabaseConnected()) {
        return Activity.find().sort({ date: -1 }).lean();
    }
    return fallbackActivities;
}
async function getLeaderBoard() {
    if (isDatabaseConnected()) {
        return Leaderboard.find().sort({ points: -1 }).lean();
    }
    return [...fallbackUsers].sort((a, b) => b.points - a.points).map((user, index) => ({
        ...user,
        rank: index + 1,
        team: user.team,
    }));
}
async function getWorkouts() {
    if (isDatabaseConnected()) {
        return Workout.find().lean();
    }
    return fallbackWorkouts;
}
app.use(cors());
app.use(express.json());
app.get(['/health', '/'], (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        apiUrl,
        port: PORT,
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    res.json(await getUsers());
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const { name, team, points = 0, email } = req.body ?? {};
    if (!name || !team) {
        return res.status(400).json({ message: 'Name and team are required.' });
    }
    if (isDatabaseConnected()) {
        const newUser = await User.create({
            name,
            team,
            points,
            email: email ?? `${name.toLowerCase().replace(/\s+/g, '.')}@merington.edu`,
            profile: { grade: 10, favoriteActivity: 'Running' },
        });
        return res.status(201).json(newUser);
    }
    const newUser = {
        id: Date.now(),
        name,
        team,
        points,
    };
    fallbackUsers.push(newUser);
    return res.status(201).json(newUser);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    res.json(await getTeams());
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const { name, goal } = req.body ?? {};
    if (!name) {
        return res.status(400).json({ message: 'Team name is required.' });
    }
    if (isDatabaseConnected()) {
        const newTeam = await Team.create({
            name,
            members: 0,
            goal: goal ?? 'New team challenge',
        });
        return res.status(201).json(newTeam);
    }
    const newTeam = {
        id: Date.now(),
        name,
        members: 0,
        goal: goal ?? 'New team challenge',
    };
    fallbackTeams.push(newTeam);
    return res.status(201).json(newTeam);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    res.json(await getActivities());
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const { user, type, minutes, points } = req.body ?? {};
    if (!user || !type || !minutes) {
        return res.status(400).json({ message: 'User, type, and minutes are required.' });
    }
    if (isDatabaseConnected()) {
        const newActivity = await Activity.create({
            user,
            type,
            minutes,
            points: points ?? minutes * 2,
            date: new Date(),
        });
        return res.status(201).json(newActivity);
    }
    const newActivity = {
        id: Date.now(),
        user,
        type,
        minutes,
        points: points ?? minutes * 2,
    };
    fallbackActivities.unshift(newActivity);
    return res.status(201).json(newActivity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    res.json(await getLeaderBoard());
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await getWorkouts();
    res.json(workouts);
});
app.get('/api/dashboard', async (_req, res) => {
    const users = await getUsers();
    const teams = await getTeams();
    const totalPoints = users.reduce((sum, user) => sum + (user.points ?? 0), 0);
    res.json({
        totalStudents: users.length,
        totalPoints,
        activeTeams: teams.length,
        weeklyGoal: '175 miles',
        apiUrl,
    });
});
app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`OctoFit Tracker API running on ${apiUrl}`);
});

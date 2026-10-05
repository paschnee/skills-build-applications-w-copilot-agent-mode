import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */

const users = [
  {
    name: 'Ava Thompson',
    email: 'ava.thompson@merington.edu',
    team: 'Lightning',
    points: 1450,
    profile: { grade: 10, favoriteActivity: 'Running' },
  },
  {
    name: 'Leo Martinez',
    email: 'leo.martinez@merington.edu',
    team: 'Storm',
    points: 1320,
    profile: { grade: 11, favoriteActivity: 'Strength Training' },
  },
  {
    name: 'Mia Patel',
    email: 'mia.patel@merington.edu',
    team: 'Lightning',
    points: 1215,
    profile: { grade: 9, favoriteActivity: 'Walking' },
  },
  {
    name: 'Noah Lee',
    email: 'noah.lee@merington.edu',
    team: 'Thunder',
    points: 1105,
    profile: { grade: 12, favoriteActivity: 'Cycling' },
  },
];

const teams = [
  { name: 'Lightning', members: 3, goal: '35 miles this week', color: '#0d6efd' },
  { name: 'Storm', members: 2, goal: '30 miles this week', color: '#198754' },
  { name: 'Thunder', members: 4, goal: '40 miles this week', color: '#fd7e14' },
];

const activities = [
  { user: 'Ava Thompson', type: 'Running', minutes: 30, points: 250, date: new Date('2026-10-01T08:00:00.000Z') },
  { user: 'Leo Martinez', type: 'Strength', minutes: 45, points: 220, date: new Date('2026-10-01T09:15:00.000Z') },
  { user: 'Mia Patel', type: 'Walking', minutes: 20, points: 150, date: new Date('2026-10-01T07:30:00.000Z') },
  { user: 'Noah Lee', type: 'Cycling', minutes: 35, points: 210, date: new Date('2026-10-01T06:45:00.000Z') },
];

const leaderboard = [
  { user: 'Ava Thompson', team: 'Lightning', points: 1450, rank: 1 },
  { user: 'Leo Martinez', team: 'Storm', points: 1320, rank: 2 },
  { user: 'Mia Patel', team: 'Lightning', points: 1215, rank: 3 },
  { user: 'Noah Lee', team: 'Thunder', points: 1105, rank: 4 },
];

const workouts = [
  { title: 'Interval Run', type: 'Cardio', duration: 25, focus: 'Endurance', difficulty: 'Challenging' },
  { title: 'Core Circuit', type: 'Strength', duration: 30, focus: 'Core stability', difficulty: 'Moderate' },
  { title: 'Recovery Walk', type: 'Mobility', duration: 20, focus: 'Recovery', difficulty: 'Easy' },
  { title: 'HIIT Blast', type: 'Cardio', duration: 35, focus: 'Explosive power', difficulty: 'Challenging' },
];

async function resetCollections() {
  const collections: Array<mongoose.Model<any>> = [User, Team, Activity, Leaderboard, Workout];

  for (const model of collections) {
    await model.deleteMany({});
  }
}

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await resetCollections();
  await User.insertMany(users);
  await Team.insertMany(teams);
  await Activity.insertMany(activities);
  await Leaderboard.insertMany(leaderboard);
  await Workout.insertMany(workouts);

  console.log('Database has been seeded with OctoFit Tracker sample data.');
}

async function main() {
  const connected = await connectDatabase();

  if (!connected) {
    console.warn('MongoDB is not available. Seed skipped.');
    return;
  }

  await seedDatabase();
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});

import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: String, required: true, trim: true },
    team: { type: String, required: true, trim: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    members: { type: Number, default: 0 },
    goal: { type: String, default: 'Improve weekly fitness goals' },
    color: { type: String, default: '#0d6efd' },
}, { timestamps: true });
export const Team = mongoose.model('Team', teamSchema);

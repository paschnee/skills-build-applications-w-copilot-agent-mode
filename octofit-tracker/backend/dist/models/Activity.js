import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    minutes: { type: Number, required: true, min: 1 },
    points: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);

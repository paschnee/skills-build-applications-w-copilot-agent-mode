import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 10 },
    focus: { type: String, default: 'General fitness' },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Moderate' },
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);

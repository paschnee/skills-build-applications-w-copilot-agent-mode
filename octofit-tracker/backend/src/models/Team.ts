import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    members: { type: Number, default: 0 },
    goal: { type: String, default: 'Improve weekly fitness goals' },
    color: { type: String, default: '#0d6efd' },
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

export const Team = mongoose.model('Team', teamSchema);

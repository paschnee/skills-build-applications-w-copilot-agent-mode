import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    team: { type: String, required: true, trim: true },
    points: { type: Number, default: 0 },
    profile: {
      grade: { type: Number, min: 9, max: 12 },
      favoriteActivity: { type: String, default: 'Running' },
    },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = mongoose.model('User', userSchema);

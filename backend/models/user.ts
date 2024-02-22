import { Schema, model, Document } from 'mongoose';

// Define the schema interface
interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  userType: string;
  email: string;
  password: string;
  dob?: Date;
  country?: string;
  address?: string;
  phoneNumber?: string;
  profilePic?: string;
  isReferred?: boolean;
  uniqueReferralLink?: string;
  referrerId?: string; // ID of the referring user
  accountStatus?: string; // e.g., active, suspended, banned
  socialMediaLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    // Add more as needed
  };
  pointsEarned?: number;
  pointsHistory?: {
    type: string; // 'earn', 'redeem', 'deduct'
    amount: number;
    timestamp: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  username: { type: String, default: '' },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, default: null },
  country: { type: String, default: '' },
  address: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  profilePic: { type: String, default: '' },
  isReferred: { type: Boolean, default: false },
  uniqueReferralLink: { type: String, default: '' },
  referrerId: { type: String, default: '' },
  accountStatus: { type: String, default: '' },
  socialMediaLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  pointsEarned: { type: Number, default: 0 },
  pointsHistory: {
    type: [
      {
        type: { type: String, enum: ['earn', 'redeem', 'deduct'], default: 'earn' },
        amount: { type: Number, default: 0 },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define and export the model
export default model<IUser>('User', userSchema);

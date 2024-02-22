"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('User', userSchema);

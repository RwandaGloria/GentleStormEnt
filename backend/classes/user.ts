class User {

    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    password: string;
    userType: string = "user";
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

    constructor(firstName: string, lastName: string, email: string, password: string) 
    {
        this.firstName = firstName, 
        this.lastName = lastName, 
        this.email = email, 
        this.password = password
    }

    watchVideo() {

    }
}
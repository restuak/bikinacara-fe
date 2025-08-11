export interface AttendeeStats {
  transactionsCount: number;
  totalEvents: number;
  totalTickets: number;
  totalSpent: number;
}

export interface UserInfoAttendee {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
  referralCode?: string;
  pointsBalance?: number;
}

export interface PointsStats {
  active: number;  
  redeemed: number;
  expired: number;
  total: number;

}
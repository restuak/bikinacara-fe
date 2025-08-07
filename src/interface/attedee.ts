export interface AttendeeStats {
  totalEvents: number;
  totalTickets: number;
  totalSpent: number;
  transactionsCount: number;
}

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  role: "ATTENDEE" | "ORGANIZER";
  profilePic?: string;
}

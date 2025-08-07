export interface DashboardEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  totalParticipants: number;
  totalRevenue: number;
  reviewCount: number;
}

export interface StatisticData {
  month?: number;
  day?: number;
  totalParticipants: number;
  totalRevenue: number;
  totalEvents: number;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  role: "ATTENDEE" | "ORGANIZER";
}

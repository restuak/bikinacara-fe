export interface UserAuth {
  id: string;
  name: string;
  email: string;
  role: "ORGANIZER" | "ATTENDEE";
  token: string;
  profilePic: string;
}

interface AuthStore {
  token: string; 
  role: string;
}
export interface UserData {
  name: string;
  role: string;
}

export interface IJwtPayload {
  role: "ATTENDEE" | "ORGANIZER";
  id: string;
  email: string;
}
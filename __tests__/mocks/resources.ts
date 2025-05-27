import { Resource } from "@/app/schema";

export const mockResource: Resource = {
  id: "res-123",
  name: "taller de oncología",
  description: "Descripción del taller",
  start_date: new Date().toISOString(),
  meet_url: "https://meet.google.com/abc-def-ghi",
  price: 1000,
  created_at: new Date().toISOString(),
  end_date: new Date().toISOString(),
  session_count: 1,
  disclaimer: "Disclaimer del taller",
};

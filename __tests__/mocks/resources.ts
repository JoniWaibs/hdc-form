import { Resource } from "@/app/schema";

export const mockResource: Resource = {
    id: "res-123",
    name: "taller de oncología",
    description: "Descripción del taller",
    start_date: "2023-12-15T15:00:00Z",
    meet_url: "https://meet.google.com/abc-def-ghi",
    price: 1000,
    created_at: new Date().toISOString(),
    end_date: "2023-12-15T16:00:00Z",
};

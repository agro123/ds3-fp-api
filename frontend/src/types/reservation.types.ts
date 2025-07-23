export interface Reservation {
  id: string;
  roomName: string;
  roomType: "Auditorios" | "Laboratorio" | "Sala de cómputo" | "Salon";
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
  userId: string;
}

export interface Room {
  id: string;
  roomName: string;
  roomType: "Auditorios" | "Laboratorio" | "Sala de cómputo" | "Salon";
  capacity: number;
  equipment: string[];
  reservations: Reservation[];
  createdAt: string;
}

export type RoomTypeFilter =
  | "all"
  | "Auditorios"
  | "Laboratorio"
  | "Salon de cómputo"
  | "Salon";

export type StatusFilter = "all" | "confirmed" | "pending" | "cancelled";

export type SortBy = "roomType" | "date" | "status" | "name";

export type CapacityFilter = "all" | "1-10" | "11-20" | "21-30" | "31-50" | "50+";

export type RoomSortBy = "roomType" | "capacity" | "name";

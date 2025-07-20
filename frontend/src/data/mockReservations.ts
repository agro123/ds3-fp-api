import type { Reservation } from "../types/reservation.types";

export const mockReservations: Reservation[] = [
  {
    id: "1",
    roomName: "Sala A-101",
    roomType: "Salon",
    date: "Viernes, 15 de Julio",
    startTime: "14:00",
    endTime: "16:00",
    duration: "2 horas",
    reservationStatus: "confirmed",
    createdAt: "Lunes, 13 de Julio",
    userName: "Juan Pérez"
  },
  {
    id: "2",
    roomName: "Lab Computación B-205",
    roomType: "Laboratorio",
    date: "Sábado, 16 de Julio",
    startTime: "10:00",
    endTime: "11:00",
    duration: "1 hora",
    reservationStatus: "pending",
    createdAt: "Martes, 14 de Julio",
    userName: "María González"
  },
  {
    id: "3",
    roomName: "Aula Magna C-100",
    roomType: "Auditorios",
    date: "Miércoles, 13 de Julio",
    startTime: "09:00",
    endTime: "10:30",
    duration: "1.5 horas",
    reservationStatus: "confirmed",
    createdAt: "Viernes, 8 de Julio",
    userName: "Carlos Rodríguez"
  },
  {
    id: "4",
    roomName: "Lab Cómputo D-301",
    roomType: "Sala de cómputo",
    date: "Lunes, 18 de Julio",
    startTime: "16:00",
    endTime: "18:00",
    duration: "2 horas",
    reservationStatus: "cancelled",
    createdAt: "Sábado, 16 de Julio",
    userName: "Ana López"
  },
  {
    id: "5",
    roomName: "Auditorio Principal",
    roomType: "Auditorios",
    date: "Martes, 19 de Julio",
    startTime: "08:00",
    endTime: "10:00",
    duration: "2 horas",
    reservationStatus: "confirmed",
    createdAt: "Domingo, 17 de Julio",
    userName: "Pedro Martínez"
  },
  {
    id: "6",
    roomName: "Sala B-202",
    roomType: "Salon",
    date: "Miércoles, 20 de Julio",
    startTime: "13:00",
    endTime: "14:30",
    duration: "1.5 horas",
    reservationStatus: "pending",
    createdAt: "Lunes, 18 de Julio",
    userName: "Laura Sánchez"
  },
  {
    id: "7",
    roomName: "Lab Física E-105",
    roomType: "Laboratorio",
    date: "Jueves, 21 de Julio",
    startTime: "15:00",
    endTime: "17:00",
    duration: "2 horas",
    reservationStatus: "confirmed",
    createdAt: "Martes, 19 de Julio",
    userName: "Roberto García"
  },
  {
    id: "8",
    roomName: "Sala Cómputo F-301",
    roomType: "Sala de cómputo",
    date: "Viernes, 22 de Julio",
    startTime: "11:00",
    endTime: "13:00",
    duration: "2 horas",
    reservationStatus: "confirmed",
    createdAt: "Miércoles, 20 de Julio",
    userName: "Isabel Torres"
  },
  {
    id: "9",
    roomName: "Auditorio B",
    roomType: "Auditorios",
    date: "Sábado, 23 de Julio",
    startTime: "14:00",
    endTime: "16:00",
    duration: "2 horas",
    reservationStatus: "pending",
    createdAt: "Jueves, 21 de Julio",
    userName: "Diego Vargas"
  },
  {
    id: "10",
    roomName: "Sala C-305",
    roomType: "Salon",
    date: "Domingo, 24 de Julio",
    startTime: "09:00",
    endTime: "11:00",
    duration: "2 horas",
    reservationStatus: "cancelled",
    createdAt: "Viernes, 22 de Julio",
    userName: "Carmen Jiménez"
  },
  {
    id: "11",
    roomName: "Lab Química H-201",
    roomType: "Laboratorio",
    date: "Lunes, 25 de Julio",
    startTime: "07:30",
    endTime: "09:30",
    duration: "2 horas",
    reservationStatus: "confirmed",
    createdAt: "Sábado, 23 de Julio",
    userName: "Fernando Ruiz"
  },
  {
    id: "12",
    roomName: "Sala Cómputo I-401",
    roomType: "Sala de cómputo",
    date: "Martes, 26 de Julio",
    startTime: "20:00",
    endTime: "22:00",
    duration: "2 horas",
    reservationStatus: "pending",
    createdAt: "Domingo, 24 de Julio",
    userName: "Lucía Morales"
  }
];

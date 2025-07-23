import type { Room } from "../types/reservation.types";

export const mockRooms: Room[] = [
  // Auditorios (4)
  {
    id: "1",
    roomName: "Auditorio Principal",
    roomType: "Auditorios",
    capacity: 120,
    equipment: ["Sistema de Audio", "Proyector 4K", "Micrófono inalámbrico", "Escenario", "Aire acondicionado"],
    reservations: [
      {
        id: "res1",
        roomName: "Auditorio Principal",
        roomType: "Auditorios",
        date: "Lunes, 18 de Julio",
        startTime: "09:00",
        endTime: "11:00",
        duration: "2 horas",
        reservationStatus: "confirmed",
        createdAt: "Viernes, 15 de Julio",
        userName: "Dr. Rodriguez"
      },
      {
        id: "res2",
        roomName: "Auditorio Principal",
        roomType: "Auditorios",
        date: "Miércoles, 20 de Julio",
        startTime: "14:00",
        endTime: "17:00",
        duration: "3 horas",
        reservationStatus: "confirmed",
        createdAt: "Sábado, 16 de Julio",
        userName: "Prof. Martinez"
      }
    ],
    createdAt: "Enero, 2023"
  },
  {
    id: "2",
    roomName: "Aula Magna C-100",
    roomType: "Auditorios",
    capacity: 200,
    equipment: ["Sistema de Audio profesional", "Proyector HD", "Pantalla gigante", "Micrófono de solapa", "Iluminación LED"],
    reservations: [
      {
        id: "res3",
        roomName: "Aula Magna C-100",
        roomType: "Auditorios",
        date: "Martes, 19 de Julio",
        startTime: "08:00",
        endTime: "12:00",
        duration: "4 horas",
        reservationStatus: "confirmed",
        createdAt: "Domingo, 17 de Julio",
        userName: "Dra. González"
      }
    ],
    createdAt: "Febrero, 2023"
  },
  {
    id: "3",
    roomName: "Auditorio San Marcos",
    roomType: "Auditorios",
    capacity: 85,
    equipment: ["Proyector", "Sistema de sonido", "Micrófono", "Pizarra digital", "WiFi"],
    reservations: [
      {
        id: "res4",
        roomName: "Auditorio San Marcos",
        roomType: "Auditorios",
        date: "Jueves, 21 de Julio",
        startTime: "15:30",
        endTime: "17:00",
        duration: "1.5 horas",
        reservationStatus: "pending",
        createdAt: "Lunes, 18 de Julio",
        userName: "Ing. Pérez"
      }
    ],
    createdAt: "Marzo, 2023"
  },
  {
    id: "4",
    roomName: "Auditorio de Ingeniería",
    roomType: "Auditorios",
    capacity: 150,
    equipment: ["Proyector dual", "Sistema de videoconferencia", "Pizarra inteligente", "Micrófono de mesa", "Cámaras HD"],
    reservations: [],
    createdAt: "Abril, 2023"
  },

  // Salones (6)
  {
    id: "5",
    roomName: "Salon A-101",
    roomType: "Salon",
    capacity: 35,
    equipment: ["Proyector", "Pizarra acrílica", "WiFi", "Aire acondicionado", "Mesas móviles"],
    reservations: [
      {
        id: "res5",
        roomName: "Salon A-101",
        roomType: "Salon",
        date: "Viernes, 22 de Julio",
        startTime: "10:00",
        endTime: "12:00",
        duration: "2 horas",
        reservationStatus: "confirmed",
        createdAt: "Martes, 19 de Julio",
        userName: "Prof. López"
      }
    ],
    createdAt: "Mayo, 2023"
  },
  {
    id: "6",
    roomName: "Salon B-203",
    roomType: "Salon",
    capacity: 28,
    equipment: ["Pizarra", "TV 55 pulgadas", "WiFi", "Ventilación natural", "Sillas ergonómicas"],
    reservations: [
      {
        id: "res6",
        roomName: "Salon B-203",
        roomType: "Salon",
        date: "Lunes, 25 de Julio",
        startTime: "13:00",
        endTime: "16:00",
        duration: "3 horas",
        reservationStatus: "confirmed",
        createdAt: "Viernes, 22 de Julio",
        userName: "Dra. Ramírez"
      }
    ],
    createdAt: "Junio, 2023"
  },
  {
    id: "7",
    roomName: "Salon C-305",
    roomType: "Salon",
    capacity: 42,
    equipment: ["Proyector HD", "Pizarra mixta", "Sistema de audio", "WiFi", "Aire acondicionado"],
    reservations: [],
    createdAt: "Julio, 2023"
  },
  {
    id: "8",
    roomName: "Salon de Conferencias",
    roomType: "Salon",
    capacity: 60,
    equipment: ["Mesa de conferencias", "Proyector 4K", "Sistema de videoconferencia", "Micrófono", "Cafetera"],
    reservations: [
      {
        id: "res7",
        roomName: "Salon de Conferencias",
        roomType: "Salon",
        date: "Miércoles, 27 de Julio",
        startTime: "11:00",
        endTime: "12:00",
        duration: "1 hora",
        reservationStatus: "confirmed",
        createdAt: "Domingo, 24 de Julio",
        userName: "Dr. Vargas"
      }
    ],
    createdAt: "Agosto, 2023"
  },
  {
    id: "9",
    roomName: "Salon Multiuso D-201",
    roomType: "Salon",
    capacity: 50,
    equipment: ["Mesas plegables", "Sillas apilables", "Proyector portátil", "Sistema de sonido", "Espejo"],
    reservations: [],
    createdAt: "Septiembre, 2023"
  },
  {
    id: "10",
    roomName: "Salon de Estudios E-102",
    roomType: "Salon",
    capacity: 25,
    equipment: ["Mesas individuales", "Pizarra", "Iluminación LED", "WiFi", "Armarios personales"],
    reservations: [
      {
        id: "res8",
        roomName: "Salon de Estudios E-102",
        roomType: "Salon",
        date: "Jueves, 28 de Julio",
        startTime: "14:30",
        endTime: "17:00",
        duration: "2.5 horas",
        reservationStatus: "pending",
        createdAt: "Lunes, 25 de Julio",
        userName: "Prof. Castro"
      }
    ],
    createdAt: "Octubre, 2023"
  },

  // Laboratorios (4)
  {
    id: "11",
    roomName: "Lab. de Fisica E-105",
    roomType: "Laboratorio",
    capacity: 20,
    equipment: ["Microscopios", "Balanzas digitales", "Equipos de medición", "Mesas de laboratorio", "Campana extractora"],
    reservations: [
      {
        id: "res9",
        roomName: "Lab. de Fisica E-105",
        roomType: "Laboratorio",
        date: "Viernes, 29 de Julio",
        startTime: "08:00",
        endTime: "12:00",
        duration: "4 horas",
        reservationStatus: "confirmed",
        createdAt: "Martes, 26 de Julio",
        userName: "Ing. Silva"
      }
    ],
    createdAt: "Noviembre, 2023"
  },
  {
    id: "12",
    roomName: "Lab. de Quimica F-201",
    roomType: "Laboratorio",
    capacity: 18,
    equipment: ["Campanas de extracción", "Mecheros Bunsen", "Material de vidrio", "Reactivos químicos", "Lavaojos de emergencia"],
    reservations: [],
    createdAt: "Diciembre, 2023"
  },
  {
    id: "13",
    roomName: "Lab. de Biologia G-103",
    roomType: "Laboratorio",
    capacity: 22,
    equipment: ["Microscopios binoculares", "Incubadora", "Autoclave", "Refrigerador", "Muestras biológicas"],
    reservations: [
      {
        id: "res10",
        roomName: "Lab. de Biologia G-103",
        roomType: "Laboratorio",
        date: "Sábado, 30 de Julio",
        startTime: "09:00",
        endTime: "12:00",
        duration: "3 horas",
        reservationStatus: "confirmed",
        createdAt: "Miércoles, 27 de Julio",
        userName: "Dra. Moreno"
      }
    ],
    createdAt: "Enero, 2024"
  },
  {
    id: "14",
    roomName: "Lab. de Electronica D-301",
    roomType: "Laboratorio",
    capacity: 16,
    equipment: ["Osciloscopios", "Multímetros", "Protoboards", "Componentes electrónicos", "Soldadores"],
    reservations: [],
    createdAt: "Febrero, 2024"
  },

  // Salons de Cómputo (4)
  {
    id: "15",
    roomName: "Lab. Computo A-205",
    roomType: "Sala de cómputo",
    capacity: 30,
    equipment: ["30 computadores", "Proyector", "Pizarra digital", "WiFi de alta velocidad", "Software especializado"],
    reservations: [
      {
        id: "res11",
        roomName: "Lab. Computo A-205",
        roomType: "Sala de cómputo",
        date: "Domingo, 31 de Julio",
        startTime: "16:00",
        endTime: "18:00",
        duration: "2 horas",
        reservationStatus: "pending",
        createdAt: "Jueves, 28 de Julio",
        userName: "Prof. Herrera"
      }
    ],
    createdAt: "Marzo, 2024"
  },
  {
    id: "16",
    roomName: "Sala de Sistemas B-301",
    roomType: "Sala de cómputo",
    capacity: 25,
    equipment: ["25 computadores", "Servidores", "Switch de red", "UPS", "Sistema de respaldo"],
    reservations: [],
    createdAt: "Abril, 2024"
  },
  {
    id: "17",
    roomName: "Centro de Computo",
    roomType: "Sala de cómputo",
    capacity: 40,
    equipment: ["40 computadores", "Impresoras 3D", "Escáner", "Plotter", "Software de diseño"],
    reservations: [
      {
        id: "res12",
        roomName: "Centro de Computo",
        roomType: "Sala de cómputo",
        date: "Lunes, 1 de Agosto",
        startTime: "13:00",
        endTime: "18:00",
        duration: "5 horas",
        reservationStatus: "confirmed",
        createdAt: "Viernes, 29 de Julio",
        userName: "Ing. Delgado"
      }
    ],
    createdAt: "Mayo, 2024"
  },
  {
    id: "18",
    roomName: "Lab. Informatica H-102",
    roomType: "Sala de cómputo",
    capacity: 35,
    equipment: ["35 computadores", "Proyector 4K", "Tableta gráfica", "Cámaras web", "Micrófono"],
    reservations: [
      {
        id: "res13",
        roomName: "Lab. Informatica H-102",
        roomType: "Sala de cómputo",
        date: "Martes, 2 de Agosto",
        startTime: "10:30",
        endTime: "12:00",
        duration: "1.5 horas",
        reservationStatus: "confirmed",
        createdAt: "Sábado, 30 de Julio",
        userName: "Prof. Jiménez"
      }
    ],
    createdAt: "Junio, 2024"
  }
];

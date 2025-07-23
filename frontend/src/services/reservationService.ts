import type { Reservation } from '../types';

export const fetchReservations = async (): Promise<Reservation[]> => {
  try {
    console.log('Fetching reservations from API...');
    const response = await fetch('https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/reservations/');
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Reservations API response:', data);
    
    // Manejar diferentes estructuras de respuesta
    const reservationsData = data.reservations || data.data || data || [];
    
    console.log('Processed reservations data:', reservationsData);
    return reservationsData;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

export const fetchReservationById = async (id: string): Promise<Reservation | null> => {
  try {
    const reservations = await fetchReservations();
    return reservations.find((reservation: Reservation) => reservation.id === id) || null;
  } catch (error) {
    console.error('Error fetching reservation by ID:', error);
    throw error;
  }
};

export const fetchUserReservations = async (userId: string): Promise<Reservation[]> => {
  try {
    const reservations = await fetchReservations();
    return reservations.filter((reservation: Reservation) => reservation.userId === userId);
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    throw error;
  }
};

export interface CreateReservationData {
  user_id: string;
  room_id: string;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const createReservation = async (reservationData: CreateReservationData): Promise<{ success: boolean; data?: unknown; message?: string }> => {
  try {
    console.log('Creating reservation with data:', reservationData);
    const response = await fetch('https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/make-reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = { success: true, data: null, message: "Reserva Exitosa" };
    console.log('Reservation created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

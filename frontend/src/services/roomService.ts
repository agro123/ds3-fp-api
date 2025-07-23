import type { Room } from '../types';

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    console.log('Fetching rooms from API...');
    const response = await fetch('https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/rooms');
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Rooms API response:', data);
    
    // Manejar diferentes estructuras de respuesta
    const roomsData = data.rooms || data.data || data || [];
    
    console.log('Processed rooms data:', roomsData);
    return roomsData;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const fetchRoomById = async (id: string): Promise<Room | null> => {
  try {
    const rooms = await fetchRooms();
    return rooms.find((room: Room) => room.id === id) || null;
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    throw error;
  }
};

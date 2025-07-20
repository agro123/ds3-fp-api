import React, { useState, useEffect } from 'react';
import './NewReservation.css';

interface Room {
  id: string;
  name: string;
  location: string;
  capacity: number;
  equipment: string[];
  available: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const NewReservation: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('1');
  const [notes, setNotes] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // TODO: Cargar salas disponibles desde el microservicio
    const mockRooms: Room[] = [
      {
        id: '1',
        name: 'Sala A-101',
        location: 'Edificio A, Piso 1',
        capacity: 20,
        equipment: ['Proyector', 'Pizarra', 'WiFi'],
        available: true
      },
      {
        id: '2',
        name: 'Lab Computación B-205',
        location: 'Edificio B, Piso 2',
        capacity: 30,
        equipment: ['30 PCs', 'Proyector', 'WiFi'],
        available: true
      },
      {
        id: '3',
        name: 'Aula Magna C-100',
        location: 'Edificio C, Piso 1',
        capacity: 200,
        equipment: ['Sistema de Audio', 'Proyector', 'Micrófono'],
        available: true
      }
    ];

    setRooms(mockRooms);
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (selectedRoom && selectedDate) {
      // TODO: Cargar horarios disponibles desde el microservicio
      const mockTimeSlots: TimeSlot[] = [
        { time: '08:00', available: true },
        { time: '09:00', available: true },
        { time: '10:00', available: false },
        { time: '11:00', available: true },
        { time: '12:00', available: false },
        { time: '14:00', available: true },
        { time: '15:00', available: true },
        { time: '16:00', available: true },
        { time: '17:00', available: true },
        { time: '18:00', available: false }
      ];

      setTimeSlots(mockTimeSlots);
    }
  }, [selectedRoom, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!selectedRoom || !selectedDate || !selectedTime || !duration) {
      setError('Por favor completa todos los campos obligatorios');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Enviar reserva al microservicio
      const reservationData = {
        roomId: selectedRoom,
        date: selectedDate,
        startTime: selectedTime,
        duration: parseInt(duration),
        notes: notes
      };

      console.log('Creating reservation:', reservationData);
      
      // Simulación de delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Redirigir a la página de confirmación o mis reservas
      alert('Reserva creada exitosamente!');
      
    } catch {
      setError('Error al crear la reserva. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateEndTime = (startTime: string, durationHours: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + parseInt(durationHours);
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  return (
    <div className="new-reservation-container">
      <header className="new-reservation-header">
        <button className="back-button">← Volver</button>
        <h1>➕ Nueva Reserva</h1>
      </header>

      <div className="new-reservation-content">
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-section">
            <h2>🏫 Seleccionar Sala</h2>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="room-select"
              required
            >
              <option value="">Selecciona una sala...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} - {room.location} (👥 {room.capacity} personas)
                </option>
              ))}
            </select>

            {selectedRoomData && (
              <div className="room-preview">
                <h4>{selectedRoomData.name}</h4>
                <p>📍 {selectedRoomData.location}</p>
                <p>👥 Capacidad: {selectedRoomData.capacity} personas</p>
                <div className="equipment-list">
                  <strong>🔧 Equipamiento:</strong>
                  <div className="equipment-tags">
                    {selectedRoomData.equipment.map((item, index) => (
                      <span key={index} className="equipment-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>📅 Fecha y Hora</h2>
            
            <div className="date-time-group">
              <div className="new-reservation-form-group">
                <label htmlFor="date">Fecha</label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="new-reservation-form-group">
                <label htmlFor="duration">Duración (horas)</label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                >
                  <option value="1">1 hora</option>
                  <option value="2">2 horas</option>
                  <option value="3">3 horas</option>
                  <option value="4">4 horas</option>
                </select>
              </div>
            </div>

            {selectedRoom && selectedDate && (
              <div className="time-slots">
                <label>Hora de inicio</label>
                <div className="time-grid">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                      {!slot.available && <span className="unavailable-text">Ocupado</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedTime && duration && (
              <div className="time-summary">
                <strong>⏰ Resumen:</strong> {selectedTime} - {calculateEndTime(selectedTime, duration)} ({duration} hora{parseInt(duration) > 1 ? 's' : ''})
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>📝 Información Adicional</h2>
            <div className="new-reservation-form-group">
              <label htmlFor="notes">Notas (opcional)</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Propósito de la reserva, número de participantes, equipos especiales necesarios..."
                rows={4}
              />
            </div>
          </div>

          {error && <div className="new-reservation-error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-button">
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading || !selectedRoom || !selectedDate || !selectedTime}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Creando reserva...
                </>
              ) : (
                '📅 Crear Reserva'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReservation;

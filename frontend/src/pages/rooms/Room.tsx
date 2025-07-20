import React, { useState, useEffect } from 'react';
import './Room.css';

interface Room {
  id: string;
  name: string;
  location: string;
  building: string;
  floor: number;
  capacity: number;
  equipment: string[];
  description: string;
  images: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

interface TimeSlot {
  time: string;
  status: 'available' | 'occupied' | 'reserved';
  reservedBy?: string;
}

const Room: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Obtener ID de la sala desde la URL
    const roomId = window.location.pathname.split('/').pop();
    
    // TODO: Cargar datos de la sala desde el microservicio
    // Mock data por ahora
    const mockRoom: Room = {
      id: '1',
      name: 'Sala A-101',
      location: 'Edificio A, Piso 1',
      building: 'Edificio A',
      floor: 1,
      capacity: 20,
      equipment: ['Proyector HD', 'Pizarra', 'WiFi', 'Aire Acondicionado', 'Sistema de Audio', 'Enchufes'],
      description: 'Sala de estudio amplia y moderna, ideal para grupos de trabajo y presentaciones. Cuenta con excelente iluminación natural y ventilación.',
      images: ['/placeholder-room.jpg'],
      status: 'available'
    };

    const mockTimeSlots: TimeSlot[] = [
      { time: '08:00', status: 'available' },
      { time: '09:00', status: 'available' },
      { time: '10:00', status: 'occupied', reservedBy: 'Juan Pérez' },
      { time: '11:00', status: 'occupied', reservedBy: 'María García' },
      { time: '12:00', status: 'available' },
      { time: '14:00', status: 'available' },
      { time: '15:00', status: 'reserved', reservedBy: 'Carlos López' },
      { time: '16:00', status: 'available' },
      { time: '17:00', status: 'available' },
      { time: '18:00', status: 'available' }
    ];

    setTimeout(() => {
      setRoom(mockRoom);
      setTimeSlots(mockTimeSlots);
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
      setIsLoading(false);
    }, 1000);

    console.log('Loading room details for ID:', roomId);
  }, []);

  const getSlotStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'occupied': return '#ef4444';
      case 'reserved': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getSlotStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Libre';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      default: return 'Desconocido';
    }
  };

  const handleReserveNow = () => {
    // TODO: Navegar a página de nueva reserva con sala preseleccionada
    console.log('Reserving room:', room?.id);
  };

  const handleViewFullCalendar = () => {
    // TODO: Navegar a página de calendario completo
    console.log('Viewing full calendar for room:', room?.id);
  };

  if (isLoading) {
    return (
      <div className="room-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando información de la sala...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="room-container">
        <div className="error-state">
          <h2>Sala no encontrada</h2>
          <p>La sala que buscas no existe o no está disponible.</p>
          <button onClick={() => window.history.back()}>← Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="room-container">
      <header className="room-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Volver a Salas
        </button>
        <div className="header-info">
          <h1>{room.name}</h1>
          <span 
            className="status-badge"
            style={{ backgroundColor: room.status === 'available' ? '#22c55e' : room.status === 'occupied' ? '#f59e0b' : '#ef4444' }}
          >
            {room.status === 'available' ? 'Disponible' : room.status === 'occupied' ? 'Ocupada' : 'Mantenimiento'}
          </span>
        </div>
      </header>

      <div className="room-content">
        <div className="room-main">
          <section className="room-images">
            <div className="image-placeholder">
              <span>📸 Foto de la Sala</span>
              <p>Imagen no disponible</p>
            </div>
          </section>

          <section className="room-details">
            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-icon">📍</div>
                <div className="detail-info">
                  <h3>Ubicación</h3>
                  <p>{room.location}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">👥</div>
                <div className="detail-info">
                  <h3>Capacidad</h3>
                  <p>{room.capacity} personas</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">🏢</div>
                <div className="detail-info">
                  <h3>Edificio</h3>
                  <p>{room.building}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">🔢</div>
                <div className="detail-info">
                  <h3>Piso</h3>
                  <p>Piso {room.floor}</p>
                </div>
              </div>
            </div>

            <div className="description-section">
              <h3>📋 Descripción</h3>
              <p>{room.description}</p>
            </div>

            <div className="equipment-section">
              <h3>🔧 Equipamiento Disponible</h3>
              <div className="equipment-grid">
                {room.equipment.map((item, index) => (
                  <div key={index} className="equipment-item">
                    <span className="equipment-icon">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="room-sidebar">
          <section className="availability-section">
            <h3>📅 Disponibilidad Hoy</h3>
            <div className="date-selector">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="time-slots-container">
              {timeSlots.map((slot) => (
                <div 
                  key={slot.time} 
                  className={`time-slot ${slot.status}`}
                >
                  <div className="slot-time">{slot.time}</div>
                  <div className="slot-status">
                    <span 
                      className="status-dot"
                      style={{ backgroundColor: getSlotStatusColor(slot.status) }}
                    ></span>
                    <span className="status-text">
                      {getSlotStatusText(slot.status)}
                      {slot.reservedBy && (
                        <small> - {slot.reservedBy}</small>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="availability-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#22c55e' }}></span>
                <span>Libre</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#ef4444' }}></span>
                <span>Ocupada</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></span>
                <span>Reservada</span>
              </div>
            </div>
          </section>

          <section className="actions-section">
            <button 
              className="reserve-button primary"
              onClick={handleReserveNow}
              disabled={room.status !== 'available'}
            >
              📅 Reservar Ahora
            </button>
            <button 
              className="calendar-button secondary"
              onClick={handleViewFullCalendar}
            >
              📊 Ver Calendario Completo
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Room;

import React, { useState, useEffect } from 'react';
import './ReservationInfo.css';

interface ReservationDetails {
  id: string;
  roomName: string;
  roomLocation: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  notes?: string;
  qrCode?: string;
  user: {
    name: string;
    email: string;
    studentId: string;
  };
}

const ReservationInfo: React.FC = () => {
  const [reservation, setReservation] = useState<ReservationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Obtener ID de la reserva desde la URL
    const reservationId = window.location.pathname.split('/').pop();
    
    // TODO: Cargar datos de la reserva desde el microservicio
    // Mock data por ahora
    const mockReservation: ReservationDetails = {
      id: '1',
      roomName: 'Sala A-101',
      roomLocation: 'Edificio A, Piso 1',
      date: '2025-07-17',
      startTime: '14:00',
      endTime: '16:00',
      duration: '2 horas',
      status: 'confirmed',
      createdAt: '2025-07-15T10:30:00Z',
      notes: 'Reunión de proyecto final de Desarrollo de Software 3. Se requiere proyector para presentación.',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UniSalas-Reservation-1',
      user: {
        name: 'Juan Pérez',
        email: 'juan.perez@universidad.edu.co',
        studentId: '20231234567'
      }
    };

    setTimeout(() => {
      setReservation(mockReservation);
      setIsLoading(false);
    }, 1000);

    console.log('Loading reservation details for ID:', reservationId);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancelReservation = () => {
    // TODO: Implementar cancelación
    if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      console.log('Cancelling reservation:', reservation?.id);
    }
  };

  const handleModifyReservation = () => {
    // TODO: Navegar a página de modificación
    console.log('Modifying reservation:', reservation?.id);
  };

  const handlePrintReservation = () => {
    window.print();
  };

  const handleShareReservation = () => {
    if (navigator.share) {
      navigator.share({
        title: `Reserva ${reservation?.roomName}`,
        text: `Reserva confirmada para ${reservation?.roomName} el ${formatDate(reservation?.date || '')}`,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  if (isLoading) {
    return (
      <div className="reservation-info-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando información de la reserva...</p>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="reservation-info-container">
        <div className="error-state">
          <h2>Reserva no encontrada</h2>
          <p>La reserva que buscas no existe o no tienes permisos para verla.</p>
          <button onClick={() => window.history.back()}>← Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-info-container">
      <header className="reservation-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Volver a Mis Reservas
        </button>
        <div className="header-actions">
          <button className="action-btn share-btn" onClick={handleShareReservation}>
            📤 Compartir
          </button>
          <button className="action-btn print-btn" onClick={handlePrintReservation}>
            🖨️ Imprimir
          </button>
        </div>
      </header>

      <div className="reservation-content">
        <div className="reservation-main">
          <section className="reservation-card">
            <div className="card-header">
              <h1>📅 Información de Reserva</h1>
              <span 
                className="status-badge large"
                style={{ backgroundColor: getStatusColor(reservation.status) }}
              >
                {getStatusText(reservation.status)}
              </span>
            </div>

            <div className="reservation-details">
              <div className="detail-section">
                <h3>🏫 Sala</h3>
                <div className="detail-content">
                  <h2>{reservation.roomName}</h2>
                  <p>📍 {reservation.roomLocation}</p>
                </div>
              </div>

              <div className="detail-section">
                <h3>📅 Fecha y Hora</h3>
                <div className="detail-content">
                  <p className="date-text">{formatDate(reservation.date)}</p>
                  <p className="time-text">
                    ⏰ {reservation.startTime} - {reservation.endTime}
                  </p>
                  <p className="duration-text">
                    ⏲️ Duración: {reservation.duration}
                  </p>
                </div>
              </div>

              <div className="detail-section">
                <h3>👤 Información del Usuario</h3>
                <div className="detail-content">
                  <p><strong>Nombre:</strong> {reservation.user.name}</p>
                  <p><strong>Email:</strong> {reservation.user.email}</p>
                  <p><strong>Código:</strong> {reservation.user.studentId}</p>
                </div>
              </div>

              {reservation.notes && (
                <div className="detail-section">
                  <h3>📝 Notas</h3>
                  <div className="detail-content">
                    <p>{reservation.notes}</p>
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h3>📋 Detalles de la Reserva</h3>
                <div className="detail-content">
                  <p><strong>ID de Reserva:</strong> #{reservation.id}</p>
                  <p><strong>Fecha de Creación:</strong> {formatDateTime(reservation.createdAt)}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="reservation-sidebar">
          {reservation.qrCode && (
            <section className="qr-section">
              <h3>📱 Código QR</h3>
              <div className="qr-code">
                <img 
                  src={reservation.qrCode} 
                  alt="QR Code para la reserva"
                />
                <p>Muestra este código al ingresar a la sala</p>
              </div>
            </section>
          )}

          {reservation.status === 'confirmed' && (
            <section className="actions-section">
              <h3>⚡ Acciones</h3>
              <div className="action-buttons">
                <button 
                  className="action-button modify"
                  onClick={handleModifyReservation}
                >
                  ✏️ Modificar Reserva
                </button>
                <button 
                  className="action-button cancel"
                  onClick={handleCancelReservation}
                >
                  ❌ Cancelar Reserva
                </button>
              </div>
            </section>
          )}

          <section className="info-section">
            <h3>ℹ️ Información Importante</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">⏰</span>
                <span>Llega 5 minutos antes de tu reserva</span>
              </div>
              <div className="info-item">
                <span className="info-icon">📱</span>
                <span>Presenta tu código QR al ingresar</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🚫</span>
                <span>No está permitido fumar o consumir alimentos</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🔧</span>
                <span>Reporta cualquier problema técnico</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ReservationInfo;

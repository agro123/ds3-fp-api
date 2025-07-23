import React from "react";
import "./ReservationInfo.css";
import { Sidebar } from "../../components";
import { useState, useEffect } from "react";
import type { Room, Reservation } from "../../types";
import { useParams } from "react-router-dom";
import { getRoomImage } from "../../utils";
import { fetchReservationById, fetchRooms } from "../../services";
import { formatDisplayDate, formatDisplayTime } from "../../utils/dateUtils";
import { useAuth } from "../../context/useAuth";

const ReservationInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [myReservation, setMyReservation] = useState<Reservation | null>(null);
  const [myRoom, setMyRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  console.log('ReservationInfo component loaded with ID:', id);

  useEffect(() => {
    const loadReservation = async () => {
      if (!id) {
        setError("ID de reservación no válido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log('ReservationInfo: Fetching reservation details for ID:', id);
        console.log('ReservationInfo: URL parameter type:', typeof id);
        console.log('ReservationInfo: URL parameter value (raw):', JSON.stringify(id));
        
        const reservation = await fetchReservationById(id);
        console.log("ReservationInfo: Fetched reservation:", reservation);
        
        if (reservation) {
          setMyReservation(reservation);
          console.log('ReservationInfo: Successfully set reservation:', reservation);
        } else {
          const errorMsg = `Reservación con ID "${id}" no encontrada`;
          console.error('ReservationInfo:', errorMsg);
          setError(errorMsg);
        }
      } catch (error) {
        console.error('ReservationInfo: Error fetching reservation:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar la reservación');
      } finally {
        setLoading(false);
      }
    };

    loadReservation();
  }, [id]);

  useEffect(() => {
    const loadRoom = async () => {
      if (myReservation) {
        try {
          console.log('Looking for room with name:', myReservation.roomName);
          const rooms = await fetchRooms();
          console.log('Available rooms:', rooms.map(r => ({ id: r.id, name: r.roomName })));
          
          const foundRoom = rooms.find(
            (item: Room) => {
              // Try exact match first
              if (item.roomName === myReservation.roomName) {
                return true;
              }
              // Try case-insensitive match
              if (item.roomName.toLowerCase() === myReservation.roomName.toLowerCase()) {
                return true;
              }
              // Try partial match (in case of encoding issues)
              if (item.roomName.includes(myReservation.roomName) || 
                  myReservation.roomName.includes(item.roomName)) {
                return true;
              }
              return false;
            }
          );
          
          console.log("Room found:", foundRoom);
          setMyRoom(foundRoom ?? null);
          
          if (!foundRoom) {
            console.warn(`Room with name "${myReservation.roomName}" not found in available rooms`);
          }
        } catch (error) {
          console.error('Error fetching room:', error);
        }
      }
    };

    loadRoom();
  }, [myReservation]);

  // Función para mostrar el modal de cancelación
  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  // Función para cerrar el modal sin cancelar
  const handleModalClose = () => {
    setShowCancelModal(false);
  };

  // Función para confirmar la cancelación
  const handleConfirmCancel = async () => {
    if (!myReservation?.id) {
      setError("No se puede cancelar: ID de reservación no válido");
      return;
    }

    if (!token) {
      setError("No se puede cancelar: Usuario no autenticado");
      return;
    }

    try {
      setIsUpdating(true);
      console.log('Canceling reservation with ID:', myReservation.id);

      const response = await fetch(`https://qbpvpt3iza.execute-api.us-east-2.amazonaws.com/reservations/${myReservation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'cancelled'
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Cancel response:', result);

      // Actualizar el estado local de la reservación
      setMyReservation(prev => prev ? { ...prev, status: 'cancelled' } : null);
      setShowCancelModal(false);
      
      console.log('Reservation cancelled successfully');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      setError(error instanceof Error ? error.message : 'Error al cancelar la reservación');
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    return (
      <div className="reservation-info-container">
        <Sidebar />
        <main className="reservation-info-main">
          <header className="reservation-info-header">
            <h1 className="reservation-info-main-title">Error</h1>
          </header>
          <div className="reservation-info-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="reservation-info-container">
      <Sidebar />
      <main className="reservation-info-main">
        <header className="reservation-info-header">
          <h1 className="reservation-info-main-title">
            Información de Reserva<span>#{myReservation?.id}</span>
          </h1>
        </header>
        {loading ? (
          <div className="reservation-info-loading">
            <p>Cargando información de la reserva...</p>
          </div>
        ) : !myReservation ? (
          <div className="reservation-info-error">
            <h3>Reservación no encontrada</h3>
            <p>No se pudo encontrar la reservación con ID: <strong>{id}</strong></p>
            <p>Verifica que el ID sea correcto y que tengas permisos para acceder a esta reservación.</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        ) : (
          <div className="reservation-info-content">
            {myRoom ? (
              <div
                className="reservation-info-picture"
                style={{
                  backgroundImage: `url(${getRoomImage(
                    myRoom.roomName,
                    myRoom.roomType
                  )})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            ) : (
              <div className="reservation-info-picture" style={{ 
                backgroundColor: "#f0f0f0", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: "#666"
              }}>
                <p>Imagen de sala no disponible</p>
              </div>
            )}
            <div className="reservation-info-details">
              <div className="reservation-info-room">
                <h3>Detalles de la Sala</h3>
                <div className="reservation-info-room-information">
                  <dl>
                    <dt>Nombre de sala</dt>
                    <dd>{myRoom?.roomName || myReservation.roomName}</dd>
                    <dt>Capacidad</dt>
                    <dd>{myRoom?.capacity ? `${myRoom.capacity} Personas` : 'No disponible'}</dd>
                  </dl>
                  <section>
                    <span className="reservation-info-title-span">
                      Equipamiento
                    </span>
                    <ul>
                      {myRoom?.equipment ? (
                        myRoom.equipment.map((e, index) => (
                          <li key={index}>{e}</li>
                        ))
                      ) : (
                        <li>Información de equipamiento no disponible</li>
                      )}
                    </ul>
                  </section>
                </div>
              </div>
              <div className="reservation-info-read">
                <h3>Información Reserva</h3>
                <section>
                  <dl>
                    <dt>Fecha</dt>
                    <dd>{formatDisplayDate(myReservation.date)}</dd>
                    <dt>Hora Inicio</dt>
                    <dd>{formatDisplayTime(myReservation.startTime)}</dd>
                  </dl>
                  <dl>
                    <dt>Estado</dt>
                    <dd>
                      <span className={`status-badge status-${myReservation.status}`}>
                        {myReservation.status === 'confirmed' ? 'Confirmada' : 
                         myReservation.status === 'pending' ? 'Pendiente' : 
                         myReservation.status === 'cancelled' ? 'Cancelada' : 
                         myReservation.status}
                      </span>
                    </dd>
                    <dt>Hora Finalización</dt>
                    <dd>{formatDisplayTime(myReservation.endTime)}</dd>
                  </dl>
                </section>
                <div className="reservation-info-options">
                  <button 
                    className="new-reservation-btn"
                    disabled={myReservation.status === 'cancelled'}
                  >
                    Modificar Reservación
                  </button>
                  <button 
                    className="cancel-reservation-btn"
                    onClick={handleCancelClick}
                    disabled={myReservation.status === 'cancelled'}
                  >
                    {myReservation.status === 'cancelled' ? 'Reservación Cancelada' : 'Cancelar Reservación'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirmar Cancelación</h3>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que quieres cancelar esta reservación?</p>
              <p><strong>Sala:</strong> {myReservation?.roomName}</p>
              <p><strong>Fecha:</strong> {myReservation ? formatDisplayDate(myReservation.date) : ''}</p>
              <p><strong>Hora:</strong> {myReservation ? formatDisplayTime(myReservation.startTime) : ''} - {myReservation ? formatDisplayTime(myReservation.endTime) : ''}</p>
              <p className="warning-text">Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn-cancel"
                onClick={handleModalClose}
                disabled={isUpdating}
              >
                No, mantener reservación
              </button>
              <button 
                className="modal-btn-confirm"
                onClick={handleConfirmCancel}
                disabled={isUpdating}
              >
                {isUpdating ? 'Cancelando...' : 'Sí, cancelar reservación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationInfo;

import React from "react";
import { Sidebar } from "../../components";
import "./Room.css";
import { useState, useEffect } from "react";
import type { Room as RoomType } from "../../types";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomImage } from "../../utils";
import { fetchRoomById } from "../../services/roomService";

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [myRoom, setRoom] = useState<RoomType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoom = async () => {
      if (!id) {
        setError("ID de sala no válido");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching room details for ID:', id);
        const room = await fetchRoomById(id);
        setRoom(room);
        
        if (!room) {
          setError("Sala no encontrada");
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar la sala');
      } finally {
        setIsLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  if (isLoading) {
    return (
      <div className="room-container">
        <Sidebar />
        <main className="room-main">
          <div className="room-loading">
            <p>Cargando información de la sala...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="room-container">
        <Sidebar />
        <main className="room-main">
          <div className="room-error">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="room-container">
      <Sidebar />
      <main className="room-main">
        <header className="room-header">
          <h1>Información de la sala</h1>
        </header>
        {myRoom ? (
          <div className="room-content">
            <div
              className="room-picture"
              style={{
                backgroundImage: `url(${getRoomImage(myRoom.roomName, myRoom.roomType)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="room-details">
              <h3>Detalles de la Sala</h3>
              <div className="room-information">
                <dl>
                  <dt>Nombre de sala</dt>
                  <dd>{myRoom.roomName}</dd>
                  <dt>Capacidad</dt>
                  <dd>{myRoom.capacity} Personas</dd>
                </dl>
                <section>
                  <span className="room_title_span">Equipamiento</span>
                  <ul>
                    {myRoom.equipment.map((e: string, index: number) => (
                      <li key={index}>{e}</li>
                    ))}
                  </ul>
                </section>
              </div>
              <button 
                className="new-reservation-btn"
                onClick={() => navigate('/make-reservation', { 
                  state: { 
                    selectedRoomId: myRoom?.id,
                    selectedRoomName: myRoom?.roomName 
                  } 
                })}
              >
                Realizar reserva
              </button>
            </div>
          </div>
        ) : (
          <div className="room-loading">
            <p>Cargando información de la sala...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Room;

import React from "react";
import { Sidebar } from "../../components";
import "./Room.css";
import { useState, useEffect } from "react";
import type { Room } from "../../types";
import { mockRooms } from "../../data";
import { useParams } from "react-router-dom";
import { getRoomImage } from "../../utils";

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [myRoom, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const roomId = id;
    setTimeout(() => {
      const room = mockRooms.find((item) => item.id === roomId);
      setRoom(room ?? null);
    }, 1000);
  }, [id]);

  return (
    <div className="room-container">
      <Sidebar userName="Juan Pérez" />
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
                    {myRoom.equipment.map((e, index) => (
                      <li key={index}>{e}</li>
                    ))}
                  </ul>
                </section>
              </div>
              <button className="new-reservation-btn">Realizar reserva</button>
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

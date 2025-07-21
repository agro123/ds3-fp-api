import React from "react";
import { Sidebar } from "../../components";
import auditorio from "../../assets/images/auditoriums-background.jpg";
import "./Room.css";
import { useState, useEffect } from "react";
import type {Room} from "../../types";
import { mockRooms } from "../../data";
import { useParams } from "react-router-dom";

const Room: React.FC = () => {
const { id } = useParams<{ id: string }>();
const [myRoom, setRoom] = useState<Room | null>(null);

useEffect(() => {
  if (!id){
    return;
  }

  const roomId = id;
  setTimeout(() => {
    const room = mockRooms.find(item => item.id === roomId);
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
        <div className="room-body">
          <div className="room-picture">
            <img src={auditorio} alt="" />
          </div>
          <div className="room-card">
            <h3>Información de la sala</h3>
            <div className="room-information">
              <dl>
                  <dt>Nombre de sala</dt>
                  <dd>{myRoom?.roomName}</dd>
                  <dt>Capacidad</dt>
                  <dd>{myRoom?.capacity} Personas</dd>
              </dl>
              <section>
                <span className="room_title_span">Equipamiento</span>
                <ul>
                  {(myRoom?.equipment ?? []).map((e, index) => (
                    <li key={index}>{e}</li>
                  ))}
                </ul>
              </section>
            </div>
            <button className="new-reservation-btn">Realizar reserva</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Room;

import React from "react";
import "./ReservationInfo.css";
import { Sidebar } from "../../components";
import auditorio from "../../assets/images/auditoriums-background.jpg";
import { useState, useEffect } from "react";
import type { Room, Reservation } from "../../types";
import { mockRooms, mockReservations } from "../../data";
import { useParams } from "react-router-dom";

const ReservationInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [myReservation, setReservation] = useState<Reservation | null>(null);
  const [myRoom, setRoom] = useState<Room | null>(null);
  console.log("ids ", id);

  useEffect(() => {
    if (!id) return;
    const roomId = id;

    setTimeout(() => {
      const reservation = mockReservations.find((item) => item.id === roomId);
      console.log("reservation ", reservation);
      setReservation(reservation ?? null);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (myReservation) {
      const foundRoom = mockRooms.find(
        (item) => item.roomName === myReservation.roomName
      );
      console.log("room encontrada", foundRoom);
      setRoom(foundRoom ?? null);
    }
  }, [myReservation]);

  // console.log(mockRooms);

  return (
    <div className="reservation-info-container">
      <Sidebar userName="Juan Pérez" />
      <main className="reservation-info-main">
        <header className="reservation-info-header">
          <span className="reservation-info-main-title">
            Información de Reserva - #154812
          </span>
        </header>
        <div className="reservation-info-body">
          <div className="reservation-info-picture">
            <img src={auditorio} alt="" />
          </div>
          <div className="reservation-info-card">
            <div className="reservation-info-general">
              <h3>Información de la sala</h3>
              <div className="reservation-info-information">
                <dl>
                  <dt>Nombre de sala</dt>
                  <dd>{myRoom?.roomName}</dd>
                  <dt>Capacidad</dt>
                  <dd>{myRoom?.capacity} Personas</dd>
                </dl>
                <section>
                  <span className="reservation-info-title-span">
                    Equipamiento
                  </span>
                  <ul>
                    {(myRoom?.equipment ?? []).map((e, index) => (
                      <li key={index}>{e}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
            <div className="reservation-info-read">
              <h3>Información Reserva</h3>
              <section>
                <dl>
                  <dt>Fecha</dt>
                  <dd>{myReservation?.date}</dd>
                  <dt>Hora Inicio</dt>
                  <dd>{myReservation?.startTime}</dd>
                </dl>
                <dl>
                  <dt>Cantidad de Horas</dt>
                  <dd>{myReservation?.duration}</dd>
                  <dt>Hora Finalización</dt>
                  <dd>{myReservation?.endTime}</dd>
                </dl>
              </section>
              <button className="new-reservation-btn">
                Modificar Reservación
              </button>
              <button
                className="cancel-reservation-btn"
                style={{ marginTop: 10 }}
              >
                Cancelar Reservación
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationInfo;

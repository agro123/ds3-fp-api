import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import { ReservationCard, Sidebar } from "../../components";
import type { Reservation } from "../../types";
import { mockReservations } from "../../data";

const Home: React.FC = () => {
  const [upcomingReservations, setUpcomingReservations] = useState<
    Reservation[]
  >([]);

  // Drag scroll functionality for reservations list
  const reservationsListRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // TODO: Cargar datos desde los microservicios
    // Mock data por ahora - obtener solo las primeras 4 reservas
    setUpcomingReservations(mockReservations.slice(0, 4));
  }, []);

  // Drag scroll event handlers for reservations list
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!reservationsListRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - reservationsListRef.current.offsetLeft);
    setScrollLeft(reservationsListRef.current.scrollLeft);
    reservationsListRef.current.classList.add("dragging");
    // Prevenir selección de texto durante el drag
    document.body.style.userSelect = "none";
  };

  const handleMouseLeave = () => {
    if (!reservationsListRef.current) return;
    setIsDragging(false);
    reservationsListRef.current.classList.remove("dragging");
    document.body.style.userSelect = "";
  };

  const handleMouseUp = () => {
    if (!reservationsListRef.current) return;
    setIsDragging(false);
    reservationsListRef.current.classList.remove("dragging");
    document.body.style.userSelect = "";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !reservationsListRef.current) return;
    e.preventDefault();
    const x = e.pageX - reservationsListRef.current.offsetLeft;
    const walk = x - startX; // Movimiento 1:1 para scroll pixel por pixel
    reservationsListRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="home-container">
      <Sidebar userName="Juan Pérez" />

      <main className="home-main">
        <section className="home-reservations">
          <div className="home-section-header">
            <h2> Mis Reservas</h2>
            <a href="/reservations" className="home-section-header-link">
              Ver todas
            </a>
          </div>
          <div
            className="home-reservations-list"
            ref={reservationsListRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {upcomingReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                id={reservation.id}
                roomName={reservation.roomName}
                roomType={reservation.roomType}
                startTime={reservation.startTime}
                endTime={reservation.endTime}
                date={reservation.date}
                reservationStatus={reservation.reservationStatus}
              />
            ))}
          </div>
          {upcomingReservations.length === 0 && (
            <div className="no-reservations">
              <p>No tienes reservas próximas</p>
              <button className="cta-button">Hacer una reserva</button>
            </div>
          )}
        </section>
        <section className="home-type-rooms">
          <div className="home-section-header">
            <h2>Espacios por Categoria</h2>
            <a href="/rooms" className="home-section-header-link">
              Ver todos
            </a>
          </div>
          <div className="home-type-rooms-list">
            <div className="category-room-card">
              <div className="category-room-card-content">
                <h1>Auditorios</h1>
              </div>
            </div>
            <div className="category-room-card">
              <div className="category-room-card-content">
                <h1>Salones</h1>
              </div>
            </div>
            <div className="category-room-card">
              <div className="category-room-card-content">
                <h1>Laboratorios</h1>
              </div>
            </div>
            <div className="category-room-card">
              <div className="category-room-card-content">
                <h1>Salas de Cómputo</h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

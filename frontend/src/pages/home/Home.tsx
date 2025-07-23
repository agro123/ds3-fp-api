import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import { ReservationCard, Sidebar } from "../../components";
import type { Reservation } from "../../types";
import { fetchReservations } from "../../services";
import { useAuth } from "../../context/useAuth";

const Home: React.FC = () => {
  const [upcomingReservations, setUpcomingReservations] = useState<
    Reservation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Drag scroll functionality for reservations list
  const reservationsListRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const reservationsData = await fetchReservations();
        
        // Filtrar reservaciones del usuario actual si está logueado
        let userReservations = reservationsData;
        if (user?.userId) {
          userReservations = reservationsData.filter(r => r.userId === user.userId);
        }
        
        // Mostrar solo las primeras 4 reservas próximas
        setUpcomingReservations(userReservations.slice(0, 4));
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar las reservaciones');
      } finally {
        setIsLoading(false);
      }
    };

    loadReservations();
  }, [user]);

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

  if (isLoading) {
    return (
      <div className="home-container">
        <Sidebar />
        <main className="home-main">
          <div className="loading-state">
            <p>Cargando reservaciones...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Sidebar />

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
            {error ? (
              <div className="error-message">
                <p>Error al cargar las reservaciones: {error}</p>
                <button onClick={() => window.location.reload()}>Reintentar</button>
              </div>
            ) : upcomingReservations.length === 0 ? (
              <div className="empty-reservations">
                <p>No tienes reservaciones próximas</p>
                <a href="/make-reservation" className="cta-button">Crear nueva reserva</a>
              </div>
            ) : (
              upcomingReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  id={reservation.id}
                  roomName={reservation.roomName}
                    roomType={reservation.roomType}
                  startTime={reservation.startTime}
                  endTime={reservation.endTime}
                  date={reservation.date}
                  status={reservation.status}
                />
              ))
            )}
          </div>
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

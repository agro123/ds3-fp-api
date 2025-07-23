import React, { useState, useEffect } from "react";
import "./Reservations.css";
import { ReservationCard, Sidebar } from "../../components";
import type { Reservation, RoomTypeFilter, StatusFilter, SortBy } from "../../types";
import { mockReservations } from "../../data";

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [roomTypeFilter, setRoomTypeFilter] = useState<RoomTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // TODO: Cargar reservas desde el microservicio
    // Mock data por ahora
    setTimeout(() => {
      setReservations(mockReservations);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getFilteredAndSortedReservations = () => {
    let filtered = reservations;

    // Filtrar por tipo de sala
    if (roomTypeFilter !== "all") {
      filtered = filtered.filter((r) => r.roomType === roomTypeFilter);
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.reservationStatus === statusFilter);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "roomType":
          return a.roomType.localeCompare(b.roomType);
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "status":
          return a.reservationStatus.localeCompare(b.reservationStatus);
        case "name":
          return a.roomName.localeCompare(b.roomName);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getPaginatedReservations = () => {
    const filteredReservations = getFilteredAndSortedReservations();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredReservations.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filteredReservations = getFilteredAndSortedReservations();
    return Math.ceil(filteredReservations.length / itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [roomTypeFilter, statusFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="reservations-container">
        <Sidebar userName="Juan Pérez" />
        <div className="reservations-main">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Cargando tus reservas...</p>
          </div>
        </div>
      </div>
    );
  }

  const paginatedReservations = getPaginatedReservations();
  const totalPages = getTotalPages();

  return (
    <div className="reservations-container">
      <Sidebar userName="Juan Pérez" />

      <main className="reservations-main">
        <header className="reservations-header">
          <h1>Mis Reservas</h1>
          <button className="new-reservation-btn">Nueva Reserva +</button>
        </header>

        <div className="reservations-filters">
          <div className="filter-group">
            <label htmlFor="roomType">Tipo de sala:</label>
            <select
              id="roomType"
              value={roomTypeFilter}
              onChange={(e) =>
                setRoomTypeFilter(e.target.value as RoomTypeFilter)
              }
              className="filter-select"
            >
              <option value="all">Todos los tipos</option>
              <option value="Auditorios">Auditorios</option>
              <option value="Laboratorio">Laboratorio</option>
              <option value="Sala de cómputo">Sala de cómputo</option>
              <option value="Salon">Salón</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status">Estado de reserva:</label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="filter-select"
            >
              <option value="all">Todos los estados</option>
              <option value="confirmed">Confirmada</option>
              <option value="pending">Pendiente</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sortBy">Ordenar por:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="filter-select"
            >
              <option value="date">Fecha</option>
              <option value="roomType">Tipo de sala</option>
              <option value="status">Estado</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>

        <div className="reservations-content">
          {paginatedReservations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No tienes reservas en esta categoría</h3>
              <p>¿Te gustaría hacer una nueva reserva?</p>
              <button className="cta-button">Explorar Salas</button>
            </div>
          ) : (
            <>
              <div className="reservations-grid">
                {paginatedReservations.map((reservation) => (
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

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ← Anterior
                  </button>

                  <div className="pagination-info">
                    <span className="pagination-text">
                      Página {currentPage} de {totalPages}
                    </span>
                  </div>

                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reservations;

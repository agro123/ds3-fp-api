import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Reservations.css";
import { ReservationCard, Sidebar } from "../../components";
import type { Reservation, RoomTypeFilter, StatusFilter, SortBy } from "../../types";
import { fetchReservations } from "../../services";
import { useAuth } from "../../context/useAuth";

const Reservations: React.FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [roomTypeFilter, setRoomTypeFilter] = useState<RoomTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { user } = useAuth();

  useEffect(() => {
    const loadReservations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const reservationsData = await fetchReservations();
        
        // Filtrar reservaciones del usuario actual si está logueado
        let userReservations = reservationsData;
        if (user?.id) {
          userReservations = reservationsData.filter(r => r.userId === user.id);
        }
        
        setReservations(userReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar las reservaciones');
      } finally {
        setIsLoading(false);
      }
    };

    loadReservations();
  }, [user]);

  const getFilteredAndSortedReservations = () => {
    let filtered = reservations;

    // Filtrar por tipo de sala
    if (roomTypeFilter !== "all") {
      filtered = filtered.filter((r) => r.roomType === roomTypeFilter);
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "roomType":
          return a.roomType.localeCompare(b.roomType);
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "status":
          return a.status.localeCompare(b.status);
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
        <Sidebar />
        <div className="reservations-main">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Cargando tus reservas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reservations-container">
        <Sidebar />
        <div className="reservations-main">
          <div className="error-state">
            <h3>Error al cargar las reservaciones</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  const paginatedReservations = getPaginatedReservations();
  const totalPages = getTotalPages();

  return (
    <div className="reservations-container">
      <Sidebar />

      <main className="reservations-main">
        <header className="reservations-header">
          <h1>Mis Reservas</h1>
          <button 
            className="new-reservation-btn"
            onClick={() => navigate('/make-reservation')}
          >
            Nueva Reserva +
          </button>
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
                    status={reservation.status}
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

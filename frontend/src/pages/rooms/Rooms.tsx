import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Rooms.css";
import { RoomCard, Sidebar } from "../../components";
import type { Room, RoomTypeFilter, CapacityFilter, RoomSortBy } from "../../types";
import { fetchRooms } from "../../services/roomService";

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypeFilter, setRoomTypeFilter] = useState<RoomTypeFilter>("all");
  const [capacityFilter, setCapacityFilter] = useState<CapacityFilter>("all");
  const [sortBy, setSortBy] = useState<RoomSortBy>("name");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Aplicar filtro automático si viene desde navegación con state
  useEffect(() => {
    if (location.state?.filterType) {
      const filterType = location.state.filterType as RoomTypeFilter;
      console.log('Applying automatic filter:', filterType);
      setRoomTypeFilter(filterType);
      // Limpiar el state para evitar que se aplique en futuras visitas
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const roomsData = await fetchRooms();
        setRooms(roomsData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error al cargar las salas');
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, []);

  const getFilteredAndSortedRooms = () => {
    let filtered = rooms;

    // Filtrar por tipo de sala
    if (roomTypeFilter !== "all") {
      filtered = filtered.filter((r) => r.roomType === roomTypeFilter);
    }

    // Filtrar por capacidad
    if (capacityFilter !== "all") {
      filtered = filtered.filter((r) => {
        switch (capacityFilter) {
          case "1-10":
            return r.capacity >= 1 && r.capacity <= 10;
          case "11-20":
            return r.capacity >= 11 && r.capacity <= 20;
          case "21-30":
            return r.capacity >= 21 && r.capacity <= 30;
          case "31-50":
            return r.capacity >= 31 && r.capacity <= 50;
          case "50+":
            return r.capacity > 50;
          default:
            return true;
        }
      });
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "roomType":
          return a.roomType.localeCompare(b.roomType);
        case "capacity":
          return b.capacity - a.capacity; // Descendente
        case "name":
          return a.roomName.localeCompare(b.roomName);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getPaginatedRooms = () => {
    const filteredRooms = getFilteredAndSortedRooms();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRooms.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filteredRooms = getFilteredAndSortedRooms();
    return Math.ceil(filteredRooms.length / itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [roomTypeFilter, capacityFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="rooms-container">
        <Sidebar />
        <div className="rooms-main">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Cargando salas disponibles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rooms-container">
        <Sidebar />
        <div className="rooms-main">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Error al cargar las salas</h3>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const paginatedRooms = getPaginatedRooms();
  const totalPages = getTotalPages();

  return (
    <div className="rooms-container">
      <Sidebar />

      <main className="rooms-main">
        <header className="rooms-header">
          <h1>Salas Disponibles</h1>
          <button 
            className="new-reservation-btn"
            onClick={() => navigate('/make-reservation')}
          >
            Reservar Sala +
          </button>
        </header>

        <div className="rooms-filters">
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
            <label htmlFor="capacity">Capacidad:</label>
            <select
              id="capacity"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value as CapacityFilter)}
              className="filter-select"
            >
              <option value="all">Todas las capacidades</option>
              <option value="1-10">1-10 personas</option>
              <option value="11-20">11-20 personas</option>
              <option value="21-30">21-30 personas</option>
              <option value="31-50">31-50 personas</option>
              <option value="50+">Más de 50 personas</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sortBy">Ordenar por:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as RoomSortBy)}
              className="filter-select"
            >
              <option value="name">Nombre</option>
              <option value="roomType">Tipo de sala</option>
              <option value="capacity">Capacidad</option>
            </select>
          </div>
        </div>

        <div className="rooms-content">
          {paginatedRooms.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏢</div>
              <h3>No se encontraron salas con estos filtros</h3>
              <p>Intenta ajustar los filtros de búsqueda</p>
              <button className="cta-button">Ver Todas las Salas</button>
            </div>
          ) : (
            <>
              <div className="rooms-grid">
                {paginatedRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    id={room.id}
                    roomName={room.roomName}
                    roomType={room.roomType}
                    capacity={room.capacity}
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

export default Rooms;

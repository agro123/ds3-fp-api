import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NewReservation.css";
import { Sidebar } from "../../components";
import { getRoomImage } from "../../utils";
import type { Room } from "../../types";
import { fetchRooms } from "../../services/roomService";
import { createReservation, type CreateReservationData } from "../../services/reservationService";
import { useAuth } from "../../context/useAuth";

const NewReservation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasProcessedPreSelection, setHasProcessedPreSelection] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    selectedTimeSlot: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load rooms
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const roomsData = await fetchRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar las salas');
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, []);

  // Handle room selection after rooms are loaded
  useEffect(() => {
    if (rooms.length > 0 && !hasProcessedPreSelection) {
      const preSelectedRoomId = location.state?.selectedRoomId;
      console.log('Pre-selected room ID from navigation:', preSelectedRoomId);
      console.log('Available rooms:', rooms.map(r => ({ id: r.id, name: r.roomName })));
      
      if (preSelectedRoomId) {
        // Find and select the pre-selected room
        const preSelectedRoom = rooms.find((room: Room) => room.id === preSelectedRoomId);
        if (preSelectedRoom) {
          console.log('Found and selecting pre-selected room:', preSelectedRoom.roomName);
          setSelectedRoom(preSelectedRoom);
        } else {
          console.log('Pre-selected room not found, using first room');
          setSelectedRoom(rooms[0]);
        }
      } else {
        console.log('No pre-selected room, using first room');
        setSelectedRoom(rooms[0]);
      }
      setHasProcessedPreSelection(true);
    }
  }, [rooms, hasProcessedPreSelection, location.state?.selectedRoomId]);

  const handleRoomChange = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    setSelectedRoom(room || null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setSubmitError(null);
  };

  const handleTimeSlotChange = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTimeSlot: timeSlot
    }));
    
    // Auto-fill start and end times based on time slot
    const timeMapping: { [key: string]: { start: string; end: string } } = {
      "8-10": { start: "08:00", end: "10:00" },
      "10-12": { start: "10:00", end: "12:00" },
      "2-4": { start: "14:00", end: "16:00" },
      "4-6": { start: "16:00", end: "18:00" },
      "6-8": { start: "18:00", end: "20:00" },
      "8-10pm": { start: "20:00", end: "22:00" }
    };

    if (timeMapping[timeSlot]) {
      setFormData(prev => ({
        ...prev,
        startTime: timeMapping[timeSlot].start,
        endTime: timeMapping[timeSlot].end
      }));
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setSubmitError("Error: Usuario no autenticado");
      return;
    }

    if (!selectedRoom) {
      setSubmitError("Por favor selecciona una sala");
      return;
    }

    if (!formData.date || !formData.startTime || !formData.endTime) {
      setSubmitError("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const reservationData: CreateReservationData = {
        user_id: user.id,
        room_id: selectedRoom.id,
        roomName: selectedRoom.roomName,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime
      };

      await createReservation(reservationData);
      setSubmitSuccess(true);
      
      // Redirect to reservations page after 2 seconds
      setTimeout(() => {
        navigate('/reservations');
      }, 2000);

    } catch (error) {
      console.error('Error creating reservation:', error);
      setSubmitError(error instanceof Error ? error.message : 'Error al crear la reserva');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="new-reservation-container">
        <Sidebar />
        <main className="new-reservation-main">
          <div className="loading-state">
            <p>Cargando salas disponibles...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="new-reservation-container">
        <Sidebar />
        <main className="new-reservation-main">
          <div className="error-state">
            <h3>Error al cargar las salas</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="new-reservation-container">
      <Sidebar />
      <main className="new-reservation-main">
        <header className="new-reservation-header">
          <h1>Nueva Reserva</h1>
        </header>
        <div className="new-reservation-content">
          <div className="new-reservation-picture">
            {selectedRoom ? (
              <div
                style={{
                  backgroundImage: `url(${getRoomImage(
                    selectedRoom.roomName,
                    selectedRoom.roomType
                  )})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div style={{ padding: "20px", textAlign: "center" }}>
                Selecciona una sala
              </div>
            )}
          </div>
          <div 
            className="new-reservation-details"
            style={{
              overflowY: "auto",
              maxHeight: "calc(100vh - 120px)",
              paddingRight: "10px",
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #f1f1f1"
            }}
          >
            <div className="new-reservation-info-room">
              <h3>Detalles de la Sala</h3>
              <div className="new-reservation-room-information">
                <dl>
                  <dt>Nombre de sala</dt>
                  <dd>
                    <div
                      className="room-selector"
                      style={{ marginBottom: "20px" }}
                    >
                      <select
                        id="room-select"
                        value={selectedRoom?.id || ""}
                        onChange={(e) => handleRoomChange(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          marginTop: "5px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      >
                        <option value="">Selecciona una sala...</option>

                        <optgroup label="🎭 Auditorios">
                          {rooms
                            .filter((room: Room) => room.roomType === "Auditorios")
                            .map((room: Room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                        </optgroup>

                        <optgroup label="🏫 Salones">
                          {rooms
                            .filter((room: Room) => room.roomType === "Salon")
                            .map((room: Room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                        </optgroup>

                        <optgroup label="🔬 Laboratorios">
                          {rooms
                            .filter((room: Room) => room.roomType === "Laboratorio")
                            .map((room: Room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                        </optgroup>

                        <optgroup label="💻 Salas de Cómputo">
                          {rooms
                            .filter(
                              (room: Room) => room.roomType === "Sala de cómputo"
                            )
                            .map((room: Room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                        </optgroup>
                      </select>
                    </div>
                  </dd>
                  <dt>Capacidad</dt>
                  <dd>{selectedRoom?.capacity || 0} personas</dd>
                </dl>
                <section>
                  <span className="new-reservation-title-span">
                    Equipamiento
                  </span>
                  <ul>
                    {selectedRoom?.equipment?.map((item, index) => (
                      <li key={index}>{item}</li>
                    )) || <li>No hay equipamiento disponible</li>}
                  </ul>
                </section>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="new-reservation-form-create">
              {submitError && (
                <div style={{ padding: "10px", backgroundColor: "#fee", color: "#c00", borderRadius: "4px", marginBottom: "20px" }}>
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div style={{ padding: "10px", backgroundColor: "#efe", color: "#080", borderRadius: "4px", marginBottom: "20px" }}>
                  ¡Reserva creada exitosamente! Redirigiendo...
                </div>
              )}
              <div className="new-reservation-create">
                <h3>Información Reserva</h3>
                <div className="new-reservation-form-dates">
                  <section>
                    <p>Fecha</p>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                    />
                  </section>
                  <section>
                    <p>Hora Inicio</p>
                    <input 
                      type="time" 
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      required
                    />
                  </section>
                  <section>
                    <p>Hora Finalización</p>
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      required
                    />
                  </section>
                </div>
              </div>
              <div className="new-reservation-schedule">
                <span className="new-reservation-card-title">
                  Horarios Disponibles
                </span>
                <div className="new-reservation-hours">
                  <label className="time-slot">
                    <input 
                      type="radio" 
                      value="8-10" 
                      name="lapse" 
                      checked={formData.selectedTimeSlot === "8-10"}
                      onChange={(e) => handleTimeSlotChange(e.target.value)}
                    />
                    <span>8:00 AM - 10:00 AM</span>
                  </label>

                  <label className="time-slot">
                    <input 
                      type="radio" 
                      value="10-12" 
                      name="lapse" 
                      checked={formData.selectedTimeSlot === "10-12"}
                      onChange={(e) => handleTimeSlotChange(e.target.value)}
                    />
                    <span>10:00 AM - 12:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input 
                      type="radio" 
                      value="2-4" 
                      name="lapse" 
                      checked={formData.selectedTimeSlot === "2-4"}
                      onChange={(e) => handleTimeSlotChange(e.target.value)}
                    />
                    <span>2:00 PM - 4:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input 
                      type="radio" 
                      value="4-6" 
                      name="lapse" 
                      checked={formData.selectedTimeSlot === "4-6"}
                      onChange={(e) => handleTimeSlotChange(e.target.value)}
                    />
                    <span>4:00 PM - 6:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input 
                      type="radio" 
                      value="6-8" 
                      name="lapse" 
                      checked={formData.selectedTimeSlot === "6-8"}
                      onChange={(e) => handleTimeSlotChange(e.target.value)}
                    />
                    <span>6:00 PM - 8:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input 
                      type="radio" 
                      value="8-10pm" 
                      name="lapse" 
                      checked={formData.selectedTimeSlot === "8-10pm"}
                      onChange={(e) => handleTimeSlotChange(e.target.value)}
                    />
                    <span>8:00 PM - 10:00 PM</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="new-reservation-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando reserva..." : "Realizar reserva"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewReservation;

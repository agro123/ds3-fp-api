import React, { useState, useEffect } from "react";
import "./NewReservation.css";
import { Sidebar } from "../../components";
import { mockRooms } from "../../data";
import { getRoomImage } from "../../utils";
import type { Room } from "../../types";

const NewReservation: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (mockRooms.length > 0) {
      setSelectedRoom(mockRooms[0]);
    }
  }, []);

  const handleRoomChange = (roomId: string) => {
    const room = mockRooms.find((r) => r.id === roomId);
    setSelectedRoom(room || null);
  };

  return (
    <div className="new-reservation-container">
      <Sidebar userName="Juan Pérez" />
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
                          {mockRooms
                            .filter((room) => room.roomType === "Auditorios")
                            .map((room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                        </optgroup>

                        <optgroup label="🏫 Salones">
                          {mockRooms
                            .filter((room) => room.roomType === "Salon")
                            .map((room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                        </optgroup>

                        <optgroup label="🔬 Laboratorios">
                          {mockRooms
                            .filter((room) => room.roomType === "Laboratorio")
                            .map((room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                        </optgroup>

                        <optgroup label="💻 Salas de Cómputo">
                          {mockRooms
                            .filter(
                              (room) => room.roomType === "Sala de cómputo"
                            )
                            .map((room) => (
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
            <form action="" className="new-reservation-form-create">
              <div className="new-reservation-create">
                <h3>Información Reserva</h3>
                <div className="new-reservation-form-dates">
                  <section>
                    <p>Fecha</p>
                    <input type="date" />
                  </section>
                  <section>
                    <p>Cantidad de Horas</p>
                    <input type="text" />
                  </section>
                  <section>
                    <p>Hora Inicio</p>
                    <input type="time" />
                  </section>
                  <section>
                    <p>Hora Finalización</p>
                    <input type="time" />
                  </section>
                </div>
              </div>
              <div className="new-reservation-schedule">
                <span className="new-reservation-card-title">
                  Horarios Disponibles
                </span>
                <div className="new-reservation-hours">
                  <label className="time-slot">
                    <input type="radio" value="8-10" name="lapse" />
                    <span>8:00 AM - 10:00 AM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="10-12" name="lapse" />
                    <span>10:00 AM - 12:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="2-4" name="lapse" />
                    <span>2:00 PM - 4:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="4-6" name="lapse" />
                    <span>4:00 PM - 6:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="6-8" name="lapse" />
                    <span>6:00 PM - 8:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="8-10" name="lapse" />
                    <span>8:00 AM - 10:00 PM</span>
                  </label>
                </div>
              </div>
              <input
                type="submit"
                className="new-reservation-btn"
                value="Realizar reserva"
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewReservation;

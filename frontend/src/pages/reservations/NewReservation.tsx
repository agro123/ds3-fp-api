import React from "react";
import "./NewReservation.css";
import { Sidebar } from "../../components";
import auditorio from "../../assets/images/auditoriums-background.jpg";

const NewReservation: React.FC = () => {
  return (
    <div className="new-reservation-container">
      <Sidebar userName="Juan Pérez" />
      <main className="new-reservation-main">
        <header className="new-reservation-header">
          <h1>Nueva Reserva</h1>
        </header>
        <div className="new-reservation-body">
          <div className="new-reservation-picture">
            <img src={auditorio} alt="" />
          </div>
          <div className="make-new-reservation">
            <div className="new-reservation-card">
              <span className="new-reservation-card-title">
                Información de la sala
              </span>
              <div className="new-reservation-information">
                <dl>
                  <dt>Nombre de sala</dt>
                  <dd>Sala de cómputo 16</dd>
                  <dt>Capacidad</dt>
                  <dd>30 personas</dd>
                </dl>
                <section>
                  <span className="new-reservation-title-span">Equipamiento</span>
                  <ul>
                    <li>20 computadores</li>
                    <li>Proyector</li>
                    <li>Pizarra</li>
                    <li>Aire acondicionado</li>
                  </ul>
                </section>
              </div>
            </div>
            <form action="" className="new-reservation-form-create">
              <div className="new-reservation-create">
                <span className="new-reservation-card-title">
                  Información Reserva
                </span>
                <div className="new-reservation-form-dates">
                  <section>
                    <p>Fecha</p>
                    <input type="date" />
                  </section>
                  <section>
                    <p>Hora Inicio</p>
                    <input type="time" />
                  </section>
                  <section>
                    <p>Cantidad de Horas</p>
                    <input type="text" />
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
                    <input type="radio" value="8-10" name="lapse"/>
                    <span>8:00 AM - 10:00 AM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="10-12" name="lapse"/>
                    <span>10:00 AM - 12:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="2-4" name="lapse"/>
                    <span>2:00 PM - 4:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="4-6" name="lapse"/>
                    <span>4:00 PM - 6:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="6-8" name="lapse"/>
                    <span>6:00 PM - 8:00 PM</span>
                  </label>

                  <label className="time-slot">
                    <input type="radio" value="8-10" name="lapse"/>
                    <span>8:00 AM - 10:00 PM</span>
                  </label>
                </div>
              </div>
              <input type="submit" className="new-reservation-btn" value="Realizar reserva"/>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewReservation;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReservationCard.css";
import { getRoomImage } from "../../utils";
import { formatDisplayDate, formatDisplayTime } from "../../utils/dateUtils";

interface ReservationCardProps {
  id: string;
  roomName: string;
  roomType: "Auditorios" | "Laboratorio" | "Sala de cómputo" | "Salon";
  startTime: string;
  endTime: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  id,
  roomName,
  roomType,
  startTime,
  endTime,
  date,
  status,
}) => {
  const navigate = useNavigate();
  const backgroundImage = getRoomImage(roomName, roomType);

  const handleCardClick = () => {
    navigate(`/reservations/${id}`);
  };

  // Función para obtener el texto del estado
  const getStatusText = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelada";
      default:
        return "Desconocido";
    }
  };

  // Función para obtener el color de fondo del estado
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "#1A9849"; // Verde para confirmado
      case "pending":
        return "#ED9B03"; // Naranja para pendiente
      case "cancelled":
        return "#C62020"; // Rojo para cancelado
      default:
        return "#6b7280"; // Gris por defecto
    }
  };

  return (
    <div
      className="reservation-card"
      onClick={handleCardClick}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
    >
      <div 
        className="reservation-card-status"
        style={{
          backgroundColor: getStatusColor(status),
        }}
      >
        {getStatusText(status)}
      </div>
      <div className="reservation-card-overlay">
        <div className="reservation-card-content">
          <h3>{roomName}</h3>
          <div className="reservation-card-details">
            <p>📅 {formatDisplayDate(date)}</p>
            <p>⏰ {formatDisplayTime(startTime)} - {formatDisplayTime(endTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;

import React from "react";
import "./ReservationCard.css";

interface ReservationCardProps {
  id: string;
  roomName: string;
  roomType: "Auditorios" | "Laboratorio" | "Sala de cómputo" | "Salon";
  startTime: string;
  endTime: string;
  date: string;
  reservationStatus: "confirmed" | "pending" | "cancelled";
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  roomName,
  roomType,
  startTime,
  endTime,
  date,
  reservationStatus,
}) => {
  // Función para obtener la imagen de la sala basada en el nombre
  const getRoomImage = (roomName: string, roomType?: string): string => {
    let imageName = "";
    let folder = "";

    // Mapeo específico para todas las 18 imágenes disponibles
    switch (roomName) {
      // Auditorios (4 casos)
      case "Auditorio Principal":
        imageName = "auditorio-principal.jpg";
        folder = "auditoriums";
        break;
      case "Aula Magna":
      case "Aula Magna C-100":
        imageName = "aula-magna.jpg";
        folder = "auditoriums";
        break;
      case "Auditorio San Marcos":
      case "Auditorio B":
        imageName = "auditorio-san-marcos.jpg";
        folder = "auditoriums";
        break;
      case "Auditorio Ingenieria":
      case "Auditorio de Ingeniería":
        imageName = "auditorio-ingenieria.jpg";
        folder = "auditoriums";
        break;

      // Salones (6 casos)
      case "Salon A-101":
      case "Sala A-101":
        imageName = "salon-a101.jpg";
        folder = "classrooms";
        break;
      case "Salon B-203":
      case "Sala B-202":
      case "Sala B-203":
        imageName = "salon-b203.jpg";
        folder = "classrooms";
        break;
      case "Salon C-305":
      case "Sala C-305":
        imageName = "salon-c305.jpg";
        folder = "classrooms";
        break;
      case "Salon de Conferencias":
      case "Salón de Conferencias":
        imageName = "salon-conferencias.jpg";
        folder = "classrooms";
        break;
      case "Salon Multiuso D-201":
      case "Salón Multiuso D-201":
        imageName = "salon-multiuso-d201.jpg";
        folder = "classrooms";
        break;
      case "Salon de Estudios E-102":
      case "Salón de Estudios E-102":
        imageName = "salon-estudios-e102.jpg";
        folder = "classrooms";
        break;

      // Laboratorios (4 casos)
      case "Lab. de Fisica E-105":
      case "Lab Física E-105":
      case "Lab. Fisica E-105":
        imageName = "lab-fisica-e105.jpg";
        folder = "labs";
        break;
      case "Lab. de Quimica F-201":
      case "Lab. Química F-201":
      case "Lab Química F-201":
        imageName = "lab-quimica-f201.jpg";
        folder = "labs";
        break;
      case "Lab. de Biologia G-103":
      case "Lab. Biología G-103":
      case "Lab Biología G-103":
        imageName = "lab-biologia-g103.jpg";
        folder = "labs";
        break;
      case "Lab. de Electronica D-301":
      case "Lab. Electrónica D-301":
      case "Lab Electrónica D-301":
        imageName = "lab-electronica-d301.jpg";
        folder = "labs";
        break;

      // Salas de Cómputo (4 casos)
      case "Lab. Computo A-205":
      case "Lab Computación B-205":
      case "Lab Cómputo A-205":
        imageName = "lab-computo-a205.jpg";
        folder = "computer-labs";
        break;
      case "Sala de Sistemas B-301":
      case "Sala Sistemas B-301":
        imageName = "sala-sistemas-b301.jpg";
        folder = "computer-labs";
        break;
      case "Centro de Computo":
      case "Centro de Cómputo":
        imageName = "centro-computo.jpg";
        folder = "computer-labs";
        break;
      case "Lab. Informatica H-102":
      case "Lab Informática H-102":
      case "Sala Cómputo F-301":
      case "Lab Cómputo D-301":
        imageName = "lab-informatica-h102.jpg";
        folder = "computer-labs";
        break;

      default:
        // Fallback basado en el tipo de sala si se proporciona
        if (roomType) {
          switch (roomType) {
            case "Salon":
              imageName = "salon-a101.jpg";
              folder = "classrooms";
              break;
            case "Auditorios":
              imageName = "auditorio-principal.jpg";
              folder = "auditoriums";
              break;
            case "Laboratorio":
              imageName = "lab-fisica-e105.jpg";
              folder = "labs";
              break;
            case "Sala de cómputo":
              imageName = "lab-computo-a205.jpg";
              folder = "computer-labs";
              break;
            default:
              imageName = "salon-a101.jpg";
              folder = "classrooms";
          }
        } else {
          // Fallback por defecto
          imageName = "salon-a101.jpg";
          folder = "classrooms";
        }
    }

    return `/src/assets/images/rooms/${folder}/${imageName}`;
  };

  const backgroundImage = getRoomImage(roomName, roomType);

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
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div 
        className="reservation-card-status"
        style={{
          backgroundColor: getStatusColor(reservationStatus),
        }}
      >
        {getStatusText(reservationStatus)}
      </div>
      <div className="reservation-card-overlay">
        <div className="reservation-card-content">
          <h3>{roomName}</h3>
          <div className="reservation-card-details">
            <p>📅 {date}</p>
            <p>⏰ {startTime} - {endTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoomCard.css";
import { getRoomImage, getRoomTypeText } from "../../utils";

interface RoomCardProps {
  id: string;
  roomName: string;
  roomType: "Auditorios" | "Laboratorio" | "Sala de cómputo" | "Salon";
  capacity: number;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  roomName,
  roomType,
  capacity,
}) => {
  const navigate = useNavigate();
  const backgroundImage = getRoomImage(roomName, roomType);

  const handleCardClick = () => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div
      className="room-card"
      onClick={handleCardClick}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
    >
      <div className="room-card-overlay">
        <div className="room-card-content">
          <h3>{roomName}</h3>
          <div className="room-card-details">
            <p>🏢 {getRoomTypeText(roomType)}</p>
            <p>👥 No. personas: {capacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

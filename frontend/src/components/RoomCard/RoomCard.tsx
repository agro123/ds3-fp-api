import React from "react";
import "./RoomCard.css";
import { getRoomImage, getRoomTypeText } from "../../utils";

interface RoomCardProps {
  id: string;
  roomName: string;
  roomType: "Auditorios" | "Laboratorio" | "Sala de cómputo" | "Salon";
  capacity: number;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomName,
  roomType,
  capacity,
}) => {
  const backgroundImage = getRoomImage(roomName, roomType);

  return (
    <div
      className="room-card"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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

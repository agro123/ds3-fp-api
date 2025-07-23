import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Importar páginas
import { 
  Login, 
  Register, 
  Home, 
  Reservations, 
  NewReservation, 
  Rooms 
} from './pages';
import Room from './pages/rooms/Room';
import ReservationInfo from './pages/reservations/ReservationInfo';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Routes>
            {/* Ruta principal - Login */}
            <Route path="/" element={<Login />} />
            
            {/* Rutas de autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas principales de la aplicación */}
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            
            {/* Rutas de reservas */}
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/reservations/new" element={<NewReservation />} />
            <Route path="/reservations/:id" element={<ReservationInfo />} />
            
            {/* Rutas de salas */}
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<Room />} />
            
            {/* Redirigir rutas no encontradas al login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
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
      <AuthProvider>
        <div className="app">
          <div className="main-content">
            <Routes>
              {/* Ruta principal - Login */}
              <Route path="/" element={<Login />} />
              
              {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Rutas principales de la aplicación */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              
              {/* Rutas de reservas */}
              <Route path="/reservations" element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              } />
              <Route path="/make-reservation" element={
                <ProtectedRoute>
                  <NewReservation />
                </ProtectedRoute>
              } />
              <Route path="/reservations/:id" element={
                <ProtectedRoute>
                  <ReservationInfo />
                </ProtectedRoute>
              } />
              
              {/* Rutas de salas */}
              <Route path="/rooms" element={
                <ProtectedRoute>
                  <Rooms />
                </ProtectedRoute>
              } />
              <Route path="/rooms/:id" element={
                <ProtectedRoute>
                  <Room />
                </ProtectedRoute>
              } />
              
              {/* Redirigir rutas no encontradas al login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { formatDisplayDate, formatDisplayTime } from '../utils/dateUtils';

/**
 * Componente temporal para probar las funciones de formateo de fecha y hora
 * Este archivo puede ser eliminado después de las pruebas
 */
const DateTimeTest: React.FC = () => {
  // Obtener la fecha de hoy para las pruebas
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const todayString = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const tomorrowString = tomorrow.toISOString().split('T')[0];
  const nextWeekString = nextWeek.toISOString().split('T')[0];

  const testCases = [
    {
      label: 'Hoy',
      date: todayString,
      time: '14:30:00'
    },
    {
      label: 'Mañana',
      date: tomorrowString,
      time: '09:15:30'
    },
    {
      label: 'Próxima semana',
      date: nextWeekString,
      time: '16:45'
    },
    {
      label: 'Fecha fija para ejemplo',
      date: '2025-12-25',
      time: '12:00:00'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🧪 Pruebas de Formateo de Fecha y Hora</h2>
      <p><strong>Fecha actual:</strong> {today.toLocaleDateString('es-ES')}</p>
      
      <div style={{ marginTop: '20px' }}>
        {testCases.map((testCase, index) => (
          <div key={index} style={{ 
            margin: '10px 0', 
            padding: '10px', 
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{testCase.label}</h3>
            <p><strong>Fecha original:</strong> {testCase.date}</p>
            <p><strong>Fecha formateada:</strong> {formatDisplayDate(testCase.date)}</p>
            <p><strong>Hora original:</strong> {testCase.time}</p>
            <p><strong>Hora formateada:</strong> {formatDisplayTime(testCase.time)}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '5px' }}>
        <h3>🎯 Ejemplo de ReservationCard</h3>
        <p>📅 {formatDisplayDate(todayString)}</p>
        <p>⏰ {formatDisplayTime('14:30:00')} - {formatDisplayTime('16:00:00')}</p>
      </div>
    </div>
  );
};

export default DateTimeTest;

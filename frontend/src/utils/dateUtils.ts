/**
 * Utilidades para formatear fechas y horas
 */

/**
 * Formatea una fecha para mostrar "Hoy", "Mañana" o el formato "Viernes, 12 de Julio"
 * @param dateString - La fecha en formato string (YYYY-MM-DD o cualquier formato válido de Date)
 * @returns La fecha formateada
 */
export const formatDisplayDate = (dateString: string): string => {
  try {
    const inputDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Normalizar las fechas para comparar solo día, mes y año
    const normalizeDate = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const normalizedInput = normalizeDate(inputDate);
    const normalizedToday = normalizeDate(today);
    const normalizedTomorrow = normalizeDate(tomorrow);

    if (normalizedInput.getTime() === normalizedToday.getTime()) {
      return "Hoy";
    }
    
    if (normalizedInput.getTime() === normalizedTomorrow.getTime()) {
      return "Mañana";
    }

    // Formatear fecha normal
    const diasSemana = [
      "Domingo", "Lunes", "Martes", "Miércoles", 
      "Jueves", "Viernes", "Sábado"
    ];
    
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const diaSemana = diasSemana[inputDate.getDay()];
    const dia = inputDate.getDate();
    const mes = meses[inputDate.getMonth()];

    return `${diaSemana}, ${dia} de ${mes}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Fallback al string original
  }
};

/**
 * Formatea una hora removiendo los segundos si están presentes
 * @param timeString - La hora en formato HH:MM:SS o HH:MM
 * @returns La hora formateada en formato HH:MM
 */
export const formatDisplayTime = (timeString: string): string => {
  try {
    // Si la hora ya está en formato HH:MM, la devolvemos tal como está
    if (timeString.match(/^\d{1,2}:\d{2}$/)) {
      return timeString;
    }
    
    // Si está en formato HH:MM:SS, removemos los segundos
    if (timeString.match(/^\d{1,2}:\d{2}:\d{2}$/)) {
      return timeString.substring(0, 5);
    }
    
    return timeString; // Fallback al string original
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};

/**
 * Ejemplos de uso:
 * 
 * formatDisplayDate('2025-07-23') // Si hoy es 23 de julio: "Hoy"
 * formatDisplayDate('2025-07-24') // Si hoy es 23 de julio: "Mañana"
 * formatDisplayDate('2025-07-25') // "Viernes, 25 de Julio"
 * 
 * formatDisplayTime('14:30:00') // "14:30"
 * formatDisplayTime('14:30') // "14:30"
 */

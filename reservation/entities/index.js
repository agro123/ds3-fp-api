import { Router } from 'express';
import createReservation from './createReservation.js';
import getReservation from './getReservationById.js';
import updateReservation from './updateReservation.js';
import deleteReservation from './deleteReservation.js';
import getAllReservations from './getAllReservations.js';


const router = Router();

router.get('/:id', getReservation);
router.post('/', createReservation); 
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.get('/', getAllReservations);


export default router;
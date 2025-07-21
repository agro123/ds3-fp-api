import { Router } from 'express';
import createUser from '../users/controllers/createUser.js';
import getUser from '../users/controllers/getUser.js';
import updateUser from '../users/controllers/updateUser.js';
import deleteUser from '../users/controllers/deleteUser.js';
import getAllUsers from '../users/controllers/getAllUsers.js';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:email', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
import { Router } from 'express';
import createUser from '../users/controllers/createUser.js';
import getUser from '../users/controllers/getUser.js';
import updateUser from '../users/controllers/updateUser.js';
import deleteUser from '../users/controllers/deleteUser.js';

const router = Router();

router.post('/', createUser);
router.get('/:email', getUser);
router.put('/:email', updateUser);
router.delete('/:email', deleteUser);

export default router;
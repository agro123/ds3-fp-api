import { Router } from 'express';
import createUser from '../controllers/createUser.js';
import getUser from '../controllers/getUser.js';
import updateUser from '../controllers/updateUser.js';
import deleteUser from '../controllers/deleteUser.js';

const router = Router();

router.post('/', createUser);
router.get('/:username', getUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

export default router;
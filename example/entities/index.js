import { Router } from 'express';
import createUser from './createUser.js';
import getUser from './getUser.js';

const router = Router();

router.get('/:id', getUser);
router.post('/', createUser); 

export default router;
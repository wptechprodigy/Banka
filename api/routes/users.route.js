import { Router } from 'express';
import UserController from '../controllers/users.controller';

const router = Router();

router.post('/auth/signup', UserController.signUp);
router.post('/auth/signin', UserController.signIn);
router.get('/users/', UserController.getAllUsers);
router.get('/:id', UserController.getOneUserById);
router.put('/:id', UserController.updateAUser);
router.delete('/:id', UserController.deleteAUser);

export default router;

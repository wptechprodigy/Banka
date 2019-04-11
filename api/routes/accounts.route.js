import { Router } from 'express';
import AccountController from '../controllers/accounts.controller';

const router = Router();

router.post('/', AccountController.createANewAccount);
router.get('/', AccountController.getAllAccounts);
router.delete('/:accountNumber', AccountController.deleteAnAccount);
router.get('/:accountNumber', AccountController.getAnAccountDetails);

export default router;

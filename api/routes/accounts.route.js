import { Router } from 'express';
import authorizeRole from '../Middleware/authorize-role';
import Role from '../Middleware/role';
import AccountController from '../controllers/accounts.controller';

const router = Router();

router.post('/', authorizeRole(Role.Client), AccountController.createANewAccount);
router.patch(
  '/:accountNumber',
  authorizeRole([Role.Admin, Role.Staff]),
  AccountController.patchAnAccount,
);
router.get('/accounts', AccountController.getAllAccounts);
router.delete('/:accountNumber', AccountController.deleteAnAccount);
router.get('/:accountNumber', AccountController.getAnAccountDetails);

export default router;

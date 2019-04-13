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
router.delete(
  '/:accountNumber',
  authorizeRole([Role.Admin, Role.Staff]),
  AccountController.deleteAnAccount,
);
router.get('/accounts', authorizeRole([Role.Admin, Role.Staff]), AccountController.getAllAccounts);
router.get('/:accountNumber', authorizeRole(), AccountController.getAnAccountDetails);

export default router;

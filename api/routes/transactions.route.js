import { Router } from 'express';
import authorizeRole from '../Middleware/authorize-role';
import Role from '../Middleware/role';
import TransactionController from '../controllers/transactions.controller';

const router = Router();

router.post(
  '/:accountNumber/debit',
  authorizeRole(Role.Staff),
  TransactionController.debitAnAccount,
);
router.post(
  '/:accountNumber/credit',
  authorizeRole(Role.Staff),
  TransactionController.creditAnAccount,
);

export default router;

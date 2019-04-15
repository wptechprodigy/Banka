import TransactionService from '../services/transactions.service';
import AccountService from '../services/accounts.service';

/**
 * @TransactionController
 */

const TransactionController = {
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} transaction object
	 */
  debitAnAccount(req, res) {
    const currentUser = req.user;
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const accountToDebit = AccountService.getAnAccount(accountNumber);
    if (!accountToDebit) {
      throw 'Account not found';
    }
    const debitTransaction = TransactionService.debitTransaction(
      accountToDebit,
      parseFloat(amount).toFixed(2),
      currentUser,
    );
    res.status(201).json({
      status: 201,
      data: debitTransaction,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} transaction object
	 */
  creditAnAccount(req, res) {
    const currentUser = req.user;
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const accountToCredit = AccountService.getAnAccount(accountNumber);
    if (!accountToCredit) {
      throw 'Account not found';
    }
    const creditTransaction = TransactionService.creditTransaction(
      accountToCredit,
      parseFloat(amount).toFixed(2),
      currentUser,
    );
    res.status(201).json({
      status: 201,
      data: creditTransaction,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} transaction object
	 */
  retrieveAllTransactions(req, res) {
    const currentUser = req.user;
    const allExistingTransactions = TransactionService.getAllTransactions(currentUser);
    res.status(200).json({
      status: 200,
      data: allExistingTransactions,
    });
  },
};

export default TransactionController;

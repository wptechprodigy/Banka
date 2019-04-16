import moment from 'moment';
import dummyDB from '../utils/dummyDB';
import Role from '../Middleware/role';

/**
 * @TransactionService
 */
const TransactionService = {
  /**
	 * @param {object} account Number object
	 * @param {object} amount to debit
	 * @param {object} current user with token
	 *
	 * @returns {object} Debit transaction object
	 */
  debitTransaction(accountToDebit, amount, currentUser) {
    const userWithRole = dummyDB.users.find(user => user.id === currentUser.sub);

    // Check rights
    if (userWithRole.id === currentUser.sub && currentUser.role !== Role.Staff) {
      throw 'Unauthorized';
    }

    // Check account balance
    if (accountToDebit.balance < amount) {
      throw 'Insufficient account balance';
    }

    // perform debit operation
    const returningBalance =			parseFloat(accountToDebit.balance).toFixed(2) - parseFloat(amount).toFixed(2);

    // Generate a new transaction id
    const transactionLength = dummyDB.transactions.length;
    const lastTransactionId = dummyDB.transactions[transactionLength - 1].id;
    const newTransactionId = lastTransactionId + 1;

    // create a new transaction object
    const newTransaction = {
      id: newTransactionId,
      createdOn: moment().format(),
      transactionType: 'debit',
      accountNumber: accountToDebit.accountNumber,
      cashier: currentUser.sub,
      amount,
      oldBalance: parseFloat(accountToDebit.balance).toFixed(2),
      newBalance: parseFloat(returningBalance).toFixed(2),
    };
    dummyDB.transactions.push(newTransaction);
    const {
      id, createdOn, newBalance, ...withOutOldBalance
    } = newTransaction;
    return {
      transactionId: id,
      ...withOutOldBalance,
      accountBalance: newTransaction.newBalance,
    };
  },
  /**
	 * @param {object} account Number object
	 * @param {object} amount to credit
	 * @param {object} current user with token
	 *
	 * @returns {object} Credit transaction object
	 */
  creditTransaction(accountToCredit, amount, currentUser) {
    const userWithRole = dummyDB.users.find(user => user.id === currentUser.sub);

    // Check rights
    if (userWithRole.id === currentUser.sub && currentUser.role !== Role.Staff) {
      throw 'Unauthorized';
    }

    // perform credit operation
    const returningBalance = parseFloat(accountToCredit.balance) + parseFloat(amount);

    // Generate a new transaction id
    const transactionLength = dummyDB.transactions.length;
    const lastTransactionId = dummyDB.transactions[transactionLength - 1].id;
    const newTransactionId = lastTransactionId + 1;

    // create a new transaction object
    const newTransaction = {
      id: newTransactionId,
      createdOn: moment().format(),
      transactionType: 'credit',
      accountNumber: accountToCredit.accountNumber,
      cashier: currentUser.sub,
      amount,
      oldBalance: parseFloat(accountToCredit.balance).toFixed(2),
      newBalance: parseFloat(returningBalance).toFixed(2),
    };
    dummyDB.transactions.push(newTransaction);
    const {
      id, createdOn, oldBalance, newBalance, ...withOutOldBalance
    } = newTransaction;
    return {
      transactionId: id,
      ...withOutOldBalance,
      accountBalance: newBalance,
    };
  },
  /**
	 * @param {object} account object
	 * @param {}
	 *
	 * @returns {object} Debit transaction object
	 */
  getAllTransactions(currentUser) {
    // Check rights
    if (userWithRole.id === currentUser.sub && currentUser.role === Role.Client) {
      throw 'Unauthorized';
    }
    const allTransactions = dummyDB.transactions.map((transaction) => {
      const { newBalance, oldBalance, ...transactionWithoutNewBalance } = transaction;
      return transactionWithoutNewBalance;
    });
    return {
      balance: allTransactions.newBalance,
      ...transactionWithoutNewBalance,
    };
  },
};

export default TransactionService;

import uuid from 'uuid';
import moment from 'moment';
import dummyDB from '../utils/dummyDB';

/**
 * @AccountService
 */

const AccountService = {
  /**
	 * @param {object} account object
	 * @param {id} user id creating account
	 *
	 * @returns {object} new user object
	 */
  createNewAccount(account, userId) {
    const userCreatingAccountId = dummyDB.users.map(user => user.id === userId);
    account.id = uuid.v4();
    account.createdOn = moment().format();
    account.owner = userCreatingAccountId;
    dummyDB.accounts.push(account);
    return account;
  },
  /**
	 *
	 * @param {string} accountNumber
	 * @param {object} data
	 *
	 * @returns {object} updated account
	 */
  updateAccount(accountNumber, data) {
    const account = dummyDB.accounts.map(account => account.accountNumber === accountNumber);
    const accountIndex = dummyDB.accounts.indexOf(account);
    dummyDB.accounts[accountIndex].status = data.status || account.status;
    return dummyDB.accounts[accountIndex];
  },
  /**
	 *
	 * @param {string} accountNumber
	 */
  deleteAccount(accountNumber) {
    const account = dummyDB.accounts.map(account => account.accountNumber === accountNumber);
    const accountIndex = dummyDB.accounts.indexOf(account);
    dummyDB.accounts.splice(accountIndex, 1);
    return {};
  },
};

export default AccountService;

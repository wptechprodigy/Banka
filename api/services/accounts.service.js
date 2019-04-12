import uuid from 'uuid';
import moment from 'moment';
import dummyDB from '../utils/dummyDB';
import generateAccountNumber from '../Middleware/account-gen';

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
  createNewAccount(data, userId) {
    const userCreatingAccountId = dummyDB.users.map(user => user.id === userId);
    const { firstName, lastName, email } = userCreatingAccountId;
    const newAccount = {
      id: uuid.v4(),
      firstName,
      lastName,
      email,
      type: data.type,
      status: 'draft',
      createdOn: moment().format(),
      accountNumber: String(generateAccountNumber()),
      owner: userCreatingAccountId.id,
      openingBalance: '00.00' * 1,
    };
    dummyDB.accounts.push(newAccount);
    return newAccount;
  },
  /**
	 *
	 * @returns {object} returns all accounts
	 */
  getAllAccount() {
    const allAccount = dummyDB.accounts.map((account) => {
      const { id, ...accountWithoutId } = account;
      return accountWithoutId;
    });
    return allAccount;
  },
  /**
	 *
	 * @param {string} accountNumber
	 *
	 * @returns {object} account object
	 */
  getAnAccount(accountNumber) {
    const account = dummyDB.accounts.find(account => account.accountNumber === accountNumber);
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
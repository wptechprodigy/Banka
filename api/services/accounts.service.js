import moment from 'moment';
import dummyDB from '../utils/dummyDB';
import Role from '../Middleware/role';
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
  createNewAccount(data, currentUser) {
    const userCreatingAccountId = dummyDB.users.find(user => user.id === currentUser.sub);

    // only allow user with access
    if (userCreatingAccountId.id !== currentUser.sub) {
      throw 'Unauthorized';
    }

    // Define new acccount
    const newAccount = {
      id: userCreatingAccountId.id,
      firstName: userCreatingAccountId.firstName,
      lastName: userCreatingAccountId.lastName,
      email: userCreatingAccountId.email,
      type: userCreatingAccountId.type,
      createdOn: moment().format(),
      accountNumber: String(generateAccountNumber()),
      owner: userCreatingAccountId.id,
      balance: '00.00' * 1,
    };
    const {
      id, status, owner, balance, ...withoutIdStatusOwner
    } = newAccount;
    dummyDB.accounts.push(newAccount);
    return {
      ...withoutIdStatusOwner,
    };
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
	 *
	 * @returns {object} account object
	 */
  patchAccount(newStatusInfo, data, currentUser) {
    const accountToPatch = String(data.accountNumber);
    const account = dummyDB.accounts.find(account => account.accountNumber === accountToPatch);
    const userWithRole = dummyDB.users.find(user => user.id === currentUser.sub);

    // only allow Admin and Staff to access access
    if (userWithRole.id === currentUser.sub && currentUser.role !== Role.Admin) {
      throw 'Unauthorized';
    }

    const accountIndex = dummyDB.accounts.indexOf(account);
    dummyDB.accounts[accountIndex].status = newStatusInfo.status;
    const newAccountStatus = dummyDB.accounts[accountIndex].status;
    return {
      accountNumber: account.accountNumber,
      status: newAccountStatus,
    };
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
  deleteAccount(accountNumber, currentUser) {
    const accountToDelete = String(accountNumber);
    const account = dummyDB.accounts.find(account => account.accountNumber === accountToDelete);
    const userWithRole = dummyDB.users.find(user => user.id === currentUser.sub);
    const accountIndex = dummyDB.accounts.indexOf(account);

    // only allow Admin and Staff to access access
    if (userWithRole.id === currentUser.sub && currentUser.role !== Role.Admin) {
      throw 'Unauthorized';
    }

    dummyDB.accounts.splice(accountIndex, 1);
    return {
      status: 204,
      message: 'Account successfully deleted',
    };
  },
};

export default AccountService;

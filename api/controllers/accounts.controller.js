import AccountService from '../services/accounts.service';

/**
 * @AccountController
 */

const AccountController = {
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} account object
	 */
  createANewAccount(req, res, next) {
    const currentUser = req.user;
    const newAccount = AccountService.createNewAccount(req.body, currentUser);
    res.status(201).json({
      status: 201,
      data: newAccount,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} user array
	 */
  getAnAccountDetails(req, res) {
    const desiredAccount = AccountService.getAnAccount(req.params.accountNumber);
    res.status(200).json({
      status: 200,
      data: desiredAccount,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object}
	 */
  patchAnAccount(req, res) {
    const currentUser = req.user;
    const desiredAccount = AccountService.patchAccount(req.params, currentUser);
    res.status(200).json({
      status: 200,
      data: desiredAccount,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} user array
	 */
  getAllAccounts(req, res) {
    const allAccounts = AccountService.getAllAccount();
    res.status(200).json({
      status: 200,
      data: allAccounts,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {void} returns status code 204
	 */
  deleteAnAccount(req, res) {
    const { accountNumber } = req.params;
    const foundAccount = AccountService.getAnAccount(accountNumber);
    if (!foundAccount) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    AccountService.deleteAccount(accountNumber);
    res.status(204).json({
      status: 204,
      message: 'User deleted successfully',
    });
  },
};

export default AccountController;

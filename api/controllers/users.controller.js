import UserService from '../services/users.service';
import dummyDB from '../utils/dummyDB';

/**
 * @UserController
 */

const UserController = {
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} user array
	 */
  getAllUsers(req, res) {
    const allUsers = UserService.findAllUsers();
    res.status(200).json({
      status: 200,
      data: allUsers,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} user object
	 */
  signUp(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      throw 'All fields are required. Check to ensure all fields are filled';
    }
    // check it email is unique
    const { email, password, confirmPassword } = req.body;
    const registeredEmail = dummyDB.users.find(user => user.email === email);
    if (registeredEmail) {
      throw 'Email is already taken';
    }
    if (password !== confirmPassword) {
      throw 'Passwords do not match';
    }
    const newUser = UserService.createNewUser(req.body);
    res.status(201).json({
      status: 201,
      data: newUser,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} user object
	 */
  getOneUserById(req, res) {
    const { id } = req.params;
    const foundUser = UserService.findOneUserById(id);
    if (!foundUser) {
      // return res.status(404).json({
      //   status: 404,
      //   message: 'User not found',
      // });
      throw 'User not found';
    }
    res.status(201).json({
      status: 201,
      data: foundUser,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 *
	 * @returns {object} user object
	 */
  signIn(req, res) {
    if (!req.body.email) {
      throw 'Email is required';
    } else if (!req.body.password) {
      throw 'Password is required';
    }
    // check it email is unique
    const { email, password } = req.body;
    const checkEmail = dummyDB.users.find(user => user.email === email);
    if (checkEmail.email !== email) {
      throw 'Email is not known';
    }
    if (checkEmail.password !== password) {
      throw 'Password does not match';
    }
    const userData = UserService.logUserIn(req.body);
    res.status(200).json({
      status: 200,
      data: userData,
    });
  },

  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} updated user
	 */
  updateAUser(req, res) {
    const { id } = req.params;
    const foundUser = UserService.findOneUserById(id);
    if (!foundUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    const updatedUser = UserService.updateUser(id, req.body);
    res.status(201).json({
      status: 201,
      data: updatedUser,
    });
  },
  /**
	 *
	 * @param {object} req
	 * @param {object} res
	 * @returns {void} returns status code 204
	 */
  deleteAUser(req, res) {
    const { id } = req.params;
    const foundUser = UserService.findOneUserById(id);
    if (!foundUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    UserService.deleteUser(id);
    res.status(204).json({
      status: 204,
      message: 'User deleted successfully',
    });
  },
};

export default UserController;

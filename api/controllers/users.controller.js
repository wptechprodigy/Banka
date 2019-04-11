import UserService from '../services/users.service';

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
	 * @returns {object} user object
	 */
  createANewUser(req, res) {
    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: 'All fields are required',
      });
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
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
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

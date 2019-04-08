import UserService from '../services/users.service';

const UserController = {
  getAllUsers(req, res) {
    const allUsers = UserService.findAllUsers();
    res.status(200).json({
      status: 200,
      data: allUsers,
    });
  },
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
      message: 'User created successfully!',
      data: newUser,
    });
  },
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
      message: 'User updated successfully!',
      data: updatedUser,
    });
  },
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
    res.status(201).json({
      status: 201,
      message: 'User deleted successfully',
    });
  },
};

export default UserController;

import morgan from 'morgan';
import UserService from '../services/users.service';

const UserController = {
  getAllUsers(req, res) {
    const allUsers = UserService.findAllUsers();
    res.status(200).json({
      status: 200,
      data: allUsers,
    });
  },
  createANewUser(res, req) {
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
  getOneUserById(req, res) {
    const id = req.params.id;
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
  updateAUser(res, req) {
    const id = req.params.id;
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
  deleteAUser(res, req) {
    const id = req.params.id;
    const foundUser = UserService.findOneUserById(id);
    if (!foundUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    const deletedUser = UserService.deleteUser(id);
    res.status(201).json({
      status: 201,
      data: deletedUser,
    });
  },
};

export default UserController;

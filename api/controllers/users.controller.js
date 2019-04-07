import UserService from '../services/users.service';

const UserController = {
  getAllUsers(req, res) {
    const allUsers = UserService.findAllUsers();
    res.status(200).json({
      status: 200,
      data: allUsers,
    });
  },
  // getOneUserById(req, res) {
  //     const id = req.params.id;
  //     const foundUser = UserService.findOneUserById(id);
  //     res.status(201).json({
  //         status: 201,
  //         data: foundUser,
  //     });
  // },
};

export default UserController;

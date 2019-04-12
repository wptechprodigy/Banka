import uuid from 'uuid';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import secret from '../utils/jwt_secret';
import dummyDB from '../utils/dummyDB';

const UserService = {
  /**
	 *
	 * @returns {object} returns all users
	 */
  findAllUsers() {
    const allUser = dummyDB.users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return allUser;
  },
  /**
	 * @param {object} req.body from  signup controller object
	 *
	 * @returns {object} new user object
	 */
  createNewUser(user) {
    const newUser = {
      id: uuid.v4(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      type: 'Client',
      isAdmin: false,
      createdOn: moment().format(),
      role: 'Client',
    };
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      secret,
    );
    const {
      password, confirmPassword, isAdmin, type, role, createdOn, ...userData
    } = newUser;
    dummyDB.users.push(newUser);
    return {
      token,
      ...userData,
    };
  },
  /**
	 *
	 * @param {uuid} id
	 * @returns {object} user object
	 */
  findOneUserById(id) {
    const user = dummyDB.users.find(user => user.id === id);
    return user;
  },
  /**
	 *
	 * @param {uuid} id
	 * @param {object} data
	 *
	 * @returns {object} updated user object
	 */
  updateUser(id, data) {
    const user = dummyDB.users.find(user => user.id === id);
    const userDataIndex = dummyDB.users.indexOf(user);
    dummyDB.users[userDataIndex].phoneNumber = data.phoneNumber || user.phoneNumber;
    dummyDB.users[userDataIndex].address = data.address || user.address;
    dummyDB.users[userDataIndex].lastName = data.lastName || user.lastName;
    dummyDB.users[userDataIndex].email = data.email || user.email;
    return dummyDB.users[userDataIndex];
  },
  /**
	 *
	 * @param {uuid} id
	 */
  deleteUser(id) {
    const user = dummyDB.users.find(user => user.id === id);
    const userDataIndex = dummyDB.users.indexOf(user);
    dummyDB.users.splice(userDataIndex, 1);
    return {};
  },
};

export default UserService;

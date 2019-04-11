import uuid from 'uuid';
import moment from 'moment';
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
	 * @param {object} user object
	 * @returns {object} new user object
	 */
  createNewUser(user) {
    user.id = uuid.v4();
    user.createdOn = moment().format();
    dummyDB.users.push(user);
    return user;
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

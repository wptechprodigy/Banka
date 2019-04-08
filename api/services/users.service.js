import uuid from 'uuid';
import moment from 'moment';
import dummyDB from '../utils/dummyDB';
import User from '../models/users.model';

const UserService = {
  findAllUsers() {
    const validUser = dummyDB.users.map((user) => {
      const newUser = new User();
      newUser.id = user.id;
      newUser.firstName = user.firstName;
      newUser.lastName = user.lastName;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.phoneNumber = user.phoneNumber;
      newUser.address = user.address;
      newUser.type = user.type;
      newUser.createdOn = user.createdOn;
      newUser.isAdmin = user.isAdmin;
      return newUser;
    });
    return validUser;
  },
  createNewUser(User) {
    User.id = uuid.v4();
    User.createdOn = moment().format('YYYY-DD-MM');
    dummyDB.users.push(User);
    return User;
  },
  findOneUserById(id) {
    const user = dummyDB.users.find(user => user.id === id);
    return user;
  },
  updateUser(id, data) {
    const user = dummyDB.users.find(user => user.id === id);
    const userDataIndex = dummyDB.users.indexOf(user);
    users[userDataIndex].phoneNumber = data.phoneNumber || user.phoneNumber;
    users[userDataIndex].address = data.address || user.address;
    users[userDataIndex].lastName = data.lastName || user.lastName;
    users[userDataIndex].email = data.email || user.email;
    return users[userDataIndex];
  },
  deleteUser(id) {
    const user = dummyDB.users.find(user => user.id === id);
    const userDataIndex = dummyDB.users.indexOf(user);
    dummyDB.users.splice(userDataIndex, 1);
    return {};
  },
};

export default UserService;

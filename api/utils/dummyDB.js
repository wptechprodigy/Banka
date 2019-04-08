import uuid from 'uuid';
import moment from 'moment';

/** Generate account number function */
const generateAccountNumber = () => (accountNumber = Math.floor(Math.random() * 10000000000));

export default {
  users: [
    {
      id: uuid.v4(),
      firstName: 'Jon',
      lastName: 'Snow',
      email: 'j.snow@targearyean.got',
      password: '123456',
      type: 'client',
      phoneNumber: '08123456789',
      address: {
        street: '555 Bayshore Blvd',
        city: 'Tampa',
        state: 'Florida',
      },
      createdOn: moment().format('YYYY DD MM'),
      isAdmin: false,
    },
    {
      id: uuid.v4(),
      firstName: 'Jorah',
      lastName: 'Momorth',
      email: 'jorah@nightswatch.got',
      password: '123456',
      type: 'client',
      phoneNumber: '09123976589',
      address: {
        street: '156 Nights Watch Colony',
        city: 'Agidingbi',
        state: 'Lagos',
      },
      createdOn: moment().format('YYYY DD MM'),
      isAdmin: false,
    },
    {
      id: uuid.v4(),
      firstName: 'Daenarys',
      lastName: 'Targaeryean',
      email: 'd.targaeryean@targearyean.got',
      password: '123456',
      type: 'staff',
      phoneNumber: '08123676589',
      address: {
        street: '122 Westeros Ave.',
        city: 'Ilupeju',
        state: 'Lagos',
      },
      createdOn: moment().format('YYYY DD MM'),
      isAdmin: false,
    },
    {
      id: uuid.v4(),
      firstName: 'Jamie',
      lastName: 'Lannister',
      email: 'jamielannister@lannisters.got',
      password: '123456',
      type: 'staff',
      phoneNumber: '08053676589',
      address: {
        street: '122 King Slayer Ave.',
        city: 'Idimu',
        state: 'Lagos',
      },
      createdOn: moment().format('YYYY DD MM'),
      isAdmin: true,
    },
  ],
};

import moment from 'moment';
import uuid from 'uuid';

/**
 *
 * @template sample db data
 *
 */
export default {
  /**
	 * @template sample user data
	 */
  users: [
    {
      id: 'fa77a5a0-d7ac-4870-a7cc-6c7a7df93d5b',
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
      createdOn: moment().format(),
      isAdmin: false,
    },
    {
      id: '053d71de-707a-4a16-945d-a5255245d64a',
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
      createdOn: moment().format(),
      isAdmin: false,
    },
    {
      id: '209d3dcc-590a-49aa-804e-b0715747252b',
      firstName: 'Daenarys',
      lastName: 'Targaeryean',
      email: 'd.targaeryean@targearyean.got',
      password: '123456',
      type: 'Staff',
      phoneNumber: '08123676589',
      address: {
        street: '122 Westeros Ave.',
        city: 'Ilupeju',
        state: 'Lagos',
      },
      createdOn: moment().format(),
      isAdmin: false,
    },
    {
      id: 'd9102e82-e571-40fd-b875-b7a6406198d1',
      firstName: 'Jamie',
      lastName: 'Lannister',
      email: 'jamielannister@lannisters.got',
      password: '123456',
      type: 'Admin',
      phoneNumber: '08053676589',
      address: {
        street: '122 King Slayer Ave.',
        city: 'Idimu',
        state: 'Lagos',
      },
      createdOn: moment().format(),
      isAdmin: true,
    },
  ],
  /**
	 * @template account info
	 */
  accounts: [
    {
      id: '2b18fd0b-68c7-4168-99ca-fbe979171380',
      accountNumber: '430287547',
      createdOn: moment().format(),
      owner: '053d71de-707a-4a16-945d-a5255245d64a',
      type: 'savings',
      status: 'active',
      balance: parseFloat(300000.0).toFixed(2),
    },
    {
      id: '0d4b64b4-c632-497e-b22a-8a6e7694c637',
      accountNumber: '5789761524',
      createdOn: moment().format(),
      owner: 'fa77a5a0-d7ac-4870-a7cc-6c7a7df93d5b',
      type: 'current',
      status: 'active',
      balance: parseFloat(300000.0).toFixed(2),
    },
  ],
  transactions: [
    {
      id: 1,
      createdOn: moment().format(),
      transactionType: 'credit',
      accountNumber: '5789761524',
      cashier: '209d3dcc-590a-49aa-804e-b0715747252b',
      amount: 300000.0,
      oldBalance: 5000000.0,
      newBalance: 5300000.0,
    },
    {
      id: 2,
      createdOn: moment().format(),
      transactionType: 'debit',
      accountNumber: '430287547',
      cashier: '209d3dcc-590a-49aa-804e-b0715747252b',
      amount: 200000.0,
      oldBalance: 500000.0,
      newBalance: 300000.0,
    },
  ],
};

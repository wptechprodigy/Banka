class Account {
  /**
	 * @class constructor
	 * @param {object} data
	 *
	 */
  constructor() {
    this.id = null;
    this.accountNumber = null;
    this.createdOn = null;
    this.owner = null; // client (user) id
    this.type = null; // savings or current
    this.status = null; // draft, active or dormant
    this.balance = null;
  }
}

export default Account;

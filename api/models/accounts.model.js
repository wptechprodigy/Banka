class Account {
<<<<<<< HEAD
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
=======
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
};
>>>>>>> 738b6a416af0760580b4e4b115cc806416315137

export default Account;

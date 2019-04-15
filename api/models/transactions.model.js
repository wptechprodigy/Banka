class Transaction {
  /**
	 * @class constructor
	 * @param {object} data
	 *
	 */
  constructor() {
    this.id = null;
    this.createdOn = null;
    this.transactionType = null; // credit or debit
    this.accountNumber = null;
    this.cashier = null; // cashier (staff) who consummated the transaction
    this.amount = null;
    this.oldBalance = null;
    this.newBalance = null;
  }
}

export default Transaction;

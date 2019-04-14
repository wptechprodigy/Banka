const createStaffAdminAcctModal = document.querySelector(
	'#create-staff-acct-modal'
);
const createStaffAdminAcctBtn = document.querySelector(
	'.create-staff-admin-acct'
);
createStaffAdminAcctBtn.addEventListener('click', () =>
	console.log('Button clicked')
);
const closeModal = document.querySelector('.close-modal');
const submitTypeOfAcctBtn = document.querySelector('button[type=submit]');

// const verifyEmailPassword = () => {
//   const
// }

submitTypeOfAcctBtn.onclick = () => {
	location.replace('./sdashboard.html');
};

createStaffAdminAcctBtn.onclick = () =>
	(createStaffAdminAcctModal.style.display = 'block');
closeModal.onclick = () => (createStaffAdminAcctModal.style.display = 'none');
window.onclick = event => {
	if (event.target === createStaffAdminAcctModal) {
		createStaffAdminAcctModal.style.display = 'none';
	}
};

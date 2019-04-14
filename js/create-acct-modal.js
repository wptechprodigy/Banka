const createAcctModal = document.querySelector('#create-acct-modal');
const createAcctBtn = document.querySelector('.create-acct');
const closeModal = document.querySelector('.close-modal');
const submitTypeOfAcctBtn = document.querySelector('button[type=submit]');
submitTypeOfAcctBtn.onclick = () => location.replace('./udashboard.html');

createAcctBtn.onclick = () => (createAcctModal.style.display = 'block');
closeModal.onclick = () => (createAcctModal.style.display = 'none');
window.onclick = event => {
	if (event.target === createAcctModal) {
		createAcctModal.style.display = 'none';
	}
};

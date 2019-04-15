const password = document.forms['signup-form'].password.value;
const confirmPassword = document.forms['signup-form'].confirmPassword.value;
const submitBtn = document.querySelector('input[type=submit]');

// const submitFormDetails = () => {
//   location.replace('./udashboard.html');
//   return false;
// };

submitBtn.addEventListener('click', () => {
  location.replace('./udashboard.html');
});

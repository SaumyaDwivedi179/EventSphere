// Show popup
document.querySelector('.login-btn').onclick = function(e) {
  e.preventDefault();
  document.querySelector('.login-popup').classList.add('active');
  document.querySelector('.blur-bg-overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
};
// Hide popup
document.querySelector('.close-btn').onclick = function() {
  document.querySelector('.login-popup').classList.remove('active');
  document.querySelector('.blur-bg-overlay').style.display = 'none';
  document.body.style.overflow = '';
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
};
// Switch to signup
document.getElementById('show-signup').onclick = function(e) {
  e.preventDefault();
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.signup-form').style.display = 'block';
};


// Switch to login
document.getElementById('show-login').onclick = function(e) {
  e.preventDefault();
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
};
// Hide popup when clicking blur background
document.querySelector('.blur-bg-overlay').onclick = function() {
  document.querySelector('.login-popup').classList.remove('active');
  document.querySelector('.blur-bg-overlay').style.display = 'none';
  document.body.style.overflow = '';
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
};


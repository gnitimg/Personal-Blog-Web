const users = {
    "5120246728": "15381778897hhl",
    "5120240884": "123456",
    "5120245034": "123456",
    "5120242676": "123456",
    "5120244194": "123456",
    "5120244567": "123456",
    "Visitor":"SWUST666"
  };

  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const redirectUrl = new URLSearchParams(window.location.search).get('redirect');

    if (users[username] && users[username] === password) {
      window.location.href = decodeURIComponent(redirectUrl);
    } else {
      document.getElementById('error-message').style.display = 'block';
    }
  });
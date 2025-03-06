const users = {
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

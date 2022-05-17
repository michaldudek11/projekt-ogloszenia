const handleLogin = async (e) => {
  e.preventDefault();
  const loginForm = document.querySelector('form');

  const email = loginForm.elements['email'].value;
  const password = loginForm.elements['password'].value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    localStorage.setItem("email", email)
  window.location.href = "http://localhost:5500/Front/index.html"}
};

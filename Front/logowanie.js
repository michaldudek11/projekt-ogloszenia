const handleLogin = async (e) => {
  e.preventDefault();
  const loginForm = document.querySelector('form');

  const email = loginForm.elements['email'].value;
  const password = loginForm.elements['password'].value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: {
      email: email,
      password: password,
    },
  });

  // response
};

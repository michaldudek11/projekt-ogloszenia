if (!localStorage.getItem('email')) {
    window.location.href = 'http://localhost:5500/Front/logowanie.html';
}

const email = localStorage.getItem('email');

const userName = document.querySelector(".userName")
userName.innerText = `${userName.innerText} ${email}`
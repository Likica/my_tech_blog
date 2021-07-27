async function loginFormHandler(event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-login');
    const passwordEl = document.querySelector('#password-login');

    const response = fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { 'Content-Type': 'application/json' }
    })


    if (response.ok) {
        document.location.replace('/dashboard');
    }
};



document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
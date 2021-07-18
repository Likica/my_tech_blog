async function logout() {
    const response = await fetch('/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    }
}

document.querySelector('#logout').addEventListener('click', logout);